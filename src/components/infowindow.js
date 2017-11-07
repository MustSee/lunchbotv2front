import React from 'react';

export default class InfoWindow extends React.Component {

    render() {

        console.log(this.props);
        return (
            <div className="infoWindow">
                <h2>{this.props.active.name}</h2>
                <h3>{this.props.active.adress}</h3>
                <h4>{this.props.active.city}</h4>
            </div>
        )
    }
}