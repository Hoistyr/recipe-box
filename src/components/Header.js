import React from 'react';

import logo from '../images/logo.svg';
import '../styles/header.css';

const Header = () => {
  return (
    <header>
      <img className="headerLogo" src={logo}></img>
      <h1 className="headerTitle">Recipe Box</h1>
      <div className="headerSearchDiv">
        <input type="text" className="headerSearch" placeholder="Search for recipes"></input>
      </div>
    </header>
  );
}

export default Header;