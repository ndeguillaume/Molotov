import React from 'react';

export default class MoreInformation extends React.Component {
  constructor(props) {
      console.log(props.drink)
    super(props);
    this.state = {
        drink: props.drink,
        display: true
      };    
  }

  removeMoreInformation() {
      this.setState({display: false});
  }

  render() {
    if(this.state.display) { 
        return (
            <div className="more-information-wrapper">
                <div className="more-information">
                    <div className="more-information-header">
                        <div className="more-information-title">
                            {this.state.drink.strDrink}
                        </div>
                        <div className="more-information-close">
                        <i className="fas fa-times" onClick={() => this.removeMoreInformation()}></i>
                        </div>
                    </div>
                    {this.state.drink.strInstructions }
                </div>
            </div>
            )
  }
  return null;
}

}