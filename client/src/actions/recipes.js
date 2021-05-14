import {FETCH_ALL, SEARCH, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api';

export const getRecipes = () => async (dispatch) => {
  console.log('getting recipes');
  try {
    const { data } = await api.fetchRecipes();
    console.log(data);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const searchRecipes = (params) => async (dispatch) => {
  try {
    console.log('pre');
    const { data } = await api.searchRecipes(params);
    console.log('searchdata: ', data);
    dispatch({ type: SEARCH, payload: data });
  } catch (error) {
    console.log('actions: ', error);
  }
}

export const createRecipe = (recipe) => async (dispatch) => {
  try {
    const { data } = await api.createRecipe(recipe);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log('bing bong', error.message);
  }
}

export const updateRecipe = (id, recipe) => async (dispatch) => {
  console.log('updating recipe');
  console.log(id);
  try {
    const { data } = await api.updateRecipe(id, recipe);
    
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log('blip blap', error.message);
  }
}

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await api.deleteRecipe(id);

    dispatch({type: DELETE, payload: id});
  } catch (error) {
    console.log(error.message);
  }
}