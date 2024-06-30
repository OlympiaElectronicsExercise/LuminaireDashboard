import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { DeviceContext, DeviceProvider } from './context/device-context.tsx';
import { AuthProvider } from './context/auth-context.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
        <DeviceProvider>
            <App />
        </DeviceProvider>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
