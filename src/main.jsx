import App from './App.jsx'
import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import './index.css'
import firebase from 'firebase/compat/app';

// Initialize Firebase
const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN  ,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});

import.meta.env.VITE_MEASUREMENT_ID

export const AuthContext = createContext();
const auth = getAuth(app);
const firestore = getFirestore(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext.Provider value={{
        firestore, 
        auth,
        firebase
      }}>
        <App />
    </AuthContext.Provider>
  </StrictMode>
)
