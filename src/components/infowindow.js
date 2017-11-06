import React from 'react';

export default class InfoWindow extends React.Component {
    render() {

        console.log(this.props);
        let element = this.props.place;

        return (
            <div className="infowindow">
                <h1>{element.denomination ? element.denomination : null}</h1><br/>
                <h3>{element.adresse}</h3><br/>
                <h4>{element.codePostal}</h4><br/>
            </div>
        )
    }
}