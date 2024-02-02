import './App.css';
import Navbar from './components/navbar';
import Login from './components/login';
import Homepage from './components/homepage';
import AddData from './components/addData';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import AddCity from './components/addCities';
import AddCountry from './components/addCountry';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {localStorage.getItem('token') ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/add_data" element={<AddData />} />
            <Route path="/addcountry" element={<AddCountry />} />
            <Route path="/addcities" element={<AddCity />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
}

export default App;
