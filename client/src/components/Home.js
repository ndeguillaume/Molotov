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
      filterOption: false,
      colorOption: false,
      color: "purple",
    };
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
  }

  render() {
    var colorSrc;
    var FLcolorSrc;
    if (this.state.color === "purple") { colorSrc = purple; FLcolorSrc = FL_purple; }
    if (this.state.color === "blue") { colorSrc = blue; FLcolorSrc = FL_blue; }
    if (this.state.color === "green") { colorSrc = green; FLcolorSrc = FL_green; }
    if (this.state.color === "orange") { colorSrc = orange; FLcolorSrc = FL_orange; }
    if (this.state.color === "pink") { colorSrc = pink; FLcolorSrc = FL_pink; }
    if (this.state.color === "yellow") { colorSrc = yellow; FLcolorSrc = FL_yellow; }
    if (this.state.color === "red") { colorSrc = red; FLcolorSrc = FL_red; }


    if (this.state.isLoginPage) {
      return (
        <AuthPage
          closeLoginPage={this.closeLoginPage}
          color={this.state.color}
          colorSrc={colorSrc}
        />
      );
    } else {
      var cocktails = [];
      if (this.state.url === "") {
        var tmp = [];
        for (let i = 0; i < this.state.reload; i++) {
          for (let j = 0; j < 10; j++) {
            tmp.push(i);
          }
        }
        cocktails = tmp.map(function (i) {
          return (
            <div className="col">
              <RandomCocktail ico={colorSrc} icoFL={FLcolorSrc} />
            </div>
          );
        });
      } else {
        if (this.state.url.split("?")[1].split("=")[0] === "s") {
          cocktails = <SearchedCocktailsByName url={this.state.url} />;
        } else if (this.state.url.split("?")[1].split("=")[0] === "i") {
          cocktails = <SearchedCocktailsByIngredient url={this.state.url} />;
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
          />

          {this.state.url === "" ? (
            <div className="content container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {cocktails}
              </div>
              <div className="load-more-button-wrapper button-wrapper">
                <div onClick={() => this.loadMore()}>Load more...</div>
              </div>
            </div>
          ) : (
            <React.Fragment>{cocktails}</React.Fragment>
          )}
        </div>
      );
    }
  }
}
