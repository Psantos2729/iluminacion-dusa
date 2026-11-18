import React from 'react';
import { createRoot } from 'react-dom/client';
/* Elige el tema cambiando UNA línea: neutro | barberia | spa | tech | optica | calido (o crea el tuyo en src/temas/) */
import './temas/dusa.css';
import './estilos.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
