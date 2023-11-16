import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import './index.css';

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

if (!navigator.geolocation) {
  alert('Tu navegador no tiene acceso a la Geolocalización');
  throw new Error('Tu navegador no tiene acceso a la Geolocalización');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
