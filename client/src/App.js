import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import { getRecipes } from './actions/recipes';
import NewRecipeForm from './components/NewRecipeForm';
import ViewRecipes from './components/ViewRecipes';
import SingleRecipe from './components/SingleRecipe';
import SubmitSuccess from './components/SubmitSuccess';
import SearchResults from './components/SearchResults';
import EditRecipeForm from './components/EditRecipeForm';

const App = () => {
  const loggedIn = useSelector((state) => state.isLogged.loggedIn);
  const [landingPage, setLandingPage] = useState(<Login />);
  const [logGet, setLogGet] = useState(false);
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (logGet === true) {
      dispatch(getRecipes());
    }
    
  }, [loggedIn]);

  console.log(recipes);
  
  useEffect(() => {
    if (loggedIn === true) {
      setLogGet(true);
      setLandingPage(
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/newrecipe' component={NewRecipeForm} />
          <Route exact path='/newrecipe/success' component={SubmitSuccess} />
          <Route exact path='/recipes' component={ViewRecipes} />
          <Route 
            exact path='/recipes/view/:recipeId' 
            component={SingleRecipe}
          />
          <Route 
            exact path='/recipes/edit/:recipeId' 
            component={EditRecipeForm}
          />
          <Route exact path ='/search' component={SearchResults} />
          <Route exact path ='/search/:query' component={SearchResults} />
        </Switch>
      
      </BrowserRouter>
      
      );
    }
  
  }, [loggedIn]);
  
  
  return (
    landingPage
  );
}

export default App;
