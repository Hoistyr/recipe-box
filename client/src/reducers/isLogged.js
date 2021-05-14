import {LOG_IN, LOG_OUT} from '../constants/actionTypes';
const loggedReducer = (state = {authData: null, loggedIn: false}, action) => {
  switch(action.type) {
    case LOG_IN:
      localStorage.setItem('profile', JSON.stringify({...action?.data}));

      return {...state, authData: action?.data, loggedIn: true};
    case LOG_OUT:
      localStorage.clear();
      return {...state, authData: null, loggedIn: false};
    default:
      return state;
  }
}

export default loggedReducer;