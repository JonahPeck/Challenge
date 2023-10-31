// route for each ticket to be clicked into. Can adjust status and respond to full description
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';


function Single_Ticket () {
    let navigate = useNavigate();
    const[tickets, setTickets] = useState([]);
    const[id, setId] = useState('')
    const GetSingleTicket = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/tickets/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const singleTicket = await response.json();
                setTickets(singleTicket); 
            } else {
                console.log('Error fetching ticket');
            }
            } catch (error) {
                console.error('An error occurred:', error);
        }
        useEffect(() => {
            GetSingleTicket()
        },[])
    };
    return (
        <div>
            
                <div>
            <p>{tickets.name}</p>
            <p>{tickets.description}</p>
            <p>{tickets.status}</p>
            </div>

        </div>
    )
}
export default Single_Ticket;