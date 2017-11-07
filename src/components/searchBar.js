import React from 'react';
import axios from 'axios';
import paths from './../settings/paths.json';



export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places : [],
            pressedEnter : false,
            searchInput : ""
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
    }

    handleTextChange(event) {
        const searchValue = event.target.value;
        this.setState({pressedEnter : false});
        this.setState({searchInput: searchValue});
        if(event.target.value.length > 0) {
            let fullUrl = paths.api + '/autocomplete/' + event.target.value;
            axios.get(fullUrl)
                .then(res => {
                    this.setState({
                        places : res.data.places
                    }, () => {  // we do callBack after the setState to retrieve some informations
                        this.props.onPlacesChange(res.data.places, searchValue);
                    })
                });
        } else {
            this.setState({places : [] }, () => {
                this.props.onPlacesChange([], '')
            });
        }
    }


    handleKeyPress(event) {
        if(event.charCode === 13) {
            this.setState({pressedEnter : true})
        }
    }

    changeInputValue(event) {
        // event.target.value only works on input fields
        this.setState({
            searchInput : event.target.innerHTML
        });
        // Hide the unordered list
        this.setState({
            places : []
        });
        // TODO : Open InfoWindow
        // Comment faire remonter l'information
    }


    render() {


        return(
            <div className="searchBar">
                <input
                    id="mainInput"
                    type="text"
                    placeholder="Entrez une bonne adresse"
                    onChange={this.handleTextChange}
                    onKeyPress={this.handleKeyPress}
                    value={this.state.searchInput}
                />

                {
                    this.state.places.length > 0 ?
                        <ul>
                            {
                                this.state.places.slice(0, 10).map((element, index) => {
                                    return (
                                        <li key={index}
                                            value={element.name}
                                            onClick={this.changeInputValue}
                                        >
                                            {element.name}
                                        </li>
                                    )
                                })
                            }
                        </ul> : <span></span>
                }

            </div>
        )
    }
}