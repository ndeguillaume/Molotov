import React from 'react';
import './../public/style/app.css';
import './../public/style/randomCocktail.css'
import './../public/style/moreInformation.css';
import './../public/style/fontawesome/css/all.min.css'
import './../public/style/bootstrap/css/bootstrap.min.css'
import Navbar from './NavBar';
import RandomCocktail from './RandomCocktail';
import SearchedCocktailsByName from './SearchedCocktailsByName'
import SearchedCocktailsByIngredient from './SearchedCocktailsByIngredient'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reload: 1,
      url: "",
      filterOption: false
    };
    this.handleClick = this.handleClick.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.filterClick = this.filterClick.bind(this)
    this.closeFilter = this.closeFilter.bind(this)
  }

  loadMore() {
    this.setState({ reload: this.state.reload + 1 })
  }

  handleClick(searchUrl) {
    this.setState({ reload: 1 })
    this.setState({ url: searchUrl });
  }

  resetSearch() {
    this.setState({ reload: 1 })
    this.setState({ url: "" });
  }

  filterClick(e) {
    e.stopPropagation()
    this.setState({
      filterOption: !this.state.filterOption
    });
  }

  closeFilter() {
    this.setState({
      filterOption: false
    })
  }

  render() {
    var cocktails = [];
    if (this.state.url === "") {
      var tmp = [];
      for (let i = 0; i < this.state.reload; i++) {
        for (let j = 0; j < 8; j++) {
          tmp.push(i);
        }
      }
      cocktails = tmp.map(function (i) {
        return (
          <div className="col">
            <RandomCocktail />
          </div>
        );
      });
    }
    else {
      if (this.state.url.split("?")[1].split("=")[0] === "s") {
        cocktails = <SearchedCocktailsByName url={this.state.url} />
      }
      else if (this.state.url.split("?")[1].split("=")[0] === "i") {
        cocktails = <SearchedCocktailsByIngredient url={this.state.url} />
      }
    }
    return (
      <div className="App" onClick={(e) => this.closeFilter(e)} >
        <Navbar displayFilterDiv={this.state.filterOption} filterClick={this.filterClick} resetSearch={this.resetSearch} handleClick={this.handleClick} search={this.state.search} />
        <div className="content container">
          <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
            {cocktails}
          {(this.state.url === "") ? (<div className="load-more-button-wrapper button-wrapper"><div onClick={() => this.loadMore()}>Load more...</div></div>) : null}
          </div>
        </div>
      </div>
    )
  }
}