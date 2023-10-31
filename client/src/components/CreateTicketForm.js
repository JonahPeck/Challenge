import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


function CreateTicketForm (){
    
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('')


    const handlePostRequest = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/tickets',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: name,
                email: email,
                description: description,
                
                
                }),
            });
            if (response.ok) {
                console.log("Ticket Successfully created and posted to Admin.")
            } else{
                console.log("Ticket not successful")
            }
        } catch (error) {
            console.error('An error occured:', error);
        }

    };

    
    return (
        <>
            <p>Welcome to HelpDesk Ticket Manager</p>
            <div className={"formContainerStyle"}>
                <div>    
                    <input
                        type = "text"
                        placeholder='Name'
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                        className={"inputStyle"}
                    />
                    <input
                        type = "text"
                        placeholder='Email'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        className={"inputStyle"}
                    />
                    <input
                        type = "text"
                        placeholder='text area'
                        value = {description}
                        onChange = {(e) => setDescription(e.target.value)}
                        className={"descriptionBox"}
                    />
                </div>
            </div>
            <button 
            className = {"buttonStyle"}
            onClick={handlePostRequest}
            >Create New Ticket
            </button>
            <button 
            className = {"buttonStyle"}
            onClick={()=> navigate("/tickets")}
            >View All Tickets
            </button>
            </>
      );
}

export default CreateTicketForm;