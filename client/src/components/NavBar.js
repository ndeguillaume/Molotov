import React from "react";
import SearchBar from "./SearchBar";
import ColorFilter from "./ColorFilter";
import "./../public/style/navbar.css";
import purple from "./../public/images/purple.png";
import blue from "./../public/images/blue.png";
import green from "./../public/images/green.png";
import orange from "./../public/images/orange.png";
import pink from "./../public/images/pink.png";
import yellow from "./../public/images/yellow.png";
import red from "./../public/images/red.png";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.colorIco = React.createRef();
}

  render() {
    var color;
    var colors = [purple, blue, green, orange, pink, yellow, red]
    if (this.props.color === "purple") color = purple;
    if (this.props.color === "blue") color = blue;
    if (this.props.color === "green") color = green;
    if (this.props.color === "orange") color = orange;
    if (this.props.color === "pink") color = pink;
    if (this.props.color === "yellow") color = yellow;
    if (this.props.color === "red") color = red;
    return (
      <nav className="NavBar">
        <div>
          <img
            className="reset-ico"
            src={color}
            alt="app-logo"
            onClick={this.props.resetSearch}
          ></img>
        </div>
        <div>
          <SearchBar
            displayFilterDiv={this.props.displayFilterDiv}
            filterClick={this.props.filterClick}
            search={this.props.search}
            handleClick={this.props.handleClick}
          />
        </div>
        <i class="fas fa-paint-brush" ref={this.colorIco} onClick={this.props.colorClick}></i>
        {this.props.displayColorDiv ? <ColorFilter setColor={this.props.setColor} colorIco={this.colorIco} colors={colors} /> : null}
        <div className="button-wrapper">
          <div className="login-button">Login</div>
        </div>
      </nav>
    );
  }
}
