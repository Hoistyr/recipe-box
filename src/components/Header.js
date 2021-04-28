import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.svg';
import '../styles/header.css';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <div className="siteLogo">
          <img className="headerLogo" src={logo}></img>
          <h1 className="headerTitle">Recipe Box</h1>
        </div>
      </Link>
      
      <div className="headerSearchDiv">
        <input type="text" className="headerSearch" placeholder="Search for recipes"></input>
      </div>
    </header>
  );
}

export default Header;