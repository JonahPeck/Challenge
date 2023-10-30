import React, { useEffect, useState} from 'react';



function TicketList() {
    const [ticket, setTicket] = useState([]);

    useEffect(() => {
    fetch('http://127.0.0.1:5555/tickets')
        .then((response) => response.json())
        .then((data) => setTicket(data))
        .catch((error) => console.error('Error fetching tickets:', error));
    }, []);

    // const openTicket = async () => {
    //     try {
    //     const response = await fetch('http://127.0.0.1:5555/tickets', {
    //         method: 'GET',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //     });

return (
    <div>
        <h2>All Tickets</h2>
    <ul>
        {ticket.map((ticket_user) => (
        <li key={ticket_user.id}>
            {/* Display ticket information */}
            <p>Name: {ticket_user.name}</p>
            <p>Email: {ticket_user.email}</p>
            <p>Description: {ticket_user.description}</p>
            <p>Status: {ticket_user.status}</p>
        </li>
        ))}
        </ul>
    </div>
    );
}

export default TicketList;
