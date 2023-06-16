import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch messages
    axios.get('/api/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error(error));
  });

  const sendMessage = () => {
    if (!newMessage) {
      return;
    }

    // Send message logic
    axios.post('/api/messages', { content: newMessage })
      .then(response => {
        // Handle successful message sending (e.g., show a success message)
        console.log('Message sent successfully');
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch(error => {
        // Handle error (e.g., display an error message)
        console.error('Failed to send message:', error);
      });
  };

  
  return (
    <div>
      <h2>Messages</h2>

      <div>
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
   </div>
  );
};

export default Messages;
