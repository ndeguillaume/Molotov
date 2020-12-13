import React from 'react';

export default class randomCocktail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div class="random-cocktail">
          <div class="random-cocktail-thumbnail-wrapper">
            <img src={items.strDrinkThumb}></img>
          </div>
          <div class="random-cocktail-title">
            <i class="fas fa-cocktail"></i>{items.strDrink}
          </div>
          <div class="random-cocktail-components">
            {items.strIngredient1}, {items.strIngredient2} ...
            </div>
          <div class="more-information-button-wrapper"><div>More information</div></div>
        </div>)
    }
  }
}