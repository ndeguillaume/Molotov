import React from 'react';
import './../public/style/searchbar.css'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          searchValue : ""
        };
    }

    search() {
        let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + this.state.searchValue;
        this.props.handleClick(url);
    }

    updateInputValue(e) {
        this.setState({
            searchValue: e.target.value
        })
      }

    onKeyDown(e) {
        if (e.key === 'Enter') {
            this.setState({
                searchValue: e.target.value
            })
            this.search();
        }
    }

    render() {
        return (
                <div className="search-wrapper">
                    <div className="search-ico">
                    <div>
                        <div className="search-button" title="Search"><i className="fas fa-search" onClick={() => this.search()}></i></div>
                    </div></div>
                    <input type="text" className="search-bar" placeholder="Search cocktail" aria-label="search-cocktail" onKeyDown={(e) => this.onKeyDown(e)} onChange={(e) => this.updateInputValue(e)} />
                    <div className="filter-ico">
                        <div className="filter-button" title="Filter"><i className="fas fa-toggle-on"></i></div>
                    </div>
                </div>
        )
    }

}