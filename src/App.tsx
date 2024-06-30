import "./App.css";

//Standard Imports & Dependencies
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

//Imports of components for initial user interaction
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

//Imports for MAIN MENU Components
import Dashboard from "./components/Dashboard/Dashboard.tsx";

import React from "react";
import SingleDevicePage from "./components/Device/SingleDevicePage.tsx";
import ListPage from "./components/ListPage/ListPage.tsx";

import NotFoundPage from "./components/404/NotFoundPage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {
    function ProtectedRoute ({ isAuth, target }) {
        const token = sessionStorage.getItem('token');
      
        if (isAuth) {
          return token ? <Outlet /> : <Navigate to={target} replace />;
        }
        return token ? <Navigate to={target} replace /> : <Outlet />;
      }

    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    {/* Routes for initial user interaction */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Routes for MAIN MENU components */}

                    <Route element={<ProtectedRoute isAuth target="/login" />}>
                        {/* Dynamic route for Dashboad */}

                        <Route path='/dashboard' element={<Dashboard />} />
                    
                        {/* Dynamic route for SingleDevicePage */}
                        <Route path="/device/:deviceId" element={<SingleDevicePage />} />

                        <Route path="/list/:type" element={<ListPage />} />
                    </Route>

                    {/* Index Routing */}
                    <Route index element={<Login />} />

                    {/* Detection of 404 */}
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
