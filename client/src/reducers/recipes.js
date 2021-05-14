import {FETCH_ALL, SEARCH, CREATE, UPDATE, DELETE} from '../constants/actionTypes';

export default (recipes = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case SEARCH:
      console.log('SEARCH');
      return action.payload;
    case CREATE:
      console.log('CREATE: ', action.payload);
      return [...recipes, action.payload];
    case UPDATE:
      return recipes.map((recipe) => recipe.id === action.payload.id ? action.payload : recipe);
    case DELETE:
      return recipes.filter((recipe) => recipe.id !== action.payload);
    default:
      return recipes;
  }
}