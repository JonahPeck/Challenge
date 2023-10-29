import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState, useEffect, useRef} from "react";
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import TicketDetail from './components/AllTickets';
import TicketList from './TicketList';



function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('')
  const[ticket, setTicket] = useState(null);

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
const formContainerStyle = {
  border: '2px solid #007BFF',
  padding: '20px',
  margin: '20px',
  borderRadius: '10px',
};

const inputStyle = {
  width: '75%',
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  margin: '0',
  verticalAlign: 'top'
};
const buttonStyle = {
  backgroundColor: '#007BFF',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
const descriptionBox = {
  width: '75%',
  height: '100px',
  padding: '25px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  margin: '0',
  verticalAlign: 'top'
}


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to HelpDesk Ticket Management</p>
          <div style={formContainerStyle}>
        <input
          type = "text"
          placeholder='Name'
          value = {name}
          onChange = {(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type = "text"
          placeholder='Email'
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type = "text"
          placeholder='Description'
          value = {description}
          onChange = {(e) => setDescription(e.target.value)}
          style={descriptionBox}

        />
        </div>
        <button 
        style = {buttonStyle}
        onClick={handlePostRequest}>Submit
        </button>
        <button        style = {buttonStyle}
>
        See Tickets
        </button>
      </header>
    </div>
  );
}

export default App;
