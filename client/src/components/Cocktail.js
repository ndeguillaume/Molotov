import React from 'react';
import MoreInformation from './MoreInformation';

export default class Cocktail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        moreInfo : false
      };
  }

  displayMoreInformation() {
   this.setState({moreInfo: true});
}

  render() {
      return (
          <div className="column">
        <div key={this.props.drink.drinkId} className="cocktail">
          <div className="cocktail-thumbnail-wrapper">
            <img src={this.props.drink.strDrinkThumb} alt={this.props.drink.strDrink}></img>
          </div>
          <div className="cocktail-title">
            <i className="fas fa-cocktail"></i>{this.props.drink.strDrink}
          </div>
          <div className="cocktail-ingredients">
            {this.props.drink.strIngredient1}, ...
            </div>
          <div className="more-information-button-wrapper button-wrapper"><div onClick={() => this.displayMoreInformation()}>More information</div></div>
          {this.state.moreInfo ? <MoreInformation drink={this.props.drink}/> : null}
        </div>
        </div>
      )}
}