import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import HomeShopping from './shopping/HomeShopping.tsx';

// Solución segura con TypeScript
const rootElement = document.getElementById('root');

if (!rootElement) throw new Error("No se encontró el elemento con id 'root'");

const root = createRoot(rootElement);
root.render(
  <div className='m-0 p-0 min-h-screen min-w-screen' style={{backgroundColor: '#E6E6FC'}}>
    <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Ruta principal */}
        <Route path="/HomeShopping" element={<HomeShopping />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </div>
);