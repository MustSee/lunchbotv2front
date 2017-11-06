import React from 'react';
import './formulaireTest.css';
import FormErrors from './FormErrors';
import axios from 'axios';
import paths from './../settings/paths.json';

export default class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			adress: "",
			city: "",
			// Validation
			formErrors: {name: " ", adress: " ", city: " "},
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
		this.validateFields(e.target);

		// TODO: Find a solution. On first click, this.state.isFormValid is false ! Asynchronism...
		console.log(this.state.isFormValid);

		if (this.state.isFormValid) {
			this.submitForm(e.target.name.value, e.target.adress.value, e.target.city.value);
		}
	}

	validateFields(target) {
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

		// axios.get("https://geo.api.gouv.fr/communes?nom=" + city).then(res => {
		// 	// If no match found
		// 	if (res.data.length === 0) {
		// 		fieldValidationErrors.town = "is invalid";
		// 		// If some match
		// 	} else if (res.data.length >= 1) {
		// 		res.data.forEach((element) => {
		// 			// We stop case sensitivity
		// 			if (element.nom.toUpperCase() === town.toUpperCase()) {
		// 				townValid = true;
		// 				fieldValidationErrors.town = "";
		// 				console.log('match');
		// 				this.setState({
		// 					townValid: townValid
		// 				});
		// 			}
		// 		})
		// 	}
		// }).catch(error => {
		// 	console.log(error);
		// });

		// Check if adress length is greater than 2
		if (target.adress.value.length >= 3) {
			formErrors.adress = '';
		} else {
			formErrors.adress = 'L\'adresse doit contenir plus de trois caractères';
		}


		this.setState({
			formErrors : formErrors,
			isFormValid : this.isFormValid(formErrors)
		});

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
							this.props.showForm(false);
							this.props.reRender();
						}
					})
					.catch(error => console.log(error));


			}
		}).catch(error => console.log(error));



	}

	render() {


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
					Ajouter
				</button>

			</form>
		);
	}
}