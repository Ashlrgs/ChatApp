import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
