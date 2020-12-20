import React from 'react';
import Ingredient from './Ingredient'

export default class SearchedIngredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moreInfo: false,
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.ingredients
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

    render() {
        const { error, isLoaded, items } = this.state;
        var ingredients = [];
        (items.map((item) => {
            ingredients.push(<Ingredient ingredient={item} />)
        }));
        if (error) {
            return <div>Error : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    {ingredients}
                </React.Fragment>
            )
        }
    }
}