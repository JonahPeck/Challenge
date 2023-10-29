import React, {useState} from 'react';

function MyComponent(){

    const handlePostRequest = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5555/tickets',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data}),
            });
            if (response.ok) {
                print("Ticket successfully added")
            } else{
                print("Ticket not successful")
            }
        } catch (error) {
            console.error('An error occured:', error);
        }
    };
   
}