import React from 'react';
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

function AllTickets() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [expandedTicket, setExpandedTicket] = useState(null);
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState('')
  
    const handleGetTickets = async () => {
        try {
            const response = await fetch('https://flask-jonah-174425889a32.herokuapp.com/tickets', {
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
    
    useEffect(() => {
        handleGetTickets();
    }, []);

    const handleStatusChange = async (id, response, status) => {
        try {
            const answer = await fetch(`https://flask-jonah-174425889a32.herokuapp.com/tickets/${id}`,{
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  response: expandedTicket.response,
                  status: expandedTicket.status,
                }),
            });

            if (answer.ok) {
                const responseData = await answer.json();
                console.log("Ticket successfully updated.");
                console.log("Response: ", responseData);
            } else{
                console.log("Ticket update not successful");
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
  
  
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
                            <tr key={ticket_user.title}>
                                <td
                                  onClick={() => expandTicket(ticket_user)}
                                  style={{ cursor: 'pointer' }}
                                >
                                    {ticket_user.title}
                                </td>
                                <td>{ticket_user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {expandedTicket && (
                    <div>
                        <h3>{expandedTicket.title}'s Ticket</h3>
                        <h5>
                            Status:
                            <select
                                value = {status}
                                onChange = {(e) => setStatus(e.target.value)}
                                className = {"select"}
                            >
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </h5>
                        <h5>Issue Needing Resolve: {expandedTicket.description}</h5>
                        <input
                            type = "text"
                            onChange = {(e) => setResponse(e.target.value)}
                            placeholder='Resolution'
                            className = {"inputStyle"}
                            value = {response}
                        >{expandTicket.response}</input>
                        <button
                            onClick = {() => handleStatusChange(expandedTicket.id)}
                            className = {"buttonStyle"}
                        >Save Changes
                        </button>
                    </div>
                )}
            </div>
        </>
    );
  }
  
  export default AllTickets;