import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GuestProvider } from './context/GuestProvider.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GuestProvider>
      <App />
    </GuestProvider>  
  </React.StrictMode>,
)
