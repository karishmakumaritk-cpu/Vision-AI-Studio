import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const rootEl = document.getElementById('app');
if (rootEl) {
  createRoot(rootEl).render(<App />);
} else {
  console.error('Mount element #app not found');
}
