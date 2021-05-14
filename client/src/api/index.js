import axios from 'axios';

const API = axios.create({baseURL: 'https://recipe-box-cox.herokuapp.com'});

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req;
})

export const fetchRecipes = () => API.get(`/recipes`);

export const searchRecipes = (params) => API.get(`/search`, {params});

export const updateRecipe = (id, updatedRecipe) => API.patch(`/recipes/edit/${id}`, updatedRecipe);

export const deleteRecipe = (id) => API.delete(`/recipes/view/${id}`);

export const createRecipe = (newRecipe) => API.post(`/newrecipe`, newRecipe);

export const login = (user) => { 
  console.log('user: ', user);
  return API.post('/login', user)};

