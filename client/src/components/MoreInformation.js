import React from 'react';

export default class MoreInformation extends React.Component {
    render() {
        let moreIngredients = true;
        let i = 1;
        while (moreIngredients) {
            moreIngredients = (!(this.props.drink["strIngredient" + i] === null) && !(this.props.drink["strIngredient" + i] === ""))
            if (moreIngredients) i++
        }
        const txt = [];
        for (let j = 1; j < i; j++) {
            if (this.props.drink["strMeasure" + j] === null)
                txt.push(<>{this.props.drink["strIngredient" + j] + " : unknown"}<br /></>)
            else
                txt.push(<>{this.props.drink["strIngredient" + j] + " : " + this.props.drink["strMeasure" + j]}<br /></>)
        }
        return (
            <div className="more-information-wrapper">
                <div className="more-information">
                    <div className="more-information-header">
                        <div className="more-information-title">
                            {this.props.drink.strDrink}
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
                            {this.props.drink.strInstructions}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}