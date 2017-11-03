import React from "react";

export default class Marker extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log(e);
        this.props.onClickSpot(this.props.spot);
    }

    render() {

        return (
            this.props.isActive ?
            <div className="marker-active" onClick={this.handleClick}>
                {
                    this.props.spot ? this.props.spot.denomination : <span></span>}
            </div>
                :
                <div className="marker" onClick={this.handleClick}>

                </div>
        )
    }
}