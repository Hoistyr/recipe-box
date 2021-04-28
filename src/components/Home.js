import React from 'react';
import { Link } from 'react-router-dom';
import newRecipe from '../images/newRecipe.svg';
import menuCalendar from '../images/menuCalendar.svg';
import allRecipes from '../images/allRecipes.svg';
import '../styles/home.css';


const Home = () => {
  return (
    <div className="home">
      <div className="mainLinks">
        <Link to="/newrecipe">
          <div className="newRecipeLink homeLinkDiv">
            <img src={newRecipe} className="homeLinkImage"></img>
            <p className="homeLinkText">Add New Recipe</p>
          </div>
        </Link>
          
        <div className="newRecipeLink homeLinkDiv">
          <img src={menuCalendar} className="homeLinkImage"></img>
          <p className="homeLinkText">Calendar</p>
        </div>
        <div className="allRecipeLink homeLinkDiv">
          <img src={allRecipes} className="homeLinkImage"></img>
          <p className="homeLinkText">All Recipes</p>
        </div>
      </div>
    </div>
  );
}

export default Home;