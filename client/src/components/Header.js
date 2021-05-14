import React from 'react';
import {useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { searchRecipes, getRecipes } from '../actions/recipes';
import logo from '../images/logo.svg';
import '../styles/header.css';

const Header = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  
  const submitSearch = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    console.log('target: ', event.target);
    const search = event.target.value;

    event.target.value = '';
    if (search === '') {
      dispatch(getRecipes());
      history.push(`/recipes`);
      return;
    }

    const params = {
      search: event.target.value,
    }
    
    console.log(search);
    dispatch(searchRecipes(params));
    const urlSearch = search.replace(' ', '%');
    history.push(`/search?q=${urlSearch}`);
  }
  
  return (
    <header>
      <Link to="/">
        <div className="siteLogo">
          <img className="headerLogo" src={logo}></img>
          <h1 className="headerTitle">Recipe Box</h1>
        </div>
      </Link>
      
      <div className="headerSearchDiv">
        
        <input 
          type="text" 
          className="headerSearch" 
          placeholder="Search for recipes"
          onKeyPress={submitSearch}
          ></input>
      </div>
    </header>
  );
}

export default Header;