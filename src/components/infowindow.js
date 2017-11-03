import React from 'react';

export default class InfoWindow extends React.Component {
    render() {

        let element = this.props.spot;

        return (
            <div className="infowindow">
                <h1>{element.denomination}</h1><br/>
                <h3>{element.adresse}</h3><br/>
                <h4>{element.codePostal}</h4><br/>
            </div>
        )
    }
}