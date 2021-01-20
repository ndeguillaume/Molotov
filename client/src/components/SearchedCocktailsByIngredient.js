import React from "react";
import CocktailFromId from "./CocktailFromId";

export default class SearchedCocktailsByIngredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      error: null,
      isLoaded: false,
      items: [],
      drinks: [],
      reload: 1,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  async componentDidMount() {
    this.setState({
      item:[],
    });
    await fetch(this.props.url)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result !== null) {
            this.setState({
              items: result.drinks,
            });
          } 
        },
        (error) => {
          this.setState({
            isLoaded: true,
          });
        }
      );
    
      const promises = await this.state.items.map((item) => {
        return fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
            item.idDrink
        ).then((drink) => {
          return drink.json();
        });
      });

      await Promise.all(promises).then((results) => {
        const allDrinks = results.map((result) => result.drinks[0]);
        this.state.drinks = allDrinks;
        this.setState({
          isLoaded: true,
        });
      });
    
  }

  async componentDidUpdate(previousProps) {
    if (this.props.url !== previousProps.url) {
      await fetch(this.props.url)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result !== null) {
              this.setState({
                items: result.drinks,
              });
            } 
          },
          (error) => {
            this.setState({
              isLoaded: true,
            });
          }
        );
      this.setState({ reload: 1 });
    
        const promises = await this.state.items.map((item) => {
          return fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
              item.idDrink
          ).then((drink) => {
            return drink.json();
          });
        });
  
        await Promise.all(promises).then((results) => {
          const allDrinks = results.map((result) => result.drinks[0]);
          this.state.drinks = allDrinks;
          this.setState({
            isLoaded: true,
          });
        });
           
    }
  }

  loadMore() {
    this.setState({
      reload: this.state.reload + 1,
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (this.state.items == null || this.state.items.length == 0) {
        return (
          <div className="empty-set">
            <h3>
              No result for the search :{" "}
              <strong>{this.props.url.split("=")[1]}</strong>
            </h3>
          </div>
        );
      }
      var cocktailsTab = [];
      var cocktailsID = [];
      var alcoholDrinksNumber = 0;
      var noAlcoholDrinksNumber = 0;
      for (var i = 0; i < this.state.drinks.length; i++) {
        var currentItem = this.state.drinks[i];
        if (this.props.hasAlcohol && currentItem.strAlcoholic == "Alcoholic") {
          if (alcoholDrinksNumber < 8 * this.state.reload) {
            cocktailsTab.push(
              <div className="col-md">
                <CocktailFromId
                  addLikedCocktail={this.props.addLikedCocktail}
                  removeLikedCocktail={this.props.removeLikedCocktail}
                  likedCocktails={this.props.likedCocktails}
                  ico={this.props.ico}
                  icoFL={this.props.icoFL}
                  drink={currentItem}
                  id={currentItem.idDrink}
                />
              </div>
            );
            alcoholDrinksNumber++;
          } else {
            cocktailsID.push(currentItem.idDrink);
          }
        } else if (
          !this.props.hasAlcohol &&
          currentItem.strAlcoholic == "Non alcoholic"
        ) {
          if (noAlcoholDrinksNumber < 8 * this.state.reload) {
            cocktailsTab.push(
              <div className="col-md">
                <CocktailFromId
                  addLikedCocktail={this.props.addLikedCocktail}
                  removeLikedCocktail={this.props.removeLikedCocktail}
                  likedCocktails={this.props.likedCocktails}
                  ico={this.props.ico}
                  icoFL={this.props.icoFL}
                  drink={currentItem}
                  id={currentItem.idDrink}
                />
              </div>
            );
            noAlcoholDrinksNumber++;
          } else {
            cocktailsID.push(currentItem.idDrink);
          }
        }
      }

      return (
        <div className="content container">
          <div className="row row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
            {cocktailsTab}
          </div>
          {cocktailsID.length === 0 ? null : (
            <div className="load-more-button-wrapper button-wrapper">
              <div onClick={() => this.loadMore()}>
                Load more... ({cocktailsID.length})
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}