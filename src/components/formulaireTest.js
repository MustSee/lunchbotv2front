import React from 'react';
import './formulaireTest.css';
import FormErrors from './FormErrors';
import axios from 'axios';
import paths from './../settings/paths.json';

export default class Form extends React.Component {

	constructor(props) {
		console.log('Form constructor', props);
		super(props);
		this.state = {
			name: "",
			adress: "",
			city: "Boulogne-Billancourt	",
			// Validation
			formErrors: {name: "", adress: "", city: "", noResults: ""},
			isFormValid: false
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.isFormValid = this.isFormValid.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUserInput(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	handleSubmit(e) {
		e.preventDefault();
		// If we don't instantiate the const, we loose the value
		const target = e.target;
		// validatefields return now a promise
		// We exploit it with .then and .catch
		this.validateFields(target).then(res => {
			this.submitForm(target.name.value, target.adress.value, target.city.value);
		}).catch(err => console.log(err));

	}

	validateFields(target) {

		return new Promise(
			(resolve, reject) => {
				let formErrors = {};

				// Check if name length is greater than 3
				if (target.name.value.length >= 3) {
					formErrors.name = '';
				} else {
					formErrors.name = 'Le nom de l\'endroit doit contenir plus de trois caractères';
				}

				// Check if the city exists
				if (target.city.value.length < 2) {
					formErrors.city = 'Le nom de la ville doit contenir plus de trois caractères';
				} else {
					formErrors.city = '';
				}

				// Check if adress length is greater than 2
				if (target.adress.value.length >= 3) {
					formErrors.adress = '';
				} else {
					formErrors.adress = 'L\'adresse doit contenir plus de trois caractères';
				}

				const isValid = this.isFormValid(formErrors);
				this.setState({
					formErrors : formErrors,
					isFormValid : isValid
				}, () => {				// We make a callback at the end of the setState
					if(isValid) {
						// resolve et reject sont deux fonctions
						resolve();
					}
					else {
						reject();
					}
				});

			}
		);


	}

	isFormValid(formErrors) {
		return (
			formErrors.name === ''
			&& formErrors.adress === ''
			&& formErrors.city === ''
		);
	}

	submitForm(name, adress, city) {
		console.log('submitForm');
		const geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
		const apiKey = "&key=AIzaSyAgwRnp6255JG_OTNKA70k_NrUcU4XBB_g";
		axios.get(geocodeUrl + adress + ',' + city + apiKey).then(res => {
			if (res.data.results.length > 0) {
				const lat = res.data.results[0].geometry.location.lat;
				const lng = res.data.results[0].geometry.location.lng;
				let place = {
					name : name,
					adress : adress,
					city : city,
					lat : lat,
					lng : lng
				};
				console.log(place);

				axios.post(paths.api + "/places", place)
					.then(res => {
						if(res.status === 201) {
							console.log('this', this);
							console.log('this.props', this.props);
							debugger;
							this.props.showForm(false);
							this.props.reRender();
						}
					})
					.catch(error => console.log(error));


			} else {
				const formErrors = this.state.formErrors;
				formErrors['noResults'] = "Pas d'adresse correspondante";
				this.forceUpdate();

			}
		}).catch(error => console.log(error));



	}

	render() {

		console.log('render Form', this.props, this.props.showForm);
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				{/* Flash Message */}
				<div className="flashmessage">
					<FormErrors FormErrors={this.state.formErrors}/>
				</div>

				<div className="form-group">
					<label htmlFor="name">NOM</label>
					<input type="text" className="form-control" name="name"
								 autoComplete="off"
								 value={this.state.name}
								 onChange={this.handleUserInput}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="adress">ADRESSE</label>
					<input type="text" className="form-control" name="adress"
								 autoComplete="off"
								 value={this.state.adress}
								 onChange={this.handleUserInput}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="city">VILLE</label>
					<input type="text" className="form-control" name="city"
								 autoComplete="off"
								 value={this.state.city}
								 onChange={this.handleUserInput}
					/>
				</div>
				<button type="submit" className="btnSubmit">
					AJOUTER
				</button>

			</form>
		);
	}
}