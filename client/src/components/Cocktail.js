import React from "react";
import MoreInformation from "./MoreInformation";
import Like from "./Like";

export default class Cocktail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false
    };

    this.displayMoreInformation = this.displayMoreInformation.bind(this);
    this.closeMoreInformation = this.closeMoreInformation.bind(this);

  }

  displayMoreInformation() {
    this.setState({ moreInfo: true });
  }

  closeMoreInformation() {
    this.setState({ moreInfo: false });
  }

  render() {
    let moreIngredients = true;
    let nbOfIngredients = 1;
    let j=0;
    while (moreIngredients && j++ < 15) {
      moreIngredients =
        !(this.props.drink["strIngredient" + nbOfIngredients] === null) &&
        !(this.props.drink["strIngredient" + nbOfIngredients] === "");
      if (moreIngredients) nbOfIngredients++;
    }
    let ingredients ="";

    for (let i = 1; i <= nbOfIngredients; i++) {
      if (this.props.drink["strIngredient" + i] !== null) {
        ingredients += this.props.drink["strIngredient" + i] +", "
      }
    }
    ingredients = ingredients.substring(0, ingredients.length-2);
    if (ingredients.length > 28) {
      ingredients = ingredients.substring(0, 25) +"...";
    }
    
    let isLiked = false;
    let i = 0;
    while (!isLiked && i < this.props.likedCocktails.length) {
      isLiked = this.props.likedCocktails[i] == this.props.drink.idDrink;
      i++;
    }
    return (
      <div className="column">
        <div key={this.props.drink.drinkId} className="cocktail">
          <div className="cocktail-thumbnail-wrapper">
            <img
              src={this.props.drink.strDrinkThumb}
              alt={this.props.drink.strDrink}
            ></img>
          </div>
          <div className="cocktail-title">
            {this.props.drink.strAlcoholic === "Non alcoholic" ? 
            <i className="fas fa-glass-whiskey" title="without alcohol"></i>
            :
            <i className="fas fa-cocktail" title="with alcohol"></i>}
                {(this.props.drink.strDrink.length > 24) ?
      this.props.drink.strDrink.substring(0,21) + "..." : 
      this.props.drink.strDrink
    }
          </div>
          <div className="cocktail-ingredients">
            {ingredients}
          </div>
          <div className="like-wrapper">
              <Like
                addLikedCocktail={this.props.addLikedCocktail}
                removeLikedCocktail={this.props.removeLikedCocktail}
                isLiked={isLiked}
                ico={this.props.ico}
                icoFL={this.props.icoFL}
                id={this.props.drink.idDrink}
              />
          </div>
          <div className="popup-button-wrapper button-wrapper">
            <div onClick={() => this.displayMoreInformation()}>
              More information
            </div>
          </div>
          {this.state.moreInfo ? (
            <MoreInformation
              closeMoreInformation={this.closeMoreInformation}
              drink={this.props.drink}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
