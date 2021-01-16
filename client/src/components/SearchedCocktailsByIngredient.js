import React from 'react';
import CocktailFromId from './CocktailFromId';

export default class SearchedCocktailsByIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moreInfo: false,
            error: null,
            isLoaded: false,
            items: [],
            reload: 1

        };
        this.loadMore = this.loadMore.bind(this)
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

    componentDidUpdate(previousProps) {
        if (this.props.url !== previousProps.url) {
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
          this.setState({ reload: 1})
        }
    }

    loadMore() {
        this.setState({
            reload: this.state.reload + 1
        })
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            var cocktailsTab = [];
            var cocktailsID = [];
            var i = 0;
            (this.state.items.map((item) => {
                if (i < 8 * this.state.reload) {
                    cocktailsTab.push(
                        <CocktailFromId
                          likedCocktails={this.props.likedCocktails}
                          ico={this.props.ico}
                          icoFL={this.props.icoFL}
                          drink={item}
                        />)
                }
                else {
                    cocktailsID.push(item.idDrink)
                }
                i++
            })
            )
            return (
                <div className="content container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
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
            )
        }
    }
}