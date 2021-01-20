import React from "react";
import CocktailFromId from "./CocktailFromId";
import Axios from "axios";

export default class RatedDrinksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreInfo: false,
      isLoaded: false,
      items: [],
      reload: 1,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    Axios.get("http://localhost:5000/drinkRating/all", {
      headers: { "x-auth-token": token },
    }).then((response) => {
      let fiveStars = [];
      let fourStars = [];
      let threeStars = [];
      let twoStars = [];
      let oneStar = [];
      response.data.forEach((elem) => {
        if (elem.rating === 1) {
          oneStar.push(elem.drinkId);
        } else if (elem.rating === 2) {
          twoStars.push(elem.drinkId);
        } else if (elem.rating === 3) {
          threeStars.push(elem.drinkId);
        } else if (elem.rating === 4) {
          fourStars.push(elem.drinkId);
        } else if (elem.rating === 5) {
          fiveStars.push(elem.drinkId);
        }
      });
      for (let i = 0; i < fiveStars.length; i++) {
        this.state.items.push(fiveStars[i]);
      }
      for (let i = 0; i < fourStars.length; i++) {
        this.state.items.push(fourStars[i]);
      }
      for (let i = 0; i < threeStars.length; i++) {
        this.state.items.push(threeStars[i]);
      }
      for (let i = 0; i < twoStars.length; i++) {
        this.state.items.push(twoStars[i]);
      }
      for (let i = 0; i < oneStar.length; i++) {
        this.state.items.push(oneStar[i]);
      }
      this.setState({
        isLoaded: true,
      });
    });
  }

  loadMore() {
    this.setState({
      reload: this.state.reload + 1,
    });
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var cocktails = [];
      var hiddenCocktails = [];
      for (let i = 0; i < this.state.items.length; i++) {
        if (i < 8 * this.state.reload) {
          cocktails.push(
            <div className="col-md">
              <CocktailFromId
                addLikedCocktail={this.props.addLikedCocktail}
                removeLikedCocktail={this.props.removeLikedCocktail}
                likedCocktails={this.props.likedCocktails}
                id={this.state.items[i]}
                ico={this.props.ico}
                icoFL={this.props.icoFL}
              />
            </div>
          );
        } else {
          hiddenCocktails.push(this.state.items[i]);
        }
      }
      if (cocktails.length === 0) {
        cocktails.push(
          <h3 className="empty-set">You haven't rated any cocktail yet !</h3>
        );
      }
      return (
        <div className={`${this.props.color} liked-drinks-page container`}>
          <div className="content container">
            <div className="row row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
              {cocktails}
            </div>
            {hiddenCocktails.length === 0 ? null : (
              <div className="load-more-button-wrapper button-wrapper">
                <div onClick={() => this.loadMore()}>
                  Load more... ({hiddenCocktails.length})
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}
