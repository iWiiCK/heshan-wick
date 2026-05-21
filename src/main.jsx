import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './data/theme.json';
import './styles/global.css';

const root = document.documentElement;
Object.entries(theme.colors).forEach(([key, value]) => {
  const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  root.style.setProperty(`--color-${cssKey}`, value);
});
Object.entries(theme.fonts).forEach(([key, value]) => {
  root.style.setProperty(`--font-${key}`, value);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
