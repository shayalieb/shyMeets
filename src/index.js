import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
//import * as serviceWorker from './service-worker';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

import * as atatus from 'atatus-spa';

atatus.config('caa90900586d4e5ca063f9e81df7c4f9').install();

const meetApp = document.getElementById('root');
const root = createRoot(meetApp)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

//if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator)
serviceWorkerRegistration.register();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
