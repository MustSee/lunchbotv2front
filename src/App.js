import React, { Component } from 'react';
import './App.css';
import Map from './components/map';
import InfoWindow from './components/infowindow';
import Formulaire from './components/formulaire';
import FlashMessage from './components/flashMessage';
import path from './settings/api-url-path.json';
import axios from 'axios';

import Form from './components/formulaireTest';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spots : [],
            addedSpots : [],
            spotInfo : null,
            showForm : true
        };
        this.handleClickOnSpot = this.handleClickOnSpot.bind(this);
        this.handleShowForm = this.handleShowForm.bind(this);
    }

    componentDidMount() {
        let fullUrl = path.url + '/all_places_to_eat';
        axios.get(fullUrl).then(res => this.setState({
            spots : res
        }));

        let fullUrlAddedSpots = path.url + '/all_added_spots';
        axios.get(fullUrlAddedSpots).then(res => this.setState({
            addedSpots : res
        }));

        // TESTING

        let lolo = {
            name : "thomas",
            firsname : "sypniewski"
        };

        lolo = JSON.stringify(lolo);

        axios.post(path.url + '/test/cacao', lolo
        ).then(res => console.log(res));

        //// error :  Response for preflight has invalid HTTP status code 404
        //axios({
        //    method : 'post',
        //    url : path.url + '/testPostParamsAxios',
        //    data: {
        //        firstName: 'Fred',
        //        lastName: 'Flintstone'
        //    }
        //}).then(res => console.log(res));

    }

    handleClickOnSpot(res) {
        this.setState({
            spotInfo : res
        })
    }

    handleShowForm(data) {
        this.setState({
            showForm : data
        });
    }

  render() {

    return (
        <div>
            <div id="map" >
                <Map
                    spots={this.state.spots}
                    addedSpots={this.state.addedSpots}
                    clickOnSpot={this.handleClickOnSpot}
                />
            </div>
            <div id="secondSide">
                {
                    //this.state.showForm ?
                    //<Formulaire showForm={this.handleShowForm}/>
                    //: <FlashMessage />

                }

                {
                    //this.state.spotInfo ?
                    //<InfoWindow spot={this.state.spotInfo}/>
                    //: null
                }

                <Form />

            </div>

        </div>

    );
  }
}

export default App;
