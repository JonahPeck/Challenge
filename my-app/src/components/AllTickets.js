import React from 'react';

function TicketDetail ({ticket}){
    return (
        <div>
            <h2>Ticket Details</h2>
            <p>Name: {ticket.name}</p>
            <p>Email: {ticket.email}</p>
            <p>Description: {ticket.description}</p>
            <p>Status: {ticket.status}</p>
        </div>
    );
}


export default TicketDetail;