import React from 'react';
import './../style/app.css';
import './../style/randomCocktail.css'
import './../style/fontawesome/css/all.min.css'
import './../style/bootstrap/css/bootstrap.min.css'
import Navbar from './NavBar';
import RandomCocktail from './RandomCocktail';

function App({ val }) {
  return (
    <div className="App">
      <Navbar />
      {/* {val} */}
      <div class="content container">
        <RandomCocktail />
        <RandomCocktail />
        <RandomCocktail />
        <RandomCocktail />
        <RandomCocktail />
        <RandomCocktail />
        <RandomCocktail />
      </div>
    </div>
  );
}

export default App;
