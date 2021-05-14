import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {getRecipes, searchRecipes} from '../actions/recipes';
import '../styles/recipes.css';


const ViewRecipes = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const fetchRecipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch]);

  const [recipes, setRecipes] = useState([]);
  // const [recipeCards, setRecipeCards] = useState([]);

  const searchTag = (event) => {
    event.stopPropagation();
    const tag = event.target.textContent;
    
    const params = {
      search: tag,
    }

    dispatch(searchRecipes(params));
    const urlSearch = tag.replace(' ', '%');
    history.push(`/search?q=${urlSearch}`);
  }

  const recipeCards = fetchRecipes?.map((recipe) => {
    console.log(recipe.info);
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
    let totalTimeInMinutes = '';
    if (recipe.info) {
      totalTimeInMinutes = ((recipe.info.prepTime.hour * 60) + (recipe.info.prepTime.minute)) + ((recipe.info.cookTime.hour * 60) + (recipe.info.cookTime.minute));
    }
    
    
    let timeSection = '';
    if (totalTimeInMinutes !== 0) {
      const convertedTime = Math.floor(totalTimeInMinutes / 60) + ':' + (totalTimeInMinutes % 60);
      timeSection = <p className="cardTimeDiv">Total time: {convertedTime}</p>;
    }
    
    const cardInformation =
    <div className="cardInformation">
      {timeSection}
    </div>
    if (recipe.info) {
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
      );
    }
    
  });
  

  return (
    <div className="recipes">
    {recipeCards}
  </div>
  );
}

export default ViewRecipes;