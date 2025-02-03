

// //latest new last updated code 
// import React, { useState } from "react";
// import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

// import DashNavbar from "../../Components/DashNavbar/DashNavbar";
// import Sidebar from "../../Components/Sidebar/Sidebar";
// import Table from "../../Components/Table/Table";
// import CreateGoogleAds from "../../Components/CreateGoogleAds/CreateGoogleAds";
// import GoogleSidebar from "../../Components/GoogleSidebar/GoogleSidebar";
// import BingSidebar from "../../Components/BingSidbar/BingSidebar";
// import MetaSidebar from "../../Components/MetaSidebar/MetaSidebar";

// const Dashboard = () => {
  

//   return (
//     <>
//     Dashboard
//     </>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { AiTwotoneDollar } from "react-icons/ai";
import Auth from "../../Components/Services/Auth";

const Dashboard = () => {
  const [userName, setUserName] = useState("Guest");
  const [walletAmount, setWalletAmount] = useState(0);

  useEffect(() => {
    const authData = Auth.getAuthData();
    if (authData) {
      setUserName(authData.username || "Guest");
      setWalletAmount(authData.wallet || 0);
    } else {
      console.error("Auth data not found or incomplete.");
    }
  }, []);

  return (
    <>
      <div className={styles.dashboardContainer}>
        <h1>Welcome, {userName}! Have a Nice Day</h1>
        <p>Your dashboard gives you quick access to your account information.</p>
        
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2>Wallet Balance</h2>
            <p> ${walletAmount.toFixed(2)}</p>
          </div>

          <div className={styles.card}>
            <h2>Add Money</h2>
            <Link to="/kimi/wallet/addmoney-table" className={styles.link}>Add Funds</Link>
          </div>

          <div className={styles.card}>
            <h2>Update Ad Account</h2>
            <Link to="/facebook/accountManage/accountlist" className={styles.link}>Manage Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
