import React from 'react';
import {useState, useEffect} from 'react'


function AllTickets (){
    const[tickets, setTickets] = useState([]);
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
    useEffect(() => {
        handleGetTickets()
    },[])
    
    return (
        <> 
            <div>
                <h2>All Tickets</h2>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
                {tickets && tickets.map((ticket_user) => (
                        <tr>
                            {/* <p key={ticket_user.id}> */}
                    {/* Display ticket information */}
                                <td>{ticket_user.name}</td>
                                {/* names of tickets as hyperlink to the full ticket */}
                                <td>{ticket_user.status}</td>
                            {/* </p> */}
                        </tr>
                    ))}
            </div>
        </>
    )
}

export default AllTickets;