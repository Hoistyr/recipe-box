import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {logIn, logOut} from '../actions';
import '../styles/login.css';
import '../styles/main.css';
import logo from '../images/logo.svg';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({
    loginUsernameErrorText: '',
    loginPasswordErrorText:'',
  });
  
  const updateUserName = (event) => {
    setUsername(event.target.value);
    console.log(username);
  }
  
  const updatePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  }
  
  const submitLogin = (e) => {
    e.preventDefault();
    console.log(username, password);
    setLoginErrors({
    loginUsernameErrorText: <p className="loginErrorText">Username is incorrect</p>,
    loginPasswordErrorText: <p className="loginErrorText">Password is incorrect</p>,
    });

    dispatch(logIn());
  }
  
  return (
    <div className="login">
      <div className="logoName">
        <img className="loginLogo" src={logo}></img>
        <h1 className="siteTitle">Recipe Box</h1>
      </div>
      
      <form className="loginForm">
        <h1 className="loginTitle">Login</h1>
        <input 
          type="text" 
          placeholder="Username" 
          className="loginInput"
          onChange={updateUserName}
        >
        </input>
        {loginErrors.loginUsernameErrorText}
        <input 
          type="password" 
          placeholder="Password" 
          className="loginInput"
          onChange={updatePassword}
        >
        </input>
        {loginErrors.loginPasswordErrorText}
        <button type="submit" onClick={submitLogin} className="loginButton">Login</button>
      </form>
    </div>
  );
}

export default Login;