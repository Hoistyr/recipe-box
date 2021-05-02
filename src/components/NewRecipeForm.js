import React, {useState, useEffect} from 'react';
import uniqid from 'uniqid';

import '../styles/newRecipeForm.css';

const NewRecipeForm = () => {
  const [recipeInformation, setRecipeInformation] = useState({});
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientListDiv, setIngredientListDiv] = useState([]);
  const [currentTool, setCurrentTool] = useState('');
  const [toolList, setToolList] = useState([]);
  const [toolListDiv, setToolListDiv] = useState([]);
  const [directionsList, setDirectionsList] = useState([]);
  const [directionsListDiv, setDirectionsListDiv] = useState([]);
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
      id: uniqid.time('recipe-'),
    }

    setRecipeInformation({...recipe});
  }

  const addIngredient = (event) => {
    event.preventDefault();

    const ingrInputDiv = event.target.parentNode.querySelector('.ingredientInputDiv');
    let fullNum = ingrInputDiv.querySelector('.fullInput').value;
    if (fullNum === '0') {
      fullNum = '';
    }
    const numerator = ingrInputDiv.querySelector('.numerator').value;
    let denominator = ingrInputDiv.querySelector('.denominator').value;
    const unit = ingrInputDiv.querySelector('.ingredientUnit').value.toLowerCase();
    const name = ingrInputDiv.querySelector('.ingredientName').value.toLowerCase();
    let listCopy = [...ingredientsList];

    const newIngredient = {
      amount:  {
        fullNum,
        numerator,
        denominator,
      },
      unit,
      name,
    }

    const inList = listCopy.some((ingredient) => {
      if (ingredient.name === newIngredient.name) {
        return true;
      }
      return false;
    });

    if (inList === false) {
      listCopy = [...listCopy, newIngredient];
    }

    setIngredientsList(listCopy);
  }

  const removeIngredient = (event) => {
    let ingredient = event.target.parentNode;
    if (ingredient.className === 'removeIngredientDiv') {
      ingredient = ingredient.parentNode;
    }
    
    const ingredientText = ingredient.querySelector('.ingredientText').innerText;

    let listCopy = [...ingredientsList];
    listCopy = listCopy.filter((listItem) => {
      const nameIndex = ingredientText.search(listItem.name);
      let checkText = ingredientText.slice(nameIndex);
       
      if (listItem.name === checkText) {
        return false;
      }
      return true;
    });
    
    setIngredientsList(listCopy);
  }

  useEffect(() => {
    let ingredientsListMap = ingredientsList.map((ingredient) => {
      let fractionText = '';
      if (ingredient.amount.numerator !== '' && !ingredient.amount.denominator !== '') {
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
          <div className="removeIngredientDiv" onClick={removeIngredient}>
            <p className="removeX">x</p>
          </div>
        </div>
      );
    });
      

    setIngredientListDiv(
      <div className="ingredientList">
        {ingredientsListMap}
      </div>
    );
  }, [ingredientsList]);

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
  
  const addStep = (event) => {
    event.preventDefault();
    const recipeDirections = event.target.parentNode;
    let copyList = [...directionsList];
    let stepText = recipeDirections
      .querySelector('.directionInput')
      .value
      .toLowerCase();
    recipeDirections.querySelector('.directionInput').value = '';
    stepText = stepText.replace(/\n/g, ' ');
    console.log('ding: ', stepText.charAt(stepText.length - 1));
    if (stepText.charAt(stepText.length - 1) === ' ') {
      stepText = stepText.slice(0, stepText.length - 1);
    }
    
    if (!copyList.includes(stepText)) {
      copyList = [...copyList, stepText];
    }

    setDirectionsList(copyList);
  }

  const removeDirection = (event) => {
    let direction = event.target.parentNode;
    if (direction.className === 'removeDirectionDiv') {
      direction = direction.parentNode;
    }
    const directionText = direction.querySelector('.directionItemText').innerText;

    let listCopy = [...directionsList];
    listCopy = listCopy.filter((listItem) => {
      const nameIndex = directionText.search(listItem);
      let checkText = directionText.slice(nameIndex);

      if (listItem === checkText) {
        return false;
      }
      return true;
    });
    
    setDirectionsList(listCopy);
  }

  // Updates the directionsList div when a new step is added or removed
  useEffect(() => {
    const directionsListDivMap = directionsList.map((direction, index) => {
      return (
      <div className="directionItem" key={`step${index + 1}`}>
        <p className="directionItemText">
          {`Step ${index + 1}: `}
          {direction}
        </p>
        <div className="removeDirectionDiv" onClick={removeDirection}>
          <p className="removeX">x</p>
        </div>
      </div>
      );
    });
    console.log(directionsList);
    setDirectionsListDiv(
      <div className="directionsList">
        {directionsListDivMap}
      </div>
    );
  }, [directionsList]);

  // Section for updating recipe tags
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
        <div className="recipeMainInformation formSection">
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
        <div className="ingredientsList formSection">
          <h1 className="newRecipeTitle">Ingredients:</h1>
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
                  <div className="divisionLine"></div>
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
                  <option value="teaspoon" />
                  <option value="tablespoon" />
                  <option value="fluid ounce" />
                  <option value="cup" />
                  <option value="pint" />
                  <option value="quart" />
                  <option value="gallon" />
                  <option value="milliliter" />
                  <option value="liter" />
                  <option value="deciliter" />
                  <option value="pound" />
                  <option value="ounce" />
                  <option value="milligram" />
                  <option value="gram" />
                  <option value="kilogram" />
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
          <h2>Current Ingredient(s):</h2>
          {ingredientListDiv}
        </div>
        <div className="kitchenTools formSection">
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
        <div className="recipeDirections formSection">
          <h1 className="newRecipeTitle">Directions:</h1>

          <textarea 
          className="directionInput"
          placeholder="Direction(s) for preparing/cooking the recipe"
          >
          </textarea>
          <br />
          <button 
            className="addDirectionButton newRecipeFormButton"
            onClick={addStep}
          >
            Add Step
          </button>
          {directionsListDiv}
        </div>
        <div className="recipeSecondaryInformation formSection">
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