import React from 'react';

export default class MoreInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drink: props.drink,
            display: true
        };
    }

    removeMoreInformation() {
        this.setState({ display: false });
    }

    render() {
        if (this.state.display) {
            let moreIngredients = true;
            let i = 1;
            while (moreIngredients) {
                moreIngredients = (!(this.state.drink["strIngredient"+i] === null) && !(this.state.drink["strIngredient"+i] === ""))
                if (moreIngredients) i++
            }
            const txt = [];
            for (let j = 1; j < i; j++) {
                if (this.state.drink["strMeasure"+j] === null)
                    txt.push(<>{this.state.drink["strIngredient"+j] + " : unknown"}<br/></>)
                else 
                    txt.push(<>{this.state.drink["strIngredient"+j] + " : " + this.state.drink["strMeasure"+j]}<br/></>)
            }
            return (
                <div className="more-information-wrapper">
                    <div className="more-information">
                        <div className="more-information-header">
                            <div className="more-information-title">
                                {this.state.drink.strDrink}
                                </div>
                                <div className="more-information-close">
                                    <i className="fas fa-times" onClick={this.props.closeMoreInformation}></i>
                            </div>
                        </div>
                        <div className="more-information-ingredients">
                                <h3>Ingredients</h3>
                            <p>
                                {txt}
                            </p>
                        </div>
                        <div className="more-information-instructions">
                                <h3>Instructions</h3>
                            <p>
                                {this.state.drink.strInstructions}
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        return null;
    }

}