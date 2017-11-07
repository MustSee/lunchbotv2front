import React from "react";

export default class Marker extends React.Component {

    constructor(props) {
        super(props);
        this.handleClickOnMarker = this.handleClickOnMarker.bind(this);

    }

    handleClickOnMarker(e) {
        console.log(this.props.place);
        this.props.onClickEvent(this.props.place);
    }

    render() {

        return (

            this.props.isActive ?


                <div className="marker-active"
                     onClick={this.handleClickOnMarker}
                >
                    {this.props.place ? this.props.place.name : <span></span>}
                </div>
                :
                <div className="marker"
                     onClick={this.handleClickOnMarker}>
                    {this.props.place ? this.props.place.name : <span></span>}
                </div>

            //this.props.isActive ?
            //	<div className="marker-active" onClick={this.handleClickOnMarker(this.props.place)} >
            //		{this.props.place ? this.props.place.name : <span></span>}
            //	</div>
            //	:
            //	<div className="marker" onClick={this.handleClickOnMarker(this.props.place)} >
            //		{this.props.place ? this.props.place.name : <span></span>}
            //	</div>
        )
    }
}