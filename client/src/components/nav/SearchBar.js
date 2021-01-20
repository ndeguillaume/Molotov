import React from "react";
import "../../public/style/searchbar.css";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchCocktail: true,
      alcohol: true,
      placeholder: "Search cocktail by name",
    };
    this.optionsFilterIco = React.createRef();
    this.optionClicked = this.optionClicked.bind(this);
    this.search = this.search.bind(this);
  }

  search() {
    let url;
    if (this.state.searchCocktail) {
      url =
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
        this.state.searchValue;
    } else {
      url =
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
        this.state.searchValue;
    }

    this.props.handleClick(url);
    this.props.closeLikedDrinksPage();
    this.props.closeRatedDrinksPage();
  }

  optionClicked(e) {
    const target = e.target;
    if (
      target.classList.contains("not-selected") &&
      target.classList.contains("option-ingredient")
    ) {
      this.setState({ searchCocktail: false });
      this.setState({ placeholder: "Search cocktail by ingredient" });
    } else if (
      target.classList.contains("not-selected") &&
      target.classList.contains("option-cocktail")
    ) {
      this.setState({ searchCocktail: true });
      this.setState({ placeholder: "Search cocktail by name" });
    } else if (target.classList.contains("option-cocktail")) {
      this.setState({ searchCocktail: false });
    } else if (
      target.classList.contains("not-selected") &&
      target.classList.contains("option-alcohol")
    ) {
      this.setState({ alcohol: true });
    } else {
      this.setState({ alcohol: false });
    }
  }
  updateInputValue(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  onKeyDown(e) {
    if (e.key === "Enter") {
      this.setState({
        searchValue: e.target.value,
      });
      this.search();
    }
  }

  render() {
    if (this.props.displayFilterDiv) {
      const styles = {
        filter: {
          left:
            this.optionsFilterIco.current.getBoundingClientRect().left +
            this.optionsFilterIco.current.offsetWidth / 2 -
            100 +
            "px",
        },
      };
      let buttons;
      if (this.state.searchCocktail) {
        buttons =
          '<div class="button-wrapper"><div class="option-cocktail">Cocktails</div></div><div class="button-wrapper"><div class="not-selected option-ingredient">Ingredient</div></div>';
      } else {
        buttons =
          '<div class="button-wrapper"><div class="not-selected option-cocktail">Cocktails</div></div><div class="button-wrapper"><div class="option-ingredient">Ingredient</div></div>';
      }
      if (this.state.alcohol) {
        buttons +=
          '<div class="button-wrapper"><div class="option-alcohol">Alcohol</div></div>';
        this.props.getAlcoholDrink();          
          
      } else {
        buttons +=
          '<div class="button-wrapper"><div class="not-selected option-alcohol">Alcohol</div></div>';
        this.props.getNoAlcoholDrink();
      }
      return (
        <div className="search-wrapper">
          {localStorage.getItem("auth-token") !== "" ? (
            <>
              <div className="popular-wrapper-ico">
                <i
                  class="fas fa-fire-alt"
                  onClick={this.props.togglePopularDrinksPage}
                ></i>
              </div>
              <div className="molotlove-wrapper-ico">
                <i
                  class="fas fa-heart"
                  onClick={this.props.toggleLikedDrinksPage}
                ></i>
              </div>
              <div className="ratedCocktails-wrapper-ico">
                <i
                  class="fas fa-star-half-alt"
                  onClick={this.props.toggleRatedCocktailsPage}
                ></i>
              </div>
            </>
          ) : (
            <div className="popular-wrapper-ico">
              <i
                class="fas fa-fire-alt"
                onClick={this.props.togglePopularDrinksPage}
              ></i>
            </div>
          )}
          <div className="search-ico">
            <div>
              <div className="search-button" title="Search">
                <i className="fas fa-search" onClick={this.search}></i>
              </div>
            </div>
          </div>
          <input
            type="text"
            className="search-bar"
            placeholder={this.state.placeholder}
            aria-label="search-cocktail"
            onKeyDown={(e) => this.onKeyDown(e)}
            onChange={(e) => this.updateInputValue(e)}
          />
          <div className="filter-ico">
            <div className="filter-button rotated" title="Filter">
              <i
                ref={this.optionsFilterIco}
                className="fas fa-toggle-on"
                onClick={this.props.filterClick}
              ></i>
            </div>
          </div>
          <div
            style={styles.filter}
            className="filter-options-wrapper"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="filter-options-title">Search by</div>
            <div
              onClick={(e) => this.optionClicked(e)}
              className="filter-options-buttons"
              dangerouslySetInnerHTML={{ __html: buttons }}
            ></div>
          </div>
        </div>
      );
    }
    return (
      <div className="search-wrapper">
        {localStorage.getItem("auth-token") !== "" ? (
          <>
            <div className="popular-wrapper-ico">
              <i
                class="fas fa-fire-alt"
                onClick={this.props.togglePopularDrinksPage}
              ></i>
            </div>
            <div className="molotlove-wrapper-ico">
              <i
                class="fas fa-heart"
                onClick={this.props.toggleLikedDrinksPage}
              ></i>
            </div>
            <div className="ratedCocktails-wrapper-ico">
              <i
                class="fas fa-star-half-alt"
                onClick={this.props.toggleRatedDrinksPage}
              ></i>
            </div>
          </>
        ) : 
        <div className="popular-wrapper-ico">
        <i
          class="fas fa-fire-alt"
          onClick={this.props.togglePopularDrinksPage}
        ></i>
      </div>
      }
        <div className="search-ico">
          <div>
            <div className="search-button" title="Search">
              <i className="fas fa-search" onClick={this.search}></i>
            </div>
          </div>
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder={this.state.placeholder}
          aria-label="search-cocktail"
          onKeyDown={(e) => this.onKeyDown(e)}
          onChange={(e) => this.updateInputValue(e)}
        />
        <div className="filter-ico">
          <div className="filter-button" title="Filter">
            <i
              ref={this.optionsFilterIco}
              className="fas fa-toggle-on"
              onClick={(e) => this.props.filterClick(e)}
            ></i>
          </div>
        </div>
      </div>
    );
  }
}
