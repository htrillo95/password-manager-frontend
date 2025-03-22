import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // ✅ Import AppProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider> {/* ✅ Wrap App in Global Context */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();