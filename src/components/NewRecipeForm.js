import React from 'react';

import '../styles/newRecipeForm.css';

const NewRecipeForm = () => {
  const addIngredient = () => {

  }

  const addDirection = () => {

  }
  
  return (
    <div className="newRecipe">
      <form className="newRecipeForm">
        <div className="recipeMetaInformation">
          <h1 className="newRecipeTitle">Recipe Information:</h1>
          <input 
            className="recipeName"
            type="text"
            name="recipeName"
            placeholder="Recipe Name"
          />
          <input 
            className="prepTime"
            type="number"
            name="prepTime"
            placeholder="0"
          />
          minutes
          <input 
            className="cookTime"
            type="number"
            name="cookTime"
            placeholder="0"
          />
          minutes
          <input 
            className="servings"
            type="number"
            name="servings"
            placeholder="0"
          />
          servings
          <input 
            className="ovenCheck"
            type="checkbox"
            name="ovenCheck"
          />
          uses oven

           {/* 
            TODO: Add an input for an oven if the checkmark is clicked
           */}
           <input 
            className="ovenTemp"
            type="number"
            name="ovenTemp"
            placeholder="0"
          />
        </div>
        <div className="ingredientsList">
          <h1 className="newRecipeTitle">Ingredients</h1>
          <input 
            className="ingredientAmount"
            type="number"
            name="ingredientAmount"
            placeholder="0"
          />
          <input 
            className="ingredientAmountType"
            type="text"
            name="ingredientAmountType"
            placeholder=""
          />
          <input 
            className="ingredientName"
            type="text"
            name="ingredientName"
            placeholder="Ingredient Name"
          />
          <br />
          <button 
            className="addIngredientButton newRecipeFormButton"
            onClick={addIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <div className="kitchenTools">
          <h1 className="newRecipeTitle">Tools Needed:</h1>
          <input 
            className="kitchenTool"
            type="text"
            name="ingredientName"
            placeholder="Tool needed"
          />
          <br />
          <button 
            className="addIngredientButton newRecipeFormButton"
            onClick={addIngredient}
          >
            Add Tool
          </button>
        </div>
        <div className="recipeDirections">
          <h1 className="newRecipeTitle">Directions</h1>

          <textarea 
          className="directionInput"
          placeholder="Direction(s) for preparing/cooking the recipe"
          >
          </textarea>
          <br />
          <button 
            className="addDirection newRecipeFormButton"
            onClick={addDirection}
          >
            Add Direction
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewRecipeForm;