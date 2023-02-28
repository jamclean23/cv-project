// Entry for React

//  ====== IMPORTS =======

import './styles.css';
import React from 'react';
import ReactDom from 'react-dom/client';
import { App } from './App.js';

// ====== ROOT CREATION ======

const root = ReactDom.createRoot(document.querySelector('#root'));

// ====== RENDER ======

root.render(<App />);