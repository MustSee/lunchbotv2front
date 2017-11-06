import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import paths from './settings/paths.json';
import FlashMessage from './components/flashMessage';
import Form from './components/formulaireTest';
import InfoWindow from './components/infowindow';
import Map from './components/map';



class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			places: [],
			selectedPlaceIndex: null,
			showForm: true
		};
		this.handleClickOnPlace = this.handleClickOnPlace.bind(this);
		this.handleShowForm = this.handleShowForm.bind(this);
		this.handleReRender = this.handleReRender.bind(this);
	}

	componentDidMount() {
		let placesUrl = paths.api + '/places';
		axios.get(placesUrl).then(res => this.setState({
			places: res
		}));
	}

	handleClickOnPlace(res) {
		this.setState({
			selectedPlaceIndex: res
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

	render() {

		return (
			<div>
				<div id="map">
					<Map
						places={this.state.places}
						selectedPlaceIndex={this.state.selectedPlaceIndex}
						clickOnPlace={this.handleClickOnPlace}
					/>
				</div>
				<div id="search">
					{
						this.state.showForm ? <Form showForm={this.handleShowForm} reRender={this.handleReRender}/> : <FlashMessage/>
					}
					{
						this.state.selectedPlaceIndex !== null ?
							<InfoWindow place={this.state.places[this.state.selectedPlaceIndex]}/>
							: null
					}
				</div>
			</div>
		);
	}
}

export default App;
