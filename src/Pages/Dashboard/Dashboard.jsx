// import DashNavbar from "../../Components/DashNavbar/DashNavbar";
// import Sidebar from "../../Components/Sidebar/Sidebar";



// const Dashboard = () => {
//   return (
//     <>
//    <DashNavbar />
//    <Sidebar />
   
     
//     </>
//   );
// };

// export default Dashboard;


// import Sidebar from "../../Components/Sidebar/Sidebar";

// const Dashboard = () => {
//   return (
//     <>
//       <Sidebar />
//     </>
//   );
// };

// export default Dashboard;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import DashNavbar from "../../Components/DashNavbar/DashNavbar";
// import Sidebar from "../../Components/Sidebar/Sidebar";
// import Table from "../../Components/Table/Table";
// import CreateGoogleAds from "../../Components/CreateGoogleAds/CreateGoogleAds";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       <DashNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <div style={{ marginLeft: isSidebarOpen ? "300px" : "60px", transition: "margin-left 0.3s ease" }}>
//         <h1>Welcome to the Dashboard</h1>
//         {/* <Table /> */}
//         {/* <CreateGoogleAds /> */}
      
//       </div>
//        {/* Dynamic Page Rendering */}



//        <Routes>
        
//           <Route path="/" element={<Table />} />
//           <Route path="/create-googleads" element={<CreateGoogleAds />} />
//         </Routes>



//     </>
//   );
// };

// export default Dashboard;



import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import DashNavbar from "../../Components/DashNavbar/DashNavbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "../../Components/Table/Table";
import CreateGoogleAds from "../../Components/CreateGoogleAds/CreateGoogleAds";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <DashNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "300px" : "60px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        {/* Nested Routes */}
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/create-googleads" element={<CreateGoogleAds />} />
        </Routes>

        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
