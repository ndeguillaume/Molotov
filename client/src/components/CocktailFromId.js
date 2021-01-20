import React from "react";
import Cocktail from "./Cocktail";

export default class CocktailFromId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      error: null,
      isLoaded: false,
      item: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
        this.props.id
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result.drinks[0],
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidUpdate(previousProps) {
    if (this.props.id !== previousProps.id) {
      
      fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
          this.props.id
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              item: result.drinks[0],
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      this.setState({ reload: 1 });
    }
  }

  render() {
    if (this.state.item.length === 0) {
      return <div>loading...</div>
    }
    return (      
      <Cocktail
        addLikedCocktail={this.props.addLikedCocktail}
        removeLikedCocktail={this.props.removeLikedCocktail}
        likedCocktails={this.props.likedCocktails}
        ico={this.props.ico}
        icoFL={this.props.icoFL}
        drink={this.state.item}
      />
    );
  }
}
