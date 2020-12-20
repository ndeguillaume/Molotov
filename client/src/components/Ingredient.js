import React from 'react';

export default class Ingredient extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const item = this.props.ingredient
      console.log(item)
      return (
      <div className="ingredient">
          <div className="ingredient-title">
          <i className="fas fa-cocktail" title="contains alcohol"></i>{item.strIngredient}
          </div>
          <div className="ingredient-content">
          <div className="ingredient-description">
              {item.strDescription}
          </div>
          <div className="ingredient-thumbnail-wrapper">
              <img src={`https://www.thecocktaildb.com/images/ingredients/${item.strIngredient}-Medium.png`} alt={item.strIngredient}/>
          </div>
          </div>
      </div>
      )}
}