import React, { useEffect, useState, useRef } from 'react';


function TicketList() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
    fetch('http://127.0.0.1:5555/tickets')
        .then((response) => response.json())
        .then((data) => setTickets(data))
        .catch((error) => console.error('Error fetching tickets:', error));
    }, []);

return (
    <div>
        <h2>All Tickets</h2>
    <ul>
        {tickets.map((ticket) => (
        <li key={ticket.id}>
            {/* Display ticket information */}
            <p>Name: {ticket.name}</p>
            <p>Email: {ticket.email}</p>
            <p>Description: {ticket.description}</p>
            <p>Status: {ticket.status}</p>
        </li>
        ))}
        </ul>
    </div>
    );
}

export default TicketList;
