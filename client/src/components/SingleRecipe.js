import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { searchRecipes, deleteRecipe, getRecipes } from '../actions/recipes';

import '../styles/singleRecipe.css';


const SingleRecipe = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeletePopup, setConfirmDeletePopup] = useState('');
  const [popupExists, setPopupExists] = useState(false);
  
  
  const allRecipes = useSelector((state) => state.recipes);
  const recipe = allRecipes.filter((recipe) => recipe.id === props.match.params.recipeId)[0];
  console.log('recipe: ', recipe);
  console.log(props);

  const searchTag = (event) => {
    const tag = event.target.textContent;
    
    const params = {
      search: tag,
    }

    dispatch(searchRecipes(params));
    const urlSearch = tag.replace(' ', '%');
    history.push(`/search?q=${urlSearch}`);
  }
  
  const startDeleteRecipe = () => {
    setPopupExists(true);
    setReturnDiv(pageDiv);
    const cancelDelete = () => {
      setConfirmDeletePopup('');
      setPopupExists(false);
    }

    const confirmDelete = () => {
      setConfirmDeletePopup('');
      setPopupExists(false);
      dispatch(deleteRecipe(recipe.id))
      .then(dispatch(getRecipes()))
      .then(console.log('post delete state recipes: ', allRecipes))
      .then(history.push('/'));
    }
    
    const popup =
    <div className="confirmDeletePopup">
      <div className="backgroundDark" onClick={cancelDelete}>

      </div>
      <div className="confirmCard">
        <h1 className="cancelX" onClick={cancelDelete}>X</h1>
        <h1>Are you sure you want to delete {recipe.info.name}?</h1>
        <div className="deletePopButtons">
          <button 
            className="deleteRecipeButton singleViewButton singleDeleteButton"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button 
            className="deleteRecipeButton singleViewButton singleDeleteButton"
            onClick={cancelDelete}
          >
          No
        </button>
        </div>
        
      </div>
    </div>
    setConfirmDeletePopup(popup);

    
  }
  
  let ingredientsListMap = '';
  if (recipe.ingredients.length > 0) {
    ingredientsListMap = recipe.ingredients.map((ingredient) => {
      let fractionText = '';
      if ((ingredient.amount.numerator !== '' && ingredient.amount.numerator !== null) && (!ingredient.amount.denominator !== '' && ingredient.amount.denominator !== null)) {
        fractionText = ingredient.amount.numerator + '/' + ingredient.amount.denominator;
      }
      
      let ingredientText =
        <p className="ingredientText">{ingredient.amount.fullNum} {fractionText} {ingredient.unit} of {ingredient.name}</p>
      if (ingredient.unit === '') {
        ingredientText = 
          <p className="ingredientText">{ingredient.amount.fullNum} {fractionText} {ingredient.name}</p>
      }
      return (
        <div className="ingredient" key={ingredient.name}>
          {ingredientText}
        </div>
      );
    });
  }

  let toolListMap = '';
  if (recipe.tools.length > 0) {
    toolListMap = recipe.tools.map((tool) => {
      return (
        <div className="tool" key={tool}>
          <p className="toolText">{tool}</p>
        </div>
      );
    });
  }

  let directionsListMap = '';
  if (recipe.directions.length > 0) {
    directionsListMap = recipe.directions.map((direction, index) => {
      return (
      <div className="directionItem" key={`step${index + 1}`}>
        <p className="directionItemText">
          {`Step ${index + 1}: `}
          {direction}
        </p>
      </div>
      );
    });
  }

  let tagListMap = '';
  if (recipe.tags.length > 0) {
    tagListMap = recipe.tags.map((tag) => {
      return (
        <div className="singleTagItem" key={tag} onClick={searchTag}>
          <p className="tagItemText">{tag}</p>
        </div>
      );
    });
  }

  let cookTempDiv = '';
  if (recipe.info.cookTemp !== '' && recipe.info.cookTemp !== 0) {
    cookTempDiv = 
    <div className="cookTempDiv">
      <p>Cooking Temperature:</p>
      <p className="cookingTemperature">{recipe.info.cookTemp}</p>
    </div>
  }

  let prepHour = '';
  if (recipe.info.prepTime.hour !== 0) {
    prepHour = 
    <div className="prepHour singleTimeText">
      <p className="prepTimeHour">{recipe.info.prepTime.hour}</p>
      <p className="timeText">hour(s)</p>
    </div>
  }

  let prepMinute = '';
  if (recipe.info.prepTime.minute !== 0) {
    prepMinute = 
    <div className="prepMinute singleTimeText">
      <p className="prepTimeMinute">{recipe.info.prepTime.minute}</p>
      <p className="timeText">minute(s)</p>
    </div>
  }

  const prepTime =
    <div className="singlePrepTimeDiv singleGenInfoDiv">
      <p>Preparation Time:</p>
      {prepHour}
      {prepMinute}
    </div>;

  let cookHour = '';
  if (recipe.info.cookTime.hour !== 0) {
    cookHour = 
    <div className="cookHour singleTimeText">
      <p className="cookTimeHour">{recipe.info.cookTime.hour}</p>
      <p className="timeText">hour(s)</p>
    </div>
  }

  let cookMinute = '';
  if (recipe.info.cookTime.minute !== 0) {
    cookMinute = 
    <div className="cookMinute singleTimeText">
      <p className="cookTimeMinute">{recipe.info.cookTime.minute}</p>
      <p className="timeText">minute(s)</p>
    </div>
  }

  const cookTime =
    <div className="singleCookTimeDiv singleGenInfoDiv">
      <p>Cook Time:</p>
      {cookHour}
      {cookMinute}
    </div>;

  const singleViewButtons =
    
      <div className="singleViewButtonDiv">
        <Link to={`/recipes/edit/${recipe.id}`}>
          <button 
            className="editRecipeButton singleViewButton singleEditButton"
            >
              Edit
          </button>
        </Link>
        <button 
          className="deleteRecipeButton singleViewButton singleDeleteButton"
          onClick={startDeleteRecipe}
        >
          Delete
        </button>
      </div>

  const recipePage = 
    <div className="singleRecipe">
      
      {singleViewButtons}
      <div className="recipeMainInformation formSection">
        <h1 className="singleRecipeName">{recipe.info.name}</h1>
        <p className="recipeDescription">{recipe.info.description}</p>
        <div className="singleRecipeGenInfo">
          {prepTime}
          {cookTime}

          <div className="singleServingsDiv singleGenInfoDiv">
            <p className="serves">Serves:</p>
            <p>{recipe.info.servings}</p>
          </div>
          
          <div className="singleCookingDeviceDiv singleGenInfoDiv">
            <p>Cooking Device:</p>
            <p className="cookingDevice">{recipe.info.cookingDevice}</p>
            {cookTempDiv}
          </div>
        </div>
      </div>
      <div className="ingredientsList formSection">
        <h1 className="newRecipeTitle">Ingredients:</h1>
        <div className="ingredientList">
          {ingredientsListMap}
        </div>
      </div>
      <div className="kitchenTools formSection">
        <h1 className="newRecipeTitle">Tools:</h1>
        {toolListMap}
      </div>
      <div className="recipeDirections formSection">
        <h1 className="newRecipeTitle">Directions:</h1>
        {directionsListMap}
      </div>
      <div className="recipeSecondaryInformation formSection">
        <h1 className="newRecipeTitle">Other Information:</h1>
        <h3>Attribution:</h3>
        <p className="attribution">{recipe.otherInformation.attribution}</p>
        <h3>Notes:</h3>
        <p className="recipeNotes">{recipe.otherInformation.notes}</p>
        <h3>Difficulty:</h3>
        <p className="recipeDifficulty">{recipe.otherInformation.difficulty}</p>
        <div className="recipeTagsDiv">
          <h2>Tags:</h2>
          <div className="singleRecipeTagList">
            {tagListMap}
          </div>
        </div>
      </div>
      {singleViewButtons}
    </div>
  
  const pageDiv =
  <div className="recipe">
    {confirmDeletePopup}
    {recipePage}
  </div>;
  const [returnDiv, setReturnDiv] = useState(pageDiv);  
  return (
    <div className="recipe">
      {confirmDeletePopup}
      {recipePage}
    </div>
  );
}

export default SingleRecipe;