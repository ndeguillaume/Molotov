import React from "react";
import CocktailFromId from "./CocktailFromId";
import "./../public/style/likedDrinksPage.css";



export default class LikedDrinksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moreInfo: false,
            items: [],
            reload: 1,
          };

        this.loadMore = this.loadMore.bind(this);  
    }
    
    // componentDidMount() {
    //     fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    //     .then(res => res.json())
    //     .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         item: result.drinks[0]
    //       });
    //     },
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
        
    //}

    loadMore() {
        this.setState({
          reload: this.state.reload + 1,
        });
      }

    render(){
        
        var cocktails = [];
        var hiddenCocktails = [];
        for (let i = 0; i < this.props.likedCocktails.length; i++) {
            if (i < 10 * this.state.reload) {
                cocktails.push(
                    <div className="col-3">
                        <CocktailFromId 
                            addLikedCocktail={this.props.addLikedCocktail}
                            removeLikedCocktail={this.props.removeLikedCocktail}
                            likedCocktails={this.props.likedCocktails}  
                            id={this.props.likedCocktails[i]}
                            ico={this.props.ico} 
                            icoFL={this.props.icoFL}
                        />
                    </div>
                )
            }
            else {
                hiddenCocktails.push(this.props.likedCocktails[i]);
            }            
        }           
        if (cocktails.length === 0) {
            cocktails.push(
              <h3 className="empty-set">You haven't liked any cocktail yet !</h3>
            );
          }
            return (  
            <div className={`${this.props.color} liked-drinks-page container`}>
                <div className="liked-drink-header">
                    <h3 className="liked-drinks-title">
                        <p id="molot-title-color">Molot</p>
                        <p>Loves</p> 
                    </h3>                         
                </div>
                <div className="liked-drink-separator"></div>
                <div className="content container">
                    <div className="row">
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