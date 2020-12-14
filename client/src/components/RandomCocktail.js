import React from 'react';
import MoreInformation from './MoreInformation';

export default class randomCocktail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo : false,
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.drinks[0]
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  displayMoreInformation() {
   this.setState({moreInfo: true});
}

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div key={items.drinkId} className="cocktail">
          <div className="cocktail-thumbnail-wrapper">
            <img src={items.strDrinkThumb} alt={items.strDrink}></img>
          </div>
          <div className="cocktail-title">
            <i className="fas fa-cocktail"></i>{items.strDrink}
          </div>
          <div className="cocktail-ingredients">
            {items.strIngredient1}, ...
            </div>
          <div className="more-information-button-wrapper button-wrapper"><div onClick={() => this.displayMoreInformation()}>More information</div></div>
          {this.state.moreInfo ? <MoreInformation drink={items}/> : null}
        </div>
        )
    }
  }

}