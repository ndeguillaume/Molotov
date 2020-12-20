import React from 'react';
import ReactDOM from 'react-dom';
import './../public/style/searchbar.css'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        };
        this.optionsFilterIco = React.createRef();
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
        if (this.props.displayFilterDiv) {
            const styles = {
                filter : {
                    left: this.optionsFilterIco.current.getBoundingClientRect().left + this.optionsFilterIco.current.offsetWidth/2 - 100 + "px"
                }
            }
            return (
                <div className="search-wrapper">
                    <div className="search-ico">
                        <div>
                            <div className="search-button" title="Search"><i className="fas fa-search" onClick={this.search}></i></div>
                        </div></div>
                    <input type="text" className="search-bar" placeholder="Search cocktail" aria-label="search-cocktail" onKeyDown={(e) => this.onKeyDown(e)} onChange={(e) => this.updateInputValue(e)} />
                    <div className="filter-ico">
                        <div className="filter-button rotated" title="Filter"><i ref={this.optionsFilterIco} className="fas fa-toggle-on" onClick={this.props.filterClick} ></i></div>
                    </div>
                    <div style={styles.filter} className="filter-options-wrapper">
                        <div className="filter-options-title">
                            Search by
                    </div>
                        <div className="filter-options-buttons">
                            <div className="button-wrapper">
                                <div>Cocktails</div>
                            </div>
                            <div className="button-wrapper">
                                <div>Ingredient(s)</div>
                            </div>
                            <div className="button-wrapper">
                                <div>Alcohol</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="search-wrapper">
                <div className="search-ico">
                    <div>
                        <div className="search-button" title="Search"><i className="fas fa-search" onClick={this.search}></i></div>
                    </div></div>
                <input type="text" className="search-bar" placeholder="Search cocktail" aria-label="search-cocktail" onKeyDown={(e) => this.onKeyDown(e)} onChange={(e) => this.updateInputValue(e)} />
                <div className="filter-ico">
                    <div className="filter-button" title="Filter">
                        <i ref={this.optionsFilterIco} className="fas fa-toggle-on" onClick={this.props.filterClick} ></i>
                    </div>
                </div>
            </div>
        )
    }

}