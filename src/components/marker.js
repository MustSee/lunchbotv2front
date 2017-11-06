import React from "react";

export default class Marker extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.onClickPlace(0);
	}

	render() {

		return (
			this.props.isActive ?
				<div className="marker-active" onClick={this.handleClick}>
					{this.props.place ? this.props.place.name : <span></span>}
				</div>
				:
				<div className="marker" onClick={this.handleClick}>

				</div>
		)
	}
}