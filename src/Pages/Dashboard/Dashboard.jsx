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
        <Table />
      </div>
    </>
  );
};

export default Dashboard;
