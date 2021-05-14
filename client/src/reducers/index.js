import {combineReducers} from 'redux';
import loggedReducer from './isLogged';
import recipes from './recipes';



const allReducers = combineReducers({
  isLogged: loggedReducer,
  recipes,
})

export default allReducers;