import React, {useState, useEffect} from 'react';

import '../styles/newRecipeForm.css';

const NewRecipeForm = () => {
  const [recipeInformation, setRecipeInformation] = useState({});
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [currentTool, setCurrentTool] = useState('');
  const [toolList, setToolList] = useState([]);
  const [toolListDiv, setToolListDiv] = useState([]);
  const [currentDirection, setCurrentDirection] = useState('');
  const [directionsList, setDirectionsList] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [tagListDiv, setTagListDiv] = useState([]);
  
  const saveRecipe = (event) => {
    event.preventDefault();
    const form = event.target.parentNode;
    const recipeName = form.querySelector('.recipeName').value;
    const recipeDescription = form.querySelector('.recipeDescription').value || '';
    const prepTime = form.querySelector('.prepTime').value || 0;
    const cookTime = form.querySelector('.cookTime').value || 0;
    const servings = form.querySelector('.servings').value || 0;
    const cookingDevice = form.querySelector('.cookingDevice').value || '';
    const ovenTemp = form.querySelector('.ovenTemp').value || 0;
    const attribution = form.querySelector('.attribution').value || '';
    const notes = form.querySelector('.recipeNotes').value || '';
    const recipeDifficulty = form.querySelector('.recipeDifficulty').value || '';
    


    const recipe = {
      recipeInfo: {
        name: recipeName || '',
        description: recipeDescription || '',
        prepTime: prepTime || 0,
        cookTime: cookTime || 0,
        servings: servings || 0,
        cookingDevice,
        cookTemp: {
          temp: ovenTemp || 0,
          unit: '',
        },
      },
      ingredients: [
        ...ingredientsList
      ],
      tools: [
        ...toolList
      ],
      directions: [
        ...directionsList
      ],
      otherInformation: {
        attribution,
        notes,
        difficulty: recipeDifficulty || '',
      },
      tags: [
        ...tagList
      ],
    }

    setRecipeInformation({...recipe});
  }
  
  const addIngredient = (event) => {
    event.preventDefault();
    
    if (!toolList.includes(currentTool)) {
      setToolList([...toolList, currentTool]);
    }

    const toolListMap = toolList.map((tool) => {
      return (
        <div className="tool" key={tool}>
          <p className="toolText">{tool}</p>
        </div>
      );
    });

    setToolListDiv(
      <div className="toolList">
        {toolListMap}
      </div>
    );
  }

  const updateCurrentTool = (event) => {
    const newTool = event.target.parentNode.querySelector('.kitchenTool').value;
    setCurrentTool(newTool);
  }

  const addTool = (event) => {
    event.preventDefault();
    
    if (!toolList.includes(currentTool)) {
      setToolList([...toolList, currentTool]);
    }

    const toolListMap = toolList.map((tool) => {
      return (
        <div className="tool" key={tool}>
          <p className="toolText">{tool}</p>
        </div>
      );
    });

    setToolListDiv(
      <div className="toolList">
        {toolListMap}
      </div>
    );
  }
  
  const addDirection = () => {

  }

  const addTag = (event) => {
    event.preventDefault();
    const newTag = event.target.parentNode.querySelector('.tagInput').value;

    if (!tagList.includes(newTag)) {
      setTagList([...tagList, newTag]);
    }
    
    const tagListDivMap = tagList.map((tag) => {
      return (
      <div className="tagItem" key={tag}>
        <p className="tagItemText">{tag}</p>
        <p className="removeX">x</p>
      </div>
      )
    });

    setTagListDiv(
      <div className="tagList">
        {tagListDivMap}
      </div>
    )
  }
  
  console.log(recipeInformation);
  return (
    <div className="newRecipe">
      <form className="newRecipeForm">
        <button 
          className="saveRecipeButton newRecipeFormButton"
          onClick={saveRecipe}
        >
          Save Recipe
        </button>
        <div className="recipeMainInformation">
          <h1 className="newRecipeTitle">Recipe Information:</h1>
          <p>Recipe Name:</p>
          <input 
            className="recipeName"
            type="text"
            name="recipeName"
            placeholder="Orange Chicken, Homemade Pizza, etc"
          />
          <p>Description:</p>
          <textarea 
          className="recipeDescription"
          placeholder="Quick description of what the recipe is"
          >
          </textarea>
          <p>Preparation Time:</p>
          <input 
            className="prepTime"
            type="number"
            name="prepTime"
            placeholder="0"
          />
          minutes
          <p>Cook Time:</p>
          <input 
            className="cookTime"
            type="number"
            name="cookTime"
            placeholder="0"
          />
          minutes
          <p>Servings:</p>
          <input 
            className="servings"
            type="number"
            name="servings"
            placeholder="0"
          />
          <p>Cooking Device:</p>
          <input 
            className="cookingCheck"
            type="checkbox"
            name="cookingCheck"
          />
          <input 
            list="cookingDevices" 
            name="cookingDevice" 
            placeholder="Oven, Grill, Frying Pan"
            className="cookingDevice"
          />
            <datalist id="cookingDevices">
              <option value="Oven" />
              <option value="Crockpot" />
              <option value="Grill" />
              <option value="Waffle Iron" />
              <option value="Frying Pan" />
            </datalist>
           {/* 
            TODO: Add an input for an oven if the checkmark is clicked
           */}
           <p>Cooking Temperature:</p>
           <input 
            className="ovenTemp"
            type="number"
            name="ovenTemp"
            placeholder="0°"
          />
        </div>
        <div className="ingredientsList">
          <h1 className="newRecipeTitle">Ingredients:</h1>
          <p>Ingredient Amount:</p>
          <input 
            className="ingredientAmount"
            type="number"
            name="ingredientAmount"
            placeholder="0"
          />
          <div className="fractionInput">
            <input 
              className="ingredientAmount"
              type="number"
              name="ingredientAmount"
              placeholder="0"
            />
            <input 
              className="ingredientAmount"
              type="number"
              name="ingredientAmount"
              placeholder="0"
            />
          </div>
          <p>Measuring Unit:</p>
          <input 
            list="cookingUnits" 
            name="cookingUnits" 
            placeholder="Ounce, Pound, Tablespoon"
          />
            <datalist id="cookingUnits">
              <option value="Teaspoon" />
              <option value="Tablespoon" />
              <option value="Fluid ounce" />
              <option value="Cup" />
              <option value="Pint" />
              <option value="Quart" />
              <option value="Gallon" />
              <option value="Milliliter" />
              <option value="Liter" />
              <option value="Deciliter" />
              <option value="Pound" />
              <option value="Ounce" />
              <option value="Milligram" />
              <option value="Gram" />
              <option value="Kilogram" />
            </datalist>
          <p>Ingredient Name:</p>
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
            onChange={updateCurrentTool}
          />
          <br />
          {toolListDiv}
          <button 
            className="addToolButton newRecipeFormButton"
            onClick={addTool}
          >
            Add Tool
          </button>
        </div>
        <div className="recipeDirections">
          <h1 className="newRecipeTitle">Directions:</h1>

          <textarea 
          className="directionInput"
          placeholder="Direction(s) for preparing/cooking the recipe"
          >
          </textarea>
          <br />
          <button 
            className="addDirectionButton newRecipeFormButton"
            onClick={addDirection}
          >
            Add Direction
          </button>
        </div>
        <div className="recipeSecondaryInformation">
          <h1 className="newRecipeTitle">Other Information:</h1>
          <p>Attribution:</p>
          <input 
            className="attribution"
            type="text"
            name="attribution"
            placeholder="e.g. from Great Grandma so and so"
          />
          <p>Notes:</p>
          <textarea 
          className="recipeNotes"
          placeholder="Notes about the recipe"
          >
          </textarea>
          <p>Difficulty:</p>
          <select 
            name="recipeDifficulty"
            className="recipeDifficulty"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <div className="recipeTagsDiv">
            <h2>Tags:</h2>
            <div className="recipeTagList">
              {/* TODO: Add a list of the current recipe tags here */}
              {tagListDiv}
            </div>
            <input 
              className="tagInput"
              type="text"
              name="tagInput"
              placeholder="Add a recipe tag (e.g. breakfast, quick, holiday, etc)"
            />
            <br />
            <button 
              className="addTagButton newRecipeFormButton"
              onClick={addTag}
            >
              Add Tag
            </button>
          </div>
        </div>
        <button 
          className="saveRecipeButton newRecipeFormButton"
          onClick={saveRecipe}
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
}

export default NewRecipeForm;