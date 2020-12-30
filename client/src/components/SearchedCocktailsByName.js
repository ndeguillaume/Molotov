import React from 'react';
import Cocktail from './Cocktail'

export default class SearchedCocktailsByName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.drinks
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
      return <div>Error : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var cocktails = [];
      (items.map((item) => {
        cocktails.push(<Cocktail drink={item} />)
      }));
      return (
        <React.Fragment>
          {cocktails}
        </React.Fragment>
      )
    }
  }
}