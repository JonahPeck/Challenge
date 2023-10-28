import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState, useEffect} from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to HelpDesk Ticket Management
        </p>
        <input
          type = "text"
          placeholder='Name'
        />
        <input
          type = "text"
          placeholder='Email'
        />
        <input
          type = "text"
          placeholder='Description'

        />
        <button>Submit</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
