import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import './styles/components.css';

// Ponto de entrada da aplicação: monta o componente raiz <App />
// dentro do elemento <div id="root"> definido em index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);