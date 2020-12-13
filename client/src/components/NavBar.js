import React from 'react';
import SearchBar from './SearchBar'
import './../public/style/navbar.css';

function Navbar() {
    return (
      <nav className="NavBar">
          <div>logo</div>
          <div><SearchBar/></div>
          <div>profile area</div>
      </nav>
    );
  }
  
  export default Navbar;