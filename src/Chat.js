import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';

// Firebase configuration
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID"
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      if (messageData) {
        const messageList = Object.keys(messageData).map((key) => ({
          ...messageData[key],
          id: key,
        }));
        setMessages(messageList);
      }
    });
  }, []);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const messageRef = ref(database, 'messages');
    const message = {
      content: newMessage,
      timestamp: Date.now(),
    };
    push(messageRef, message);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
