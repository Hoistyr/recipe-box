import {LOG_IN, LOG_OUT} from '../constants/actionTypes';
import * as api from '../api';

export const logIn = (user, history) => async (dispatch) => {
  console.log('in action logIn');
  try {
    const { data } = await api.login(user);

    dispatch({ type: LOG_IN, payload: data });
  } catch (error) {
    console.log(error)
  }
}

export const logOut = (user, history) => async (dispatch) => {
  try {
    const { data } = await api.login();
    
    dispatch({ type: LOG_OUT, payload: data });
  } catch (error) {
    console.log(error)
  }
}
