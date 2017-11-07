import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import paths from './settings/paths.json';
import FlashMessage from './components/flashMessage';
import Form from './components/formulaireTest';
import InfoWindow from './components/infowindow';
import Map from './components/map';
import SearchBar from './components/searchBar';



class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			places: [],
			selectedPlace: null,
			showForm: false,
			showInfoWindow : false
		};
		this.handleClickOnPlace = this.handleClickOnPlace.bind(this);
		this.handleShowForm = this.handleShowForm.bind(this);
		this.handleReRender = this.handleReRender.bind(this);
		this.showInfoWindow = this.showInfoWindow.bind(this);
		this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
	}

	componentDidMount() {
		let placesUrl = paths.api + '/places';
		axios.get(placesUrl).then(res => this.setState({
			places: res
		}));
	}

	handleClickOnPlace(res) {
		this.setState({
			selectedPlace: res
		})
	}

	handleShowForm(showForm) {
		this.setState({
			showForm: showForm
		});
	}

	handleReRender() {
		let placesUrl = paths.api + '/places';
		axios.get(placesUrl).then(res => this.setState({
			places: res
		}));
	}

	showInfoWindow(res) {
		this.setState({
			showForm : res
		})
	}

	handlePlacesChanged(places, search) {
		console.log(places, search);
		this.setState({
			showForm: places.length === 0 && search.length > 0
		})
	}

	render() {

		if(this.state.showForm) {
			console.log('render App with form', this.handleShowForm, this.handleReRender);
		}
		else {
			console.log('render App no form');
		}


		return (
			<div>
				<div id="map">
					<Map
						places={this.state.places}
						selectedPlace={this.state.selectedPlaceIndex}
						clickOnPlace={this.handleClickOnPlace}
						showInfoWindow={this.showInfoWindow}
					/>
				</div>
				<div id="search">
					<SearchBar onPlacesChange={this.handlePlacesChanged}/>
					{
						this.state.showForm ? <Form test="12" showForm={this.handleShowForm} reRender={this.handleReRender}/> : <span></span>
					}
					{
						this.state.showInfoWindow ?
							this.state.selectedPlace !== null ?
								<InfoWindow place={this.state.selectedPlace} showInfoWindow={this.showInfoWindow}/>
								: null
						: null
					}
				</div>
			</div>
		);
	}
}

export default App;
