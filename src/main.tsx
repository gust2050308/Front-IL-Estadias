import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

// Solución segura con TypeScript
const rootElement = document.getElementById('root');

if (!rootElement) throw new Error("No se encontró el elemento con id 'root'");

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);