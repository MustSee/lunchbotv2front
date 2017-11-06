import React from 'react';
import axios from 'axios';
import path from './../settings/api-url-path.json';

export default class Formulaire extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            adress : "",
            town : "Boulogne-Billancourt",
            picture : "",
            newSpot : [],
            tooManySpots : []
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onAdressChange = this.onAdressChange.bind(this);
        this.onTownChange = this.onTownChange.bind(this);
        this.onPictureChange = this.onPictureChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onNameChange(e) {
        this.setState({
            name : e.target.value
        })
    }

    onAdressChange(e) {
        this.setState({
            adress : e.target.value
        })
    }

    onTownChange(e) {
        this.setState({
            town : e.target.value
        })
    }

    onPictureChange(e) {
        this.setState({
            picture : e.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.name.value, e.target.adress.value, e.target.town.value, e.target.picture.value);

        let picture = e.target.picture.value;
        console.log(picture);
        picture = picture.split("\\");
        picture = picture[2];

        let name = e.target.name.value;
        let adress = e.target.adress.value;
        let town = e.target.town.value;


        let file = this.refs.file.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            //let pic64 = reader.result;
            //let pic64Json = JSON.stringify(pic64);
            //console.log(pic64Json);

            //////

            function addANewSpotInDb (lat, lng) {
                console.log("inside ");
                let post = JSON.stringify({
                    "name": name,
                    "adress": adress,
                    "town": town,
                    "picture": pic64Json,
                    "lat" : lat,
                    "lng" : lng
                });

                let fullUrl = path.url + '/add_new_place_to_eat';
                axios.post(fullUrl, {
                    post : post
                }).then(res => {
                    //console.log(res);
                    if(res.status === 201) {
                        // CE THIS NE FONCTIONNE PAS. PAS LE BON SCOPE...
                        //this.props.showForm(false)
                        console.log('dada');
                    }
                }).catch( error => console.log(error));

            }

            //////

            // Checking with google if the adress exists
            // Il faudrait encoder l'URL - Un module ?
            let url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
            let API = "&key=AIzaSyAgwRnp6255JG_OTNKA70k_NrUcU4XBB_g";
            axios.get(url + adress + town + API).then(res => {
                if(res.data.results.length === 1) {
                    // Problème de scope
                    this.setState({
                        newSpot : res.data.results
                    });
                    addANewSpotInDb(res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng);
                } else if(res.data.results.length > 1) {
                    this.setState({
                        tooManySpots: res.data.results
                    })
                } else {
                    console.log("API google : Il n'y a pas d'adresse correspondante.")
                }
                console.log(res.data.results);
            }).catch(error => console.log(error));


        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

    }

    render() {

        //console.log(this.state.name, this.state.adress, this.state.town, this.state.picture);

        return(
            <div>
                <form onSubmit={this.handleSubmit}>

                    <label>
                        Nom : <input type="text" name="name"
                                     value={this.state.name}
                                     onChange={this.onNameChange} />
                    </label>

                    <label>
                        Adresse : <input  type="text" name="adress"
                                          value={this.state.adress}
                                          onChange={this.onAdressChange} />
                    </label>

                    <label>
                        Ville : <input type="text" name="town"
                                       value={this.state.town}
                                       onChange={this.onTownChange}/>
                    </label>

                    <label>
                        Photo : <input type="file" name="picture" ref="file"
                                       value={this.state.picture}
                                       onChange={this.onPictureChange} />
                    </label>

                    <input type="submit" />

                </form>

                {
                    this.state.newSpot.length === 1 ?
                        <p>One result : {this.state.newSpot.map((element, index) => {
                            return console.log(element)
                        })}</p>
                        : this.state.newSpot.length > 1 ? <p>More than one result</p> : null
                }

            </div>


        )
    }
}