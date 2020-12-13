import React from 'react';
import './../public/style/app.css';
import './../public/style/randomCocktail.css'
import './../public/style/moreInformation.css';
import './../public/style/fontawesome/css/all.min.css'
import './../public/style/bootstrap/css/bootstrap.min.css'
import Navbar from './NavBar';
import RandomCocktail from './RandomCocktail';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: 1
    };
  }

  loadMore() {
    this.setState({reload: this.state.reload+1})
  }

  render() {
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
    return (
      <div className="App">
        <Navbar />
        <div className="content container">
          <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
            {cocktails}
          </div>
          <div className="load-more-button-wrapper button-wrapper"><div onClick={() => this.loadMore()}>Load more...</div></div>
        </div>
      </div>
    )
  }
}