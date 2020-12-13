import React from 'react';
import './../public/style/app.css';
import './../public/style/randomCocktail.css'
import './../public/style/fontawesome/css/all.min.css'
import './../public/style/bootstrap/css/bootstrap.min.css'
import Navbar from './NavBar';
import RandomCocktail from './RandomCocktail';

const TITLE = 'My Page Title'

export default class App extends React.Component {
  // componentDidMount() {
  //   document.title = 'Molotov';
  // }

  render() {
    return (
      <div className="App">
        <Navbar />
        {/* {val} */}
        <div class="content container">
          <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
            <div class="col">
              <div class="p-3"><RandomCocktail /></div>
            </div>
            <div class="col">
              <div class="p-3"><RandomCocktail /></div>
            </div>
            <div class="col">
              <div class="p-3"><RandomCocktail /></div>
            </div>
            <div class="col">
              <div class="p-3"><RandomCocktail /></div>
            </div>
            <div class="col">
              <div class="p-3"><RandomCocktail /></div>
            </div>
            <div class="col">
              <div class="p-3"><RandomCocktail /></div>
            </div>
            <div class="col">
              <div class="p-3"><RandomCocktail /></div>
            </div>
            <div class="col">
              <div class="p-3"><RandomCocktail /></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}