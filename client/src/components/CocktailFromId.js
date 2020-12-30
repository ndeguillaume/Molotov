import React from 'react';
import Cocktail from './Cocktail'

export default class CocktailFromId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      error: null,
      isLoaded: false,
      item: []
    };
  }

  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+this.props.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result.drinks[0]
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
      return (<Cocktail drink={this.state.item} />)
  }
}