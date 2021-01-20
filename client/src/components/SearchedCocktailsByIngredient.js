import React from "react";
//import AlcoholFilter from "./AlcoholFilterIngredient";
import CocktailFromId from "./CocktailFromId";
import Cocktail from "./Cocktail";

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

  componentDidMount() {
    fetch(this.props.url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.drinks,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true
          });
        }
      );
      const promises = this.state.items.map(item => {
        return fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + item.idDrink
        ).then(drink => {
          return drink.json()
        });
      });
  
      Promise.all(promises).then(results => {
        const allDrinks = results.map(result => result.drinks[0])
        this.state.drinks = allDrinks;
      })    
  }

  componentDidUpdate(previousProps) {
    if (this.props.url !== previousProps.url) {
      fetch(this.props.url)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.drinks,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
            });
          }
        );
      this.setState({ reload: 1 });
    }

    const promises = this.state.items.map(item => {
      return fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + item.idDrink
      ).then(drink => {
        return drink.json()
      });
    });

    Promise.all(promises).then(results => {
      const allDrinks = results.map(result => result.drinks[0]);
      this.state.drinks = allDrinks;
    })
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
      if (this.state.items.length === 0) {
        return (
          <div className="empty-set">
            <h3>No result for the search : <strong>{this.props.url.split("=")[1]}</strong></h3>
          </div>
        )
      }
      var cocktailsTab = [];
      var cocktailsID = []; 

      for(var i = 0; i < this.state.drinks.length; i++){
        console.log(this.state.drinks[i]);
        var currentItem = this.state.drinks[i];
        if(this.props.hasAlcohol && currentItem.strAlcoholic == "Alcoholic"){             
            if (i < 10 * this.state.reload) {
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
            } else {
              cocktailsID.push(currentItem.idDrink);
            }
        } else if (!this.props.hasAlcohol && currentItem.strAlcoholic == "Non alcoholic"){
          if (i < 10 * this.state.reload) {
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
          } else {
            cocktailsID.push(currentItem.idDrink);
          }
        }
      }
      // var i = 0;
      // this.state.items.map((item) => {  
      //   if (i < 8 * this.state.reload) {
      //     cocktailsTab.push(
      //       <CocktailFromId
      //         addLikedCocktail={this.props.addLikedCocktail}
      //         removeLikedCocktail={this.props.removeLikedCocktail}
      //         likedCocktails={this.props.likedCocktails}
      //         ico={this.props.ico}
      //         icoFL={this.props.icoFL}
      //         drink={item}
      //         id={item.idDrink}
      //       />
      //     );
      //   } else {
      //     cocktailsID.push(item.idDrink);
      //   }
      //   i++;
      // });              

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

