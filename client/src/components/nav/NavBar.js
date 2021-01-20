import React from "react";
import SearchBar from "./SearchBar";

import AuthOptions from "./AuthOptions";
import ColorFilter from "./ColorFilter";
import "../../public/style/navbar.css";
import purple from "../../public/images/purple.png";
import blue from "../../public/images/blue.png";
import green from "../../public/images/green.png";
import orange from "../../public/images/orange.png";
import pink from "../../public/images/pink.png";
import yellow from "../../public/images/yellow.png";
import red from "../../public/images/red.png";

import FL_purple from "../../public/images/FL_purple.png";
import FL_blue from "../../public/images/FL_blue.png";
import FL_green from "../../public/images/FL_green.png";
import FL_orange from "../../public/images/FL_orange.png";
import FL_pink from "../../public/images/FL_pink.png";
import FL_yellow from "../../public/images/FL_yellow.png";
import FL_red from "../../public/images/FL_red.png";
import LikedDrinksOptions from "./LikedDrinksOptions";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.colorIco = React.createRef();
  }

  render() {
    var colors = [purple, blue, green, orange, pink, yellow, red];
    var flColors = [
      FL_purple,
      FL_blue,
      FL_green,
      FL_orange,
      FL_pink,
      FL_yellow,
      FL_red,
    ];
    return (
      <nav className="NavBar">
        <div>
          <img
            className="reset-ico"
            src={this.props.colorSrc}
            alt="app-logo"
            onClick={this.props.resetSearch}
          ></img>
        </div>
        <div>
          <SearchBar
            displayFilterDiv={this.props.displayFilterDiv}
            filterClick={this.props.filterClick}
            search={this.props.search}
            handleClick={this.props.handleClick}
            toggleLikedDrinksPage={this.props.toggleLikedDrinksPage}
            toggleRatedCocktailsPage={this.props.toggleRatedCocktailsPage}
            closeLikedDrinksPage={this.props.closeLikedDrinksPage}
            closeRatedDrinksPage={this.props.closeRatedDrinksPage}
            getAlcoholDrink={this.props.getAlcoholDrink}
            getNoAlcoholDrink={this.props.getNoAlcoholDrink}
          />
        </div>
        {this.props.displayColorDiv ? (
          <div className="change-color-wrapper focused">
            {" "}
            <i
              class="fas fa-paint-brush"
              ref={this.colorIco}
              onClick={this.props.colorClick}
            ></i>
          </div>
        ) : (
          <div className="change-color-wrapper">
            {" "}
            <i
              class="fas fa-paint-brush"
              ref={this.colorIco}
              onClick={this.props.colorClick}
            ></i>
          </div>
        )}

        {this.props.displayColorDiv ? (
          <ColorFilter
            color={this.props.color}
            setColor={this.props.setColor}
            colorIco={this.colorIco}
            colors={colors}
            flColors={flColors}
          />
        ) : null}

        <AuthOptions loginClick={this.props.loginClick}/>
      </nav>
    );
  }
}
