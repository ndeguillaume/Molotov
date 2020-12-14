import React from 'react';
import SearchBar from './SearchBar'
import './../public/style/navbar.css';
import ico from './../public/images/violet.png'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  resetSearch() {
    this.props.resetSearch();
}

  render() {
    return (
      <nav className="NavBar">
        <div><img className="reset-ico" src={ico} onClick={() => this.resetSearch()}></img></div>
        <div><SearchBar search={this.props.search} handleClick={this.props.handleClick}/></div>
        <div className="button-wrapper"><div className="login-button">Login</div></div>
      </nav>
    );
  }
}