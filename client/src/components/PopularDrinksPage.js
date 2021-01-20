import React from "react";
import CocktailFromId from "./CocktailFromId";
import "./../public/style/likedDrinksPage.css";
import Axios from "axios";

export default class PopularDrinksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      items: [],
      avgRating: [],
      reload: false,
      isLoadeed: false,
      noMoreCocktailsToDisplay : false
    };

    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/drinkRating/all/averageRating").then(
      (response) => {
        if (response.data !== null) {
          this.state.avgRating.push(response.data);
          this.setState({ isLoadeed: true });
        }
      }
    );
  }

  reload(cocktails) {
    let tmp=[];
    let newAvg = [];
    for (let i = 0; i < this.state.avgRating[0].length; i++) {
      let toAdd = true;
      for (let j = 0; j < cocktails.length; j++) {
        if (this.state.avgRating[0][i].drinkId == cocktails[j]) {
        toAdd = false;
        }
      }
      if (toAdd) {
        newAvg.push(this.state.avgRating[0][i]);
      }
    }
    tmp.push(newAvg);
    this.state.avgRating = tmp;
    this.setState({noMoreCocktailsToDisplay : cocktails.includes(undefined)});
  }

  render() {
    if (!this.state.isLoadeed) {
      return <div>Loading...</div>;
    }
    if (this.state.noMoreCocktailsToDisplay) {
       return <h3 className="empty-set">No more popular cocktail to display :)</h3>
    }
    const popularCocktails = [];
    let i = 0;
    for (let i = 0; i < this.state.avgRating[0].length; i++) {
      if (this.state.avgRating[0][i].average >= 4)
        popularCocktails.push(this.state.avgRating[0][i].drinkId);
    }

    const cocktails = [];
    const cocktailsId = [];
    if (this.state.avgRating.length === 0)
      cocktails.push(<h3 className="empty-set">No average rating yet !</h3>);
    else
      for (let i = 0; i < 4; i++) {
        cocktailsId.push(popularCocktails[i]);
        cocktails.push(
          <div className="col-md">
            <CocktailFromId
              addLikedCocktail={this.props.addLikedCocktail}
              removeLikedCocktail={this.props.removeLikedCocktail}
              likedCocktails={this.props.likedCocktails}
              id={popularCocktails[i]}
              ico={this.props.ico}
              icoFL={this.props.icoFL}
            />
          </div>
        );
      }
    return (
      <div className={`${this.props.color} liked-drinks-page container`}>
        <div className="content container">
          <div className="row row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
            {cocktails}
          </div>
          <div className="load-more-button-wrapper button-wrapper">
            <div class="reload-wrapper" onClick={() => this.reload(cocktailsId)}>
              <i class="fas fa-sync-alt"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
