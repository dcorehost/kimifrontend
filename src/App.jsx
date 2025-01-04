
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';




const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
         {/* <Route path='/performance-management'  element={<PerformanceManagement />}></Route> */}
      </Routes>
     
    </Router>
  );
};

export default App;