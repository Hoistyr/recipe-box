import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, searchRecipes} from '../actions/recipes';

import '../styles/recipes.css';
import '../styles/searchResults.css';


const SearchResults = (props) => {
  const recipes = useSelector((state) => state.recipes);
  const [resultAmount, setResultAmount] = useState(0);
  const dispatch = useDispatch();
  let history = useHistory();

  const searchTag = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    console.log('tagClicked');
    const tag = event.target.textContent;
    
    const params = {
      search: tag,
    }

    dispatch(searchRecipes(params));
    const urlSearch = tag.replace(' ', '%');
    history.push(`/search?q=${urlSearch}`);
  }
  
  const recipeCards = recipes.map((recipe) => {
    let tagListMap = '';
    if (recipe.tags.length > 0) {
      tagListMap = recipe.tags.map((tag) => {
        return (
          <div className="cardTagItem" key={tag} onClick={searchTag}>
            <p className="tagItemText">{tag}</p>
          </div>
        );
      });
    }

    const totalTimeInMinutes = ((recipe.info.prepTime.hour * 60) + (recipe.info.prepTime.minute)) + ((recipe.info.cookTime.hour * 60) + (recipe.info.cookTime.minute));
    
    let timeSection = '';
    if (totalTimeInMinutes !== 0) {
      const convertedTime = Math.floor(totalTimeInMinutes / 60) + ':' + (totalTimeInMinutes % 60);
      timeSection = <p className="cardTimeDiv">Total time: {convertedTime}</p>;
    }
    
    const cardInformation =
    <div className="cardInformation">
      {timeSection}
    </div>
    
    return  (
      <Link to={`/recipes/view/${recipe.id}`}>
        <div className={`recipeCard difficulty${recipe.otherInformation.difficulty}`} key={recipe._id}>
          <h1 className="viewRecipeName">{recipe.info.name}</h1>
          {cardInformation}
          <div className="cardTagList">
            {tagListMap}
          </div>
        </div>
      </Link>
    )
  });

  useEffect(() => {
    setResultAmount(recipes.length);
  }, [recipes]);

  useEffect(() => {
    if (resultAmount < 1) {
      console.log('less than');
      setResultAmount(<p>No recipes found</p>);
    }
  
    if (resultAmount === 1) {
      setResultAmount(<p>Found {recipes.length} recipe</p>);
    }
  
    if (resultAmount > 1) {
      setResultAmount(<p>Found {recipes.length} recipes</p>);
    }
  }, [resultAmount])

  console.log(recipes.length);
  

  return (
    <div className="search">
      {resultAmount}
      <div className="searchCards">
        {recipeCards}
      </div>
    </div>
  );
}

export default SearchResults;