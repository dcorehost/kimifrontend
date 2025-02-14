

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { AiTwotoneDollar } from "react-icons/ai";
import Auth from "../../Components/Services/Auth";
import axios from "axios";

const Dashboard = () => {
  const [userName, setUserName] = useState("Guest");
  const [walletAmount, setWalletAmount] = useState(0);
  const token = Auth.getToken();

  useEffect(() => {
    const authData = Auth.getAuthData();
    if (authData) {
      setUserName(authData.username || "Guest");
      // setWalletAmount(authData.wallet || 0);
    } else {
      console.error("Auth data not found or incomplete.");
    }
  }, []);

  useEffect(() => {
    async function fetchWalletAmount() {
      try {
        const walletRequest = await axios.get(
          "https://admediaagency.online/kimi/get-wallet-of-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = walletRequest;
        setWalletAmount(data?.users?.wallet)
      } catch (error) {
        console.log(error)
      }
    }
    fetchWalletAmount()
  }, [])

  return (
    <>
      <div className={styles.dashboardContainer}>
        <h1>Welcome, {userName}! Have a Nice Day</h1>
        <p>Your dashboard gives you quick access to your account information.</p>
        
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2>Wallet Balance</h2>
            <p> ${walletAmount?.toFixed(2) || 0}</p>
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
