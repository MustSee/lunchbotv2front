import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';


const MainMarker = ({ text }) => <h2>{text}</h2>;

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive : null
        };
        this.handleClickOnSpot = this.handleClickOnSpot.bind(this);
    }

    handleClickOnSpot(res) {
        this.props.clickOnSpot(res);
        this.setState({isActive:res})
    }

    render() {

        const markers = [];
        const markersAdded = [];

        console.log(this.props.addedSpots);



        this.props.addedSpots.data ? this.props.addedSpots.data.allPlacesAdded.map((element, index) => {
            return markersAdded.push(
                <Marker
                    onClickSpot={this.handleClickOnSpot}
                    key={index}
                    lat={element.coordsLatitude}
                    lng={element.coordsLongitude}
                    spot={element}
                    isActive={
                    this.state.isActive ?
                    element === this.state.isActive ? true : false
                    : false
                    }
                />
            );
        }) : console.log("no added spots yet");

        this.props.spots.data ? this.props.spots.data.allPlaces.map((element, index) => {
            return markers.push(
                <Marker
                    onClickSpot={this.handleClickOnSpot}
                    key={index}
                    lat={element.positionLatitude}
                    lng={element.positionLongitude}
                    spot={element}
                    isActive={
                    this.state.isActive ?
                    element === this.state.isActive ? true : false
                    : false
                    }
                />
            );
        })
        : null;


        return (
            <GoogleMapReact
                bootstrapURLKeys={{key : "AIzaSyAgwRnp6255JG_OTNKA70k_NrUcU4XBB_g"}}
                defaultCenter={{lat: 48.834016, lng: 2.236963}}
                defaultZoom={17}
            >

                <MainMarker
                    lat={48.834016}
                    lng={2.236963}
                    text={'TBWA'}
                />

                <MainMarker
                    lat={48.88021519999999}
                    lng={2.4256777}
                    text={'Les Lilas'}
                />

                {markers}
                {markersAdded}


            </GoogleMapReact>
        )
    }
}