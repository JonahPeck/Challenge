import React from 'react';
import {useState, useEffect} from 'react'
import {BrowserRouter, useNavigate, Route, Routes} from 'react-router-dom';
import Single_Ticket from './Ticket';
import { Button, Modal } from 'react-bootstrap';





function AllTickets() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [expandedTicket, setExpandedTicket] = useState(null);
  
    const handleGetTickets = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/tickets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const allTickets = await response.json();
          setTickets(allTickets);
        } else {
          console.log('Error fetching all tickets');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    const expandTicket = (ticket) => {
      if (expandedTicket === ticket) {
        setExpandedTicket(null);
      } else {
        setExpandedTicket(ticket);
      }
    };
  
    const handleStatusChange = (ticket, newStatus) => {
      // You can implement an API call here to update the ticket's status on the server
      // After that, you can update the status in the local state if needed
      console.log(`Status of ${ticket.name} changed to ${newStatus}`);
    };
  
    useEffect(() => {
      handleGetTickets();
    }, []);
  
    return (
      <>
        <div>
          <h2>All Tickets</h2>
          <button className={"buttonStyle"} onClick={() => navigate("/")}>
            Create A New Ticket
          </button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((ticket_user) => (
                  <tr key={ticket_user.name}>
                    <td
                      onClick={() => expandTicket(ticket_user)}
                      style={{ cursor: 'pointer' }}
                    >
                      {ticket_user.name}
                    </td>
                    <td>
                      {expandedTicket === ticket_user ? (
                        <select
                          value={ticket_user.status}
                          onChange={(e) => handleStatusChange(ticket_user, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      ) : (
                        ticket_user.status
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {expandedTicket && (
            <div>
              <h3>Expanded Ticket Information</h3>
              <p>Name: {expandedTicket.name}</p>
              <p>
                Status: {expandedTicket.status}
              </p>
              {/* Add more items as needed */}
            </div>
          )}
        </div>
      </>
    );
  }
  
  export default AllTickets;