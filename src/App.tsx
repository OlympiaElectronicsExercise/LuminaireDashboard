import './App.css';

//Standard Imports & Dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Imports of components for initial user interaction
import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';

//Imports for MAIN MENU Components
import Dashboard from './components/Dashboard/Dashboard.tsx';

import React from 'react';
import SingleDevicePage from './components/Device/SingleDevicePage.tsx';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {/* Routes for initial user interaction */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />

                    {/* Routes for MAIN MENU components */}
                    <Route path='/dashboard' element={<Dashboard />} />

                    {/* Dynamic route for SingleDevicePage */}
                    <Route path='/device/:deviceId' element={<SingleDevicePage />} />

                    <Route path='/list/:type' element={<Dashboard />} />
                    {/* Index Routing */}
                    <Route index element={<Login />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
