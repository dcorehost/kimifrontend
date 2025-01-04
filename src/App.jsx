
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Specialize from './Components/Specialize/Specialize';
import Footer from './Components/Footer/Footer';




const App = () => {
  return (
    <Router>
      <Navbar />
      <Specialize />
      <Footer />
      
      <Routes>
         {/* <Route path='/performance-management'  element={<PerformanceManagement />}></Route> */}
      </Routes>
     
    </Router>
  );
};

export default App;