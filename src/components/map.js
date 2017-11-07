import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';


const MainMarker = ({text}) => <h2>{text}</h2>;

export default class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive : null
		};
		this.handleClickOnPlace = this.handleClickOnPlace.bind(this);
	}

	// TODO : how to access the selectedPlaceIndex
	handleClickOnPlace(res) {
		this.props.clickOnPlace(res);
		console.log(res);
		this.setState({
			isActive : res
		})
	}

	showInfoWindow(res) {
		console.log(res);
		this.props.showInfoWindow(res);
	}

	render() {

		console.log(this.state.isActive);

		const markers = [];

		this.props.places.data ? this.props.places.data.places.map((element, index) => {
			return markers.push(
				<Marker
					key={index}
					lat={element.coordsLatitude}
					lng={element.coordsLongitude}
					place={element}
					isActive={
                    this.state.isActive ?
                    element === this.state.isActive ? true : false
                    : false
                    }
					onClickPlace={this.handleClickOnPlace}
					showInfoWindow={this.showInfoWindow}
				/>
			);
		}) : <span>Pas de données</span>;

		return (
			<GoogleMapReact
				bootstrapURLKeys={{key: "AIzaSyAgwRnp6255JG_OTNKA70k_NrUcU4XBB_g"}}
				defaultCenter={{lat: 48.834016, lng: 2.236963}}
				defaultZoom={17}>

				<MainMarker
					lat={48.834016}
					lng={2.236963}
					text={'TBWA'}
				/>

				{markers}

			</GoogleMapReact>
		)
	}
}