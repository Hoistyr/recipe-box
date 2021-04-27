import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './Login';
import Header from './Header';
import Home from './Home';

const App = () => {
  const userLoggedIn = useSelector(state => state.isLogged);
  const [landingPage, setLandingPage] = useState(<Login />);

  useEffect(() => {
    if (userLoggedIn === true) {
      console.log('logged is true');
      setLandingPage(
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      
      </BrowserRouter>
      
      );
    }
  
  }, [userLoggedIn]);
  
  
  return (
    landingPage
  );
}

export default App;
