import React from 'react';
import Cocktail from './Cocktail';

export default class randomCocktail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      error: null,
      isLoaded: false,
      item: []
    };

    this.displayMoreInformation = this.displayMoreInformation.bind(this)
    this.closeMoreInformation = this.closeMoreInformation.bind(this)
  }

  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
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

  displayMoreInformation() {
    this.setState({ moreInfo: true });
  }

  closeMoreInformation() {
    this.setState({ moreInfo: false })
  }

  render() {
    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Cocktail drink={item}/>
      )
    }
  }

}