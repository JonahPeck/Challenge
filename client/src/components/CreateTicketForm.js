import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTicketForm() {
  let navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [description, setDescription] = useState('');

  const handlePostRequest = async () => {
    try {
      const response = await fetch('https://flask-jonah-174425889a32.herokuapp.com/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          created_by: createdBy,
          description: description,
        }),
      });
      if (response.ok) {
        console.log("Ticket Successfully created and posted to Admin.");
      } else {
        console.log("Ticket not successful");
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div style={styles.container}>
      <p style={styles.heading}>Welcome to HelpDesk Ticket Manager</p>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.inputStyle}
        />
        <input
          type="text"
          placeholder='Email'
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          style={styles.inputStyle}
        />
        <input
          type="text"
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.descriptionBox}
        />
      </div>
      <button
        style={styles.buttonStyle}
        onClick={handlePostRequest}
      >
        Create New Ticket
      </button>
      <button
        style={styles.buttonStyle}
        onClick={() => navigate("/tickets")}
      >
        View All Tickets
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputStyle: {
    width: '300px',
    height: '30px',
    margin: '10px 0',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  descriptionBox: {
    width: '300px',
    height: '100px',
    margin: '10px 0',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  buttonStyle: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    margin: '10px',
    cursor: 'pointer',
  },
};

export default CreateTicketForm;
