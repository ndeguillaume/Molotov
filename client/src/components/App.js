import React from 'react';
import './../public/style/app.css';
import './../public/style/randomCocktail.css'
import './../public/style/moreInformation.css';
import './../public/style/fontawesome/css/all.min.css'
import './../public/style/bootstrap/css/bootstrap.min.css'
import Navbar from './NavBar';
import RandomCocktail from './RandomCocktail';
import SearchedCocktails from './SearchedCocktails'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: 1,
      url: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  loadMore() {
    this.setState({reload: this.state.reload+1})
  }

  handleClick(searchUrl) {
    this.setState({url : searchUrl});
    console.log(this.state.url);
}

  resetSearch() {
    this.setState({url : ""});
  }

  render() {
    if (this.state.url === "") {
    var tmp = [];
    for (let i = 0; i < this.state.reload; i++) {
      for (let j = 0; j < 8; j++) {
        tmp.push(i);
      }
    }
    var cocktails = tmp.map(function (i) {
      return (
        <div className="col">
        <RandomCocktail />
        </div>
      );
    });
  }
    else {
      var cocktails = <SearchedCocktails url={this.state.url}/>
    }
    return (
      <div className="App">
        <Navbar resetSearch={this.resetSearch} handleClick={this.handleClick} search={this.state.search}/>
        <div className="content container">
          <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
            {cocktails}
          </div>
          {(this.state.url === "") ? (<div className="load-more-button-wrapper button-wrapper"><div onClick={() => this.loadMore()}>Load more...</div></div>) : null }
          </div>
      </div>
    )
}
}