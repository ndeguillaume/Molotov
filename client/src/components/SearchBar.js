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
        console.log(this.state.searchValue)
    }

    updateInputValue(e) {
        this.setState({
            searchValue: e.target.value
        })
      }

    render() {
        return (
                <div className="search-wrapper">
                    <div className="search-ico">
                    <div>
                        <div className="search-button" title="Search"><i className="fas fa-search" onClick={() => this.search()}></i></div>
                    </div></div>
                    <input type="text" className="search-bar" placeholder="Search cocktail" aria-label="search-cocktail" onChange={(e) => this.updateInputValue(e)} />
                    <div class="filter-ico">
                        <div className="filter-button" title="Filter"><i class="fas fa-toggle-on"></i></div>
                    </div>
                </div>
        )
    }

}