import React, {useState, useEffect} from 'react';

import '../styles/newRecipeForm.css';

const NewRecipeForm = () => {
  const [recipeInformation, setRecipeInformation] = useState({});
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientListDiv, setIngredientListDiv] = useState([]);
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
    const prepTime = {
      hour: form.querySelector('.prepTimeHour').value || 0,
      minute: form.querySelector('.prepTimeMinute').value || 0,
    };
    const cookTime = {
      hour: form.querySelector('.cookTimeHour').value || 0,
      minute: form.querySelector('.cookTimeMinute').value || 0,
    };
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
        cookingDevice: cookingDevice || '',
        cookTemp: ovenTemp || 0,
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
      // TODO: Add a random generator for to create an id for the recipe when it is saved 
      id: '',
    }

    setRecipeInformation({...recipe});
  }

  


  
  const addIngredient = (event) => {
    event.preventDefault();

    const ingrInputDiv = event.target.parentNode.querySelector('.ingredientInputDiv');
    const fullNum = ingrInputDiv.querySelector('.fullInput').value;
    const numerator = ingrInputDiv.querySelector('.numerator').value;
    const denominator = ingrInputDiv.querySelector('.denominator').value;
    const unit = ingrInputDiv.querySelector('.ingredientUnit').value;
    const name = ingrInputDiv.querySelector('.ingredientName').value;
    const listCopy = [...ingredientsList];

    const newIngredient = {
      amount:  {
        fullNum,
        numerator,
        denominator,
      },
      unit,
      name,
    }
    console.log(newIngredient);
    const ingredientCheck = listCopy.filter((ingredient) => {
      if (ingredient.name === newIngredient.name) {
        return true;
      }
      return false;
    }).length;
    
    let ingredientsListMap = '';
    if (ingredientCheck === 0 && newIngredient.name !== '') {
      setIngredientsList([...listCopy, newIngredient]);
      ingredientsListMap = ingredientsList.map((ingredient) => {
        return (
          <div className="ingredient" key={ingredient.name}>
            <p className="ingredientText">{ingredient.amount.fullNum} {ingredient.amount.numerator}/{ingredient.amount.denominator} {unit} of {name}</p>
          </div>
        );
      });
    }
    
    console.log('ingrList: ', ingredientsList);
    setIngredientListDiv(
      <div className="ingredientList">
        {ingredientsListMap}
      </div>
    );
  }

  const updateCurrentTool = (event) => {
    const newTool = event.target.parentNode.querySelector('.kitchenTool').value.toLowerCase();
    setCurrentTool(newTool);
  }

  const handleToolKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTool(event);
    }
  }
  
  const addTool = (event) => {
    event.preventDefault();
    event.target.parentNode.querySelector('.kitchenTool').value = '';
    if (!toolList.includes(currentTool)) {
      setToolList([...toolList, currentTool]);
    }
  }

  const removeTool = (event) => {
    let tool = event.target.parentNode;
    if (tool.className === 'removeToolDiv') {
      tool = tool.parentNode;
    }
    const toolText = tool.querySelector('.toolText').innerText;
    console.log(toolText);

    let listCopy = [...toolList];
    listCopy = listCopy.filter((listItem) => {
      if (listItem === toolText) {
        return false;
      }
      return true;
    });
    console.log(listCopy);
    
    setToolList(listCopy);
  }

  //Updates the toolList div when a tool is added or removed
  useEffect(() => {
    const toolListMap = toolList.map((tool) => {
      return (
        <div className="tool" key={tool}>
          <p className="toolText">{tool}</p>
          <div className="removeToolDiv" onClick={removeTool}>
            <p className="removeX">x</p>
          </div>
        </div>
      );
    });

    setToolListDiv(
      <div className="toolList">
        {toolListMap}
      </div>
    );
  }, [toolList]);
  
  const addDirection = () => {

  }

  const updateCurrentTag = (event) => {
    const newTag = event.target.parentNode.querySelector('.tagInput').value.toLowerCase();
    setCurrentTag(newTag);
  }

  const handleTagKeyPress = (event) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      addTag(event);
    }
  }
  
  const addTag = (event) => {
    event.preventDefault();
    event.target.parentNode.querySelector('.tagInput').value = '';

    if (!tagList.includes(currentTag)) {
      setTagList([...tagList, currentTag]);
    }
  }

  const removeTag = (event) => {
    let tagItem = event.target.parentNode;
    if (tagItem.className === 'removeTagDiv') {
      tagItem = tagItem.parentNode;
    }
    const tagText = tagItem.querySelector('.tagItemText').innerText;

    let listCopy = [...tagList];
    listCopy = listCopy.filter((listItem) => {
      if (listItem === tagText) {
        return false;
      }
      return true;
    });
    
    setTagList(listCopy);
  }

  // Updates the div for the recipes tags when a tag is added or removed
  useEffect(() => {
    const tagListDivMap = tagList.map((tag) => {
      return (
      <div className="tagItem" key={tag}>
        <p className="tagItemText">{tag}</p>
        <div className="removeTagDiv" onClick={removeTag}>
          <p className="removeX">x</p>
        </div>
      </div>
      )
    });
    console.log(tagList);
    setTagListDiv(
      <div className="tagList">
        {tagListDivMap}
      </div>
    );
  }, [tagList]);
  
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
          <div className="prepTimeInputDiv">
            <input 
              className="prepTimeHour prepTimeInput"
              type="number"
              name="prepTime"
              placeholder="0"
            />
            <p className="timeText">hour(s)</p>
            <input 
              className="prepTimeMinute prepTimeInput"
              type="number"
              name="prepTime"
              placeholder="0"
            />
            <p className="timeText">minute(s)</p>
          </div>
          <p>Cook Time:</p>
          <div className="cookTimeInputDiv">
            <input 
              className="cookTimeHour cookTimeInput"
              type="number"
              name="cookTime"
              placeholder="0"
            />
            <p className="timeText">hour(s)</p>
            <input 
              className="cookTimeMinute cookTimeInput"
              type="number"
              name="cookTime"
              placeholder="0"
            />
            <p className="timeText">minute(s)</p>
          </div>
          <p>Servings:</p>
            <input 
              className="servings"
              type="number"
              name="servings"
              placeholder="0"
            />
          
          <p>Cooking Device:</p>
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
          {ingredientListDiv}
          <div className="ingredientInputDiv">
            <div className="ingredientAmountDiv">
            <p>Ingredient Amount:</p>
              <div className="amountDiv">
                <div className="amountFull">
                  <input 
                    className="ingredientAmount fullInput"
                    type="number"
                    name="ingredientAmount"
                    placeholder="0"
                  />
                </div>
                <div className="amountFraction">
                  <input 
                    className="ingredientAmount fractionInput numerator"
                    type="number"
                    name="ingredientAmount"
                    placeholder="1"
                  />
                  <input 
                    className="ingredientAmount fractionInput denominator"
                    type="number"
                    name="ingredientAmount"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>
            <div className="cookingUnitDiv">
              <p>Measuring Unit:</p>
              <input 
                list="cookingUnits" 
                name="cookingUnits" 
                placeholder="Ounce, Pound, Tablespoon"
                className="ingredientUnit"
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
            </div>
            <div className="ingredientNameDiv">
              <p>Ingredient Name:</p>
              <input 
                className="ingredientName"
                type="text"
                name="ingredientName"
                placeholder="Rice, Apples, Green Onion"
                className="ingredientName"
              />
            </div>
          </div>
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
            placeholder="Whisk, spoon, chef's knife"
            onChange={updateCurrentTool}
            onKeyPress={handleToolKeyPress}
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
              onChange={updateCurrentTag}
              onKeyPress={handleTagKeyPress}
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