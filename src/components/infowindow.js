import React from 'react';

export default class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseInfoWindow = this.handleCloseInfoWindow.bind(this);
    }

    handleCloseInfoWindow () {
        //let infoWindow = document.getElementsByClassName('infowindow')[0];
        //console.log(infoWindow);
        //infoWindow.style.display="none";
        this.props.showInfoWindow(false);
    }

    render() {

        return (
            this.props.place ?
            <div className="infowindow">
                {/*<h1>{element.denomination ? element.denomination : null}</h1><br/>
                <h3>{element.adresse}</h3><br/>
                <h4>{element.codePostal}</h4><br/>*/}
                <div className="closeInfoWindow" onClick={this.handleCloseInfoWindow}> - X - </div>
                <h1>{this.props.place}</h1>
            </div>
                : null
        )
    }
}