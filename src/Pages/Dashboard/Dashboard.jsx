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



import React, { useState } from "react";
import DashNavbar from "../../Components/DashNavbar/DashNavbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Table from "../../Components/Table/Table";
import ApplyGoogleAdsTable from "../../Components/ApplyGoogleAdsTable/ApplyGoogleAdsTable";
import GmailShareLogTable from "../../Components/GmailShareLogTable/GmailShareLogTable";
import AdsDepositeRecordTable from "../../Components/AdsDepositeRecordTable/AdsDepositerecordTable";
import RefundTable from "../../Components/RefundTable/RefundTable";
import UserProfile from "../../Components/UserFile/UserProfile";



const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <DashNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
          
      <div style={{ marginLeft: isSidebarOpen ? "300px" : "60px", transition: "margin-left 0.3s ease" }}>
        <h1>Welcome to the Dashboard</h1>
        {/* <Table /> */}
        {/* <ApplyGoogleAdsTable /> */}
        {/* <GmailShareLogTable /> */}
        {/* <AdsDepositeRecordTable /> */}
        {/* <RefundTable /> */}
         <UserProfile/>
      </div>
    </>
  );
};

export default Dashboard;
