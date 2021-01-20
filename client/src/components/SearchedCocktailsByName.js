import React from "react";
import Cocktail from "./Cocktail";

export default class SearchedCocktailsByName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      error: null,
      isLoaded: false,
      items: [],
      reload: 1,
    };
  }

  async componentDidMount() {
    await fetch(this.props.url)
      .then((res) => res.json())
      .then(
        (result) => {
          if(result.drinks !== null){
            this.setState({
              items: result.drinks,
            });
          }
          this.setState({
            isLoaded: true,
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

  async componentDidUpdate(previousProps) {
    if (this.props.url !== previousProps.url) {
      await fetch(this.props.url)
        .then((res) => res.json())
        .then(
          (result) => {
          if(result !== null) {
            this.setState({
              items: result.drinks,
            });
          }
          this.setState({
            isLoaded: true,
          });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error: error,
            });
          }
        );
      this.setState({ reload: 1 });
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
      for(var i = 0; i < items.length; i++){
        var currentItem = items[i];
        if(this.props.hasAlcohol && currentItem.strAlcoholic == "Alcoholic"){             
            if (alcoholDrinksNumber < 8 * this.state.reload) {
              cocktailsTab.push(
                <div className="col-md">
                  <Cocktail
                    addLikedCocktail={this.props.addLikedCocktail}
                    removeLikedCocktail={this.props.removeLikedCocktail}
                    likedCocktails={this.props.likedCocktails}
                    ico={this.props.ico}
                    icoFL={this.props.icoFL}
                    drink={currentItem}
                  /> 
                </div>                              
              );
              alcoholDrinksNumber++;
            } else {
              cocktailsID.push(currentItem.idDrink);
            }
        } else if (!this.props.hasAlcohol && currentItem.strAlcoholic == "Non alcoholic"){
          if (noAlcoholDrinksNumber < 8 * this.state.reload) {
            cocktailsTab.push(
              <div className="col-md">
                <Cocktail
                  addLikedCocktail={this.props.addLikedCocktail}
                  removeLikedCocktail={this.props.removeLikedCocktail}
                  likedCocktails={this.props.likedCocktails}
                  ico={this.props.ico}
                  icoFL={this.props.icoFL}
                  drink={currentItem}
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
            {cocktailsTab.length > 0 ? cocktailsTab : <div className="empty-set">
            <h3>No result for the search : <strong>{this.props.url.split("=")[1]}</strong></h3>
          </div> }
          </div>
          {cocktailsID.length === 0 ?           null : (
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