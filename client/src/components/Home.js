import React from "react";
import "./../public/style/home.css";
import "./../public/style/randomCocktail.css";
import "./../public/style/popup.css";
import "./../public/style/fontawesome/css/all.min.css";
import "./../public/style/bootstrap/css/bootstrap.min.css";
import "./../public/style/color.css";
import Navbar from "./nav/NavBar";
import AuthPage from "./auth/AuthPage";
import RandomCocktail from "./RandomCocktail";
import SearchedCocktailsByName from "./SearchedCocktailsByName";
import SearchedCocktailsByIngredient from "./SearchedCocktailsByIngredient";
import LikedDrinksPage from "./LikedDrinksPage";
import RatedDrinksPage from "./RatedDrinksPage";
import PopularDrinksPage from "./PopularDrinksPage";
import Axios from "axios";
import purple from "../public/images/purple.png";
import blue from "../public/images/blue.png";
import green from "../public/images/green.png";
import orange from "../public/images/orange.png";
import pink from "../public/images/pink.png";
import yellow from "../public/images/yellow.png";
import red from "../public/images/red.png";

import FL_purple from "../public/images/FL_purple.png";
import FL_blue from "../public/images/FL_blue.png";
import FL_green from "../public/images/FL_green.png";
import FL_orange from "../public/images/FL_orange.png";
import FL_pink from "../public/images/FL_pink.png";
import FL_yellow from "../public/images/FL_yellow.png";
import FL_red from "../public/images/FL_red.png";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: 1,
      url: "",
      filterOption: false,
      isLoginPage: false,
      colorOption: false,
      color: localStorage.getItem("color"),
      likedCocktails: [],
      avgRating: [],
      likedCocktailsLoaded: false,
      isLikedCocktailPage: false,
      isRatedCocktailPage: false,
      isPopularCocktailPage: false,
      hasAlcohol: true,
      cocktails: [],
    };
    // if (localStorage.getItem("color") !== null) this.setState({color:localStorage.getItem("color")})
    this.handleClick = this.handleClick.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
    this.colorClick = this.colorClick.bind(this);
    this.closeColor = this.closeColor.bind(this);
    this.setColor = this.setColor.bind(this);
    this.close = this.close.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.closeLoginPage = this.closeLoginPage.bind(this);
    this.addLikedCocktail = this.addLikedCocktail.bind(this);
    this.removeLikedCocktail = this.removeLikedCocktail.bind(this);
    this.eraseLikedCocktail = this.eraseLikedCocktail.bind(this);
    this.toggleLikedDrinksPage = this.toggleLikedDrinksPage.bind(this);
    this.toggleRatedDrinksPage = this.toggleRatedDrinksPage.bind(this);
    this.closeLikedDrinksPage = this.closeLikedDrinksPage.bind(this);
    this.closeRatedDrinksPage = this.closeRatedDrinksPage.bind(this);
    this.closePopularDrinkPage = this.closePopularDrinkPage.bind(this);
    this.togglePopularDrinksPage = this.togglePopularDrinksPage.bind(this);
    this.getAlcoholDrink = this.getAlcoholDrink.bind(this);
    this.getNoAlcoholDrink = this.getNoAlcoholDrink.bind(this);
  }

  componentDidMount() {
    if (this.state.color === null) this.setState({ color: "purple" });
    let token = localStorage.getItem("auth-token");
    if (token !== "") {
      Axios.get("http://localhost:5000/likedDrinks", {
        headers: { "x-auth-token": token },
      }).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.state.likedCocktails.push(response.data[i]);
        }
        this.setState({
          likedCocktailsLoaded: true,
        });
      });
    } else {
      this.setState({
        likedCocktailsLoaded: true,
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.likedCocktailsLoaded) {
      let token = localStorage.getItem("auth-token");
      if (token !== "") {
        Axios.get("http://localhost:5000/likedDrinks", {
          headers: { "x-auth-token": token },
        }).then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.state.likedCocktails.push(response.data[i]);
          }
          this.setState({
            likedCocktailsLoaded: true,
          });
        });
      } else {
        this.setState({
          likedCocktailsLoaded: true,
        });
      }
    }
  }

  eraseLikedCocktail() {
    this.state.likedCocktails = [];
    this.setState({ likedCocktailsLoaded: false });
  }

  addLikedCocktail(id) {
    this.state.likedCocktails.push(id);
  }

  removeLikedCocktail(id) {
    this.state.likedCocktails = this.state.likedCocktails.filter(function (
      value
    ) {
      return value != id;
    });
  }

  loadMore() {
    this.setState({ reload: this.state.reload + 1 });
  }

  handleClick(searchUrl) {
    this.setState({ reload: 1 });
    this.setState({ url: searchUrl });
  }

  resetSearch() {
    this.setState({ reload: 1 });
    this.setState({ url: "" });
    this.closeLikedDrinksPage();
    this.closeRatedDrinksPage();
    this.closePopularDrinkPage();
    if (document.querySelector(".selected") !== null) {
      document.querySelector(".selected").classList.remove("selected");
    }
  }

  filterClick(e) {
    e.stopPropagation();
    this.setState({
      filterOption: !this.state.filterOption,
    });
  }

  closeFilter() {
    this.setState({
      filterOption: false,
    });
  }

  colorClick(e) {
    e.stopPropagation();
    this.setState({
      colorOption: !this.state.colorOption,
    });
  }

  closeColor() {
    this.setState({
      colorOption: false,
    });
  }

  setColor(newColor) {
    this.setState({ color: newColor });
    localStorage.setItem("color", newColor);
  }

  close(e) {
    this.closeFilter(e);
    this.closeColor(e);
  }

  loginClick() {
    this.setState({
      isLoginPage: true,
    });
  }

  closeLoginPage() {
    this.setState({
      isLoginPage: false,
    });
    this.eraseLikedCocktail();
  }

  toggleLikedDrinksPage(e) {
    if (
      document.querySelector(".selected") !== null &&
      document.querySelector(".selected") != e.target
    ) {
      document.querySelector(".selected").classList.remove("selected");
    }

    e.target.classList.toggle("selected");
    this.setState({
      isLikedCocktailPage: !this.state.isLikedCocktailPage,
    });
    this.setState({ isRatedCocktailPage: false });
    this.setState({ isPopularCocktailPage: false });
  }

  closeLikedDrinksPage() {
    if (document.querySelector(".selected") !== null) {
      document.querySelector(".selected").classList.remove("selected");
    }
    this.setState({
      isLikedCocktailPage: false,
    });
  }

  closePopularDrinkPage() {
    if (document.querySelector(".selected") !== null) {
      document.querySelector(".selected").classList.remove("selected");
    }
    this.setState({
      isPopularCocktailPage: false,
    });
  }

  toggleRatedDrinksPage(e) {
    if (
      document.querySelector(".selected") !== null &&
      document.querySelector(".selected") != e.target
    ) {
      document.querySelector(".selected").classList.remove("selected");
    }
    e.target.classList.toggle("selected");
    this.setState({
      isRatedCocktailPage: !this.state.isRatedCocktailPage,
    });
    this.setState({ isLikedCocktailPage: false });

    this.setState({ isPopularCocktailPage: false });
  }
  togglePopularDrinksPage(e) {
    if (
      document.querySelector(".selected") !== null &&
      document.querySelector(".selected") != e.target
    ) {
      document.querySelector(".selected").classList.remove("selected");
    }
    e.target.classList.toggle("selected");
    this.setState({
      isPopularCocktailPage: !this.state.isPopularCocktailPage,
    });
    this.setState({ isLikedCocktailPage: false });
    this.setState({ isRatedCocktailPage: false });
  }

  closeRatedDrinksPage() {
    if (document.querySelector(".selected") !== null) {
      document.querySelector(".selected").classList.remove("selected");
    }
    this.setState({
      isRatedCocktailPage: false,
    });
  }

  getAlcoholDrink() {
    this.state.hasAlcohol = true;
  }

  getNoAlcoholDrink() {
    this.state.hasAlcohol = false;
  }

  render() {
    var colorSrc;
    var FLcolorSrc;
    if (this.state.color === "purple") {
      colorSrc = purple;
      FLcolorSrc = FL_purple;
    }
    if (this.state.color === "blue") {
      colorSrc = blue;
      FLcolorSrc = FL_blue;
    }
    if (this.state.color === "green") {
      colorSrc = green;
      FLcolorSrc = FL_green;
    }
    if (this.state.color === "orange") {
      colorSrc = orange;
      FLcolorSrc = FL_orange;
    }
    if (this.state.color === "pink") {
      colorSrc = pink;
      FLcolorSrc = FL_pink;
    }
    if (this.state.color === "yellow") {
      colorSrc = yellow;
      FLcolorSrc = FL_yellow;
    }
    if (this.state.color === "red") {
      colorSrc = red;
      FLcolorSrc = FL_red;
    }

    if (this.state.likedCocktailsLoaded)
      if (this.state.isLoginPage) {
        return (
          <AuthPage
            eraseLikedCocktail={this.eraseLikedCocktail}
            resetSearch={this.resetSearch}
            closeLoginPage={this.closeLoginPage}
            color={this.state.color}
            colorSrc={colorSrc}
          />
        );
      } else {
        var likedCocktails = this.state.likedCocktails;
        var addLikedCocktail = this.addLikedCocktail;
        var removeLikedCocktail = this.removeLikedCocktail;
        var cocktails = [];
        if (this.state.isLikedCocktailPage) {
          cocktails.push(
            <div className="col">
              <LikedDrinksPage
                addLikedCocktail={this.addLikedCocktail}
                removeLikedCocktail={this.removeLikedCocktail}
                likedCocktails={this.state.likedCocktails}
                closeLikedCocktails={this.closeLikedDrinksPage}
                ico={colorSrc}
                icoFL={FLcolorSrc}
                color={this.state.color}
              />
            </div>
          );
        } else if (this.state.isRatedCocktailPage) {
          cocktails.push(
            <div className="col">
              <RatedDrinksPage
                addLikedCocktail={this.addLikedCocktail}
                removeLikedCocktail={this.removeLikedCocktail}
                closeRatedDrinksPage={this.closeRatedDrinksPage}
                likedCocktails={likedCocktails}
                ico={colorSrc}
                icoFL={FLcolorSrc}
                color={this.state.color}
              />
            </div>
          );
        } else if (this.state.isPopularCocktailPage) {
          cocktails.push(
            <div className="col">
              <PopularDrinksPage
                addLikedCocktail={this.addLikedCocktail}
                removeLikedCocktail={this.removeLikedCocktail}
                closeRatedDrinksPage={this.closeRatedDrinksPage}
                likedCocktails={likedCocktails}
                ico={colorSrc}
                icoFL={FLcolorSrc}
                color={this.state.color}
              />
            </div>
          );
        } else if (this.state.url === "") {
          for (let i = 0; i < this.state.reload; i++) {
            for (let j = 0; j < 8; j++) {
              cocktails.push(
                <div className="col-md">
                  <RandomCocktail
                    addLikedCocktail={addLikedCocktail}
                    removeLikedCocktail={removeLikedCocktail}
                    likedCocktails={likedCocktails}
                    ico={colorSrc}
                    icoFL={FLcolorSrc}
                  />
                </div>
              );
            }
          }
        } else {
          if (this.state.url.split("?")[1].split("=")[0] === "s") {
            cocktails = (
              <SearchedCocktailsByName
                addLikedCocktail={this.addLikedCocktail}
                removeLikedCocktail={this.removeLikedCocktail}
                likedCocktails={this.state.likedCocktails}
                ico={colorSrc}
                icoFL={FLcolorSrc}
                url={this.state.url}
                hasAlcohol={this.state.hasAlcohol}
              />
            );
          } else if (this.state.url.split("?")[1].split("=")[0] === "i") {
            cocktails = (
              <SearchedCocktailsByIngredient
                addLikedCocktail={this.addLikedCocktail}
                removeLikedCocktail={this.removeLikedCocktail}
                likedCocktails={this.state.likedCocktails}
                ico={colorSrc}
                icoFL={FLcolorSrc}
                url={this.state.url}
                hasAlcohol={this.state.hasAlcohol}
              />
            );
          }
        }
        return (
          <div
            className={`Home ${this.state.color}`}
            onClick={(e) => this.close(e)}
          >
            <Navbar
              color={this.state.color}
              colorSrc={colorSrc}
              displayFilterDiv={this.state.filterOption}
              displayColorDiv={this.state.colorOption}
              search={this.state.search}
              filterClick={this.filterClick}
              colorClick={this.colorClick}
              resetSearch={this.resetSearch}
              handleClick={this.handleClick}
              setColor={this.setColor}
              loginClick={this.loginClick}
              eraseLikedCocktail={this.eraseLikedCocktail}
              toggleLikedDrinksPage={this.toggleLikedDrinksPage}
              toggleRatedDrinksPage={this.toggleRatedDrinksPage}
              togglePopularDrinksPage={this.togglePopularDrinksPage}
              closeLikedDrinksPage={this.closeLikedDrinksPage}
              closeRatedDrinksPage={this.closeRatedDrinksPage}
              getAlcoholDrink={this.getAlcoholDrink}
              getNoAlcoholDrink={this.getNoAlcoholDrink}
            />

            {this.state.url === "" &&
            !this.state.isLikedCocktailPage &&
            !this.state.isRatedCocktailPage &&
            !this.state.isPopularCocktailPage ? (
              <div className="content container">
                <div className="row">{cocktails}</div>
                <div className="load-more-button-wrapper button-wrapper">
                  <div
                    className="load-more-wrapper"
                    onClick={() => this.loadMore()}
                  >
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
              </div>
            ) : (
              <React.Fragment>{cocktails}</React.Fragment>
            )}
          </div>
        );
      }
    else return <div>loading....</div>;
  }
}
