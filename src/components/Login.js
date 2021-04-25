import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import '../styles/main.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
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
  }
  
  return (
    <div className="login">
      <form className="loginForm">
        <h1 className="loginTitle">Login</h1>
        <input 
          type="text" 
          placeholder="Username" 
          className="loginInput"
          onChange={updateUserName}
        >
        </input>
        <input 
          type="password" 
          placeholder="Password" 
          className="loginInput"
          onChange={updatePassword}
        >
        </input>
        <button type="submit" onClick={submitLogin} className="loginButton">Login</button>
      </form>
    </div>
  );
}

export default Login;