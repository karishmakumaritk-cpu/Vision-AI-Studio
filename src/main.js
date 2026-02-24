import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const rootEl = document.getElementById('app');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
} else {
  console.error('Mount element #app not found');
}
