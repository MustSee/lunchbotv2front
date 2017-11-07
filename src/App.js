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
			isActive: '',
			showForm: false
		};
		this.handleShowForm = this.handleShowForm.bind(this);
		this.handleReRender = this.handleReRender.bind(this);
		this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
		this.handleMarkerClicked = this.handleMarkerClicked.bind(this);
	}

	componentDidMount() {
		let placesUrl = paths.api + '/places';
		axios.get(placesUrl).then(res => this.setState({
			places: res
		}));
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

	handlePlacesChanged(places, search) {
		console.log(places, search);
		this.setState({
			showForm: places.length === 0 && search.length > 0
		})
	}

	handleMarkerClicked(e) {
		console.log(e);
		this.setState({
			isActive : e
		})
	}

	render() {

		return (
			<div>
				<div id="map">
					<Map
						places={this.state.places}
						markerClicked={this.handleMarkerClicked}
						active={this.state.isActive}
					/>
				</div>
				<div id="search">
					<SearchBar onPlacesChange={this.handlePlacesChanged}/>
					{
						this.state.showForm ? <Form showForm={this.handleShowForm} reRender={this.handleReRender}/> : <span></span>
					}
					{
						this.state.isActive !== '' ? <InfoWindow active={this.state.isActive}/> : <span></span>
					}
				</div>
			</div>
		);
	}
}

export default App;
