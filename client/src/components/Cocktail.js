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
            <i className="fas fa-cocktail" title="contains alcohol"></i>
            {this.props.drink.strDrink}
          </div>
          <div className="cocktail-ingredients">
            {this.props.drink.strIngredient1}, ...
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
