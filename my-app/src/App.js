import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState, useEffect} from "react";

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('')

  const handlePostRequest = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5555/tickets',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            name: name,
            email: email,
            description: description
            
            }),
        });
        if (response.ok) {
            console.log("Ticket successfully added")
        } else{
            console.log("Ticket not successful")
        }
    } catch (error) {
        console.error('An error occured:', error);
    }
};
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
          value = {name}
          onChange = {(e) => setName(e.target.value)}
        />
        <input
          type = "text"
          placeholder='Email'
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
        />
        <input
          type = "text"
          placeholder='Description'
          value = {description}
          onChange = {(e) => setDescription(e.target.value)}

        />
        <button onClick={handlePostRequest}>Submit</button>
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
