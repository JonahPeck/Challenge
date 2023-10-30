import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TicketList from './TicketList';
import CreateTicketForm from './components/CreateTicketForm';
import AllTickets from './components/AllTickets';




function App() {

return (
  <>
    <div className="App">
    <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateTicketForm/>}/> 
          <Route path ="/tickets" element={<AllTickets/>}/>          
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  </>
)
}

export default App;
