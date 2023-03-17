import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root._internalRoot.containerInfo.classList.add('page__content');

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
