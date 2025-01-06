



import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Specialize from './Components/Specialize/Specialize';
import Footer from './Components/Footer/Footer';
import StatsAndFAQ from './Components/StatsAndFAQ/StatsAndFAQ';
import ReadyToStart from './Components/ReadyToStart/ReadyToStart';
import LogoCarousel from './Components/LogoCarousel/LogoCarousel';
import WhatIsKimi from './Components/WhatIsKimi/WhatIsKimi';
import WelcomePage from './Components/WelcomePage/WelcomePage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <WelcomePage></WelcomePage>
      <LogoCarousel />
      <Specialize />
      <StatsAndFAQ />
      <ReadyToStart />
      {/* <WhatIsKimi /> */}
      <Footer />
      
      <Routes>
         {/* <Route path='/performance-management'  element={<PerformanceManagement />}></Route> */}
      </Routes>
     
    </Router>
  );
};

export default App;






// import { Routes, Route } from 'react-router-dom';
// import Homepage from './Pages/Homepage/Homepage';

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Homepage />} />
//     </Routes>
//   );
// };

// export default App;
