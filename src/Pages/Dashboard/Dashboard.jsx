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




// //last working code 
// import React, { useState } from "react";
// import { Routes, Route, Outlet } from "react-router-dom";

// import DashNavbar from "../../Components/DashNavbar/DashNavbar";
// import Sidebar from "../../Components/Sidebar/Sidebar";
// import Table from "../../Components/Table/Table";
// import CreateGoogleAds from "../../Components/CreateGoogleAds/CreateGoogleAds";
// import GoogleSidebar from "../../Components/GoogleSidebar/GoogleSidebar";
// import BingSidebar from "../../Components/BingSidbar/BingSidebar";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <DashNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Sidebar */}
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <GoogleSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <BingSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: isSidebarOpen ? "300px" : "60px",
//           transition: "margin-left 0.3s ease",
//           padding: "20px",
//         }}
//       >
//         {/* Nested Routes */}
//         <Routes>
//           <Route path="/" element={<Table />} />
//           <Route path="/create-googleads" element={<CreateGoogleAds />} />
//         </Routes>

//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default Dashboard;


// // working code 
// import React, { useState } from "react";
// import { Routes, Route, Outlet } from "react-router-dom";

// import DashNavbar from "../../Components/DashNavbar/DashNavbar";
// import Sidebar from "../../Components/Sidebar/Sidebar";
// import Table from "../../Components/Table/Table";
// import CreateGoogleAds from "../../Components/CreateGoogleAds/CreateGoogleAds";
// import GoogleSidebar from "../../Components/GoogleSidebar/GoogleSidebar";
// import BingSidebar from "../../Components/BingSidbar/BingSidebar";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeSidebar, setActiveSidebar] = useState("default"); // Sidebar state

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleSidebarChange = (type) => {
//     console.log("Sidebar Change Triggered: ", type); // Debug log
//     setActiveSidebar(type); // Update sidebar type
//   };

//   const renderSidebar = () => {
//     console.log("Rendering Sidebar: ", activeSidebar); // Debug log
//     switch (activeSidebar) {
//       case "google":
//         return <GoogleSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
//       case "bing":
//         return <BingSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
//       default:
//         return <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
//     }
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <DashNavbar
//         isSidebarOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//         handleSidebarChange={handleSidebarChange}
//       />

//       {/* Render Sidebar */}
//       {renderSidebar()}

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: isSidebarOpen ? "300px" : "60px",
//           transition: "margin-left 0.3s ease",
//           padding: "20px",
//         }}
//       >
//         {/* Nested Routes */}
//         <Routes>
//           <Route path="/" element={<Table />} />
//           <Route path="/create-googleads" element={<CreateGoogleAds />} />
//         </Routes>

//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default Dashboard;



import React, { useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

import DashNavbar from "../../Components/DashNavbar/DashNavbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "../../Components/Table/Table";
import CreateGoogleAds from "../../Components/CreateGoogleAds/CreateGoogleAds";
import GoogleSidebar from "../../Components/GoogleSidebar/GoogleSidebar";
import BingSidebar from "../../Components/BingSidbar/BingSidebar";
import MetaSidebar from "../../Components/MetaSidebar/MetaSidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("default"); // Sidebar state
  const navigate = useNavigate(); // For navigation

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarChange = (type) => {
    setActiveSidebar(type); // Update the active sidebar type
    setIsSidebarOpen(true); // Ensure the sidebar opens when switching
    if (type === "default") {
      navigate("/"); // Navigate to the home route
    }
  };

  const renderSidebar = () => {
    switch (activeSidebar) {
      case "google":
        return <GoogleSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
      case "bing":
        return <BingSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
        case "facebook":
        return <MetaSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
      default:
        return <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
    }
  };

  return (
    <>
      {/* Navbar */}
      <DashNavbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleSidebarChange={handleSidebarChange}
      />

      {/* Render Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "300px" : "60px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
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


// import React, { useState } from "react";
// import { Routes, Route, Outlet } from "react-router-dom";

// import DashNavbar from "../../Components/DashNavbar/DashNavbar";
// import Sidebar from "../../Components/Sidebar/Sidebar";
// import Table from "../../Components/Table/Table";
// import ApplyGoogleAdsTable from "../../Components/ApplyGoogleAdsTable/ApplyGoogleAdsTable";
// import GmailShareLogTable from "../../Components/GmailShareLogTable/GmailShareLogTable";
// import AdsDepositeRecordTable from "../../Components/AdsDepositeRecordTable/AdsDepositerecordTable";
// import RefundTable from "../../Components/RefundTable/RefundTable";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeSidebar, setActiveSidebar] = useState("default"); // Sidebar state

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleSidebarChange = (type) => {
//     setActiveSidebar(type); // Update the active sidebar type
//     setIsSidebarOpen(true); // Ensure the sidebar opens when switching
//   };

//   const renderSidebar = () => {
//     switch (activeSidebar) {
//       case "google":
//         return <GoogleSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
//       case "bing":
//         return <BingSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
//       case "facebook":
//         return <MetaSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
//       default:
//         return <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
//     }
//   };

//   return (
//     <>
//       <DashNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//       <div style={{ marginLeft: isSidebarOpen ? "300px" : "60px", transition: "margin-left 0.3s ease" }}>
//         <h1>Welcome to the Dashboard</h1>
//         {/* <Table /> */}
//         {/* <ApplyGoogleAdsTable /> */}
//         {/* <GmailShareLogTable /> */}
//         {/* <AdsDepositeRecordTable /> */}
//         <RefundTable />
//       </div>
//     </>
//   );
// };

// export default Dashboard;
