



// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import Specialize from './Components/Specialize/Specialize';
// import Footer from './Components/Footer/Footer';
// import StatsAndFAQ from './Components/StatsAndFAQ/StatsAndFAQ';
// import ReadyToStart from './Components/ReadyToStart/ReadyToStart';
// import LogoCarousel from './Components/LogoCarousel/LogoCarousel';
// import WhatIsKimi from './Components/WhatIsKimi/WhatIsKimi';
// import WelcomePage from './Components/WelcomePage/WelcomePage';
// import Homepage from './Pages/Homepage/Homepage';
// import MetaAds from './Pages/MetaAds/MetaAds';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <WelcomePage></WelcomePage>
//       <LogoCarousel />
//       <WhatIsKimi />
//       <Specialize />
//       <StatsAndFAQ />
//       <ReadyToStart />
//       <Footer />
      
//       <Routes>
//          {/* <Route path='/ '  element={<Homepage />}></Route>
//          <Route path='/meta-ads'  element={<MetaAds />}></Route> */}
//       </Routes>
     
//     </Router>
//   );
// };

// export default App;





import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import MetaAds from "./Pages/MetaAds/MetaAds";
import BingAds from "./Pages/BingAds/BingAds";
import GoogleAds from "./Pages/GoogleAds/GoogleAds";
import ContactUs from "./Pages/ContactUs/ContactUs";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/meta-ads" element={<MetaAds />} />
        <Route path="/bing-ads" element={<BingAds />} />
        <Route path="/google-ads" element={<GoogleAds />} />
       
      </Routes>
    </Router>
  );
};

export default App;
