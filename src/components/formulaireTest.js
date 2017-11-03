import React from 'react';
import './formulaireTest.css';
import FormErrors from './FormErrors';
import axios from 'axios';

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picture : "",
            name : "",
            adress : "",
            town : "",
            // Validation
            formErrors : {picture : "", name : "", adress : "", town : ""},
            pictureValid : false,
            nameValid : false,
            adressValid : false,
            townValid : false,
            // Main form valid
            formValid : false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name] : value},
            () => { this.validateField(name, value) }
        );
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let pictureValid = this.state.pictureValid;
        let nameValid = this.state.nameValid;
        let adressValid = this.state.adressValid;
        let townValid = this.state.townValid;

        // Does the picture exists ?
        if(fieldName === 'picture') {
            pictureValid = value ? true : false;
            fieldValidationErrors.picture = pictureValid ? '' : 'is invalid';

            // Does the name's length is greater than 3
        } else if (fieldName === 'name') {
            nameValid = value.length >= 3;
            fieldValidationErrors.name = nameValid ? '' : 'is invalid';

            // Does the town's name exists ?
            // Doesn't work well. Cause it's asynchronous...
        } else if(fieldName === 'town') {
            let town = value;
            // If length is smaller than 3
            town.length < 2 ? fieldValidationErrors.town = "is too short" :
                // If greater than 2, we search for a match
                axios.get("https://geo.api.gouv.fr/communes?nom=" + town).then(res => {
                    // If no match found
                    if (res.data.length === 0) {
                        fieldValidationErrors.town = "is invalid";
                        // If some match
                    } else if(res.data.length >= 1) {
                        res.data.forEach((element) => {
                            // We stop case sensitivity
                            if(element.nom.toUpperCase() === town.toUpperCase()) {
                                townValid = true;
                                fieldValidationErrors.town = "";
                                console.log('match');
                                this.setState({
                                    townValid : townValid
                                });
                            }
                        })
                    }
                }).catch(error => {
                    console.log(error);
                });

        } else if(fieldName === 'adress') {
            console.log('in adress');
            adressValid = value.length >= 3;
            fieldValidationErrors.adress = adressValid ? '' : 'is invalid';
        }

        this.setState({
            formErrors: fieldValidationErrors,
            pictureValid : pictureValid,
            nameValid : nameValid,
            adressValid : adressValid,
            townValid : townValid
        }, this.validateForm);
    }

    validateForm() {
        console.log(this.state.pictureValid,this.state.nameValid ,this.state.adressValid,this.state.townValid)

        this.setState({
            formValid : this.state.pictureValid && this.state.nameValid && this.state.adressValid && this.state.townValid
        })
    }

    render() {

        console.log(this.state.name, this.state.adress, this.state.town, this.state.picture);

        return (
          <form className="form">
              {/* Flash Message */}
              <div className="flashmessage">
                  <FormErrors FormErrors={this.state.formErrors} />
              </div>
              <div className="form-group">
                  <label htmlFor="picture">AJOUTER UNE PHOTO</label>
                  <input type="file" className="form-control" name="picture"
                         autocomplete="off"
                         value={this.state.picture}
                         onChange={this.handleUserInput}
                         ref="file"
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="name">NOM</label>
                  <input type="text" className="form-control" name="name"
                         autocomplete="off"
                         value={this.state.name}
                         onChange={this.handleUserInput}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="adress">ADRESSE</label>
                  <input type="text" className="form-control" name="adress"
                         autocomplete="off"
                         value={this.state.adress}
                         onChange={this.handleUserInput}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="town">VILLE</label>
                  <input type="text" className="form-control" name="town"
                         autocomplete="off"
                         value={this.state.town}
                         onChange={this.handleUserInput}
                  />
              </div>
              <button type="submit" className="btnSubmit" disabled={! this.state.formValid}>
                Ajouter
              </button>

          </form>
        );
    }
}