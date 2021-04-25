import React, { useState } from 'react';
import Login from './Login';
import Home from './Home';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [landingPage, setLandingPage] = useState(<Login />);

  if (userLoggedIn === true) {
    setLandingPage(<Home />);
  }

  return (
    landingPage
  );
}

export default App;
