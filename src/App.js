import './App.css';

//Standard Imports & Dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Imports of components for initial user interaction
import Login from './components/Login/Login';
import Register from './components/Register/Register';


//Imports for MAIN MENU Components
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Routes for initial user interaction */}
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />

          {/* Routes for MAIN MENU components */}
          <Route path='/Dashboard' element={<Dashboard />} />

          {/* Index Routing */}
          <Route index element={<Login />} />

        </Routes>
      </Router>

    </>
  );
}

export default App;
