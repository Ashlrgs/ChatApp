import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5BpZDdZ8yv8hVU2JtMSF71uIznJuFrzU",
  authDomain: "chatappp-c15e6.firebaseapp.com",
  databaseURL: "https://chatappp-c15e6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatappp-c15e6",
  storageBucket: "chatappp-c15e6.appspot.com",
  messagingSenderId: "821468280586",
  appId: "1:821468280586:web:5868f6493280f6b1e9acf3",
  measurementId: "G-MN3ZHGSQKF"
};

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
