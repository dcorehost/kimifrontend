import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { assets } from "../../assets/assets.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = ({ isSidebarOpen }) => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const toggleWalletMenu = () => setIsWalletOpen((prev) => !prev);

  return (
    <div>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <img src={assets.logo} alt="AdMedia Agency Logo" className={styles.kimilogo} />
        </div>

        {/* Sidebar Menu */}
        <ul className={`${styles.sidebarLinks} ${isSidebarOpen ? styles.showText : ""}`}>
          {/* Dashboard */}
          <li>
            <Link to="/dashboard" className={styles.link}>
              <i className="fas fa-tachometer-alt"></i> {isSidebarOpen && "Dashboard"}
            </Link>
          </li>

          {/* Wallet */}
          <li>
            <button
              onClick={toggleWalletMenu}
              className={`${styles.link} ${styles.walletToggle}`}
            >
              <i className="fas fa-wallet"></i> {isSidebarOpen && "Wallet"}
              <i
                className={`fas ${isWalletOpen ? "fa-chevron-up" : "fa-chevron-down"} ${
                  styles.chevron
                }`}
              ></i>
            </button>
            {isWalletOpen && (
              <ul className={styles.subMenu}>
                <li>
                  <Link to="/kimi/wallet/addmoney-table" className={styles.link}>
                    <i className="fas fa-plus-circle"></i> Add Money
                  </Link>
                </li>
                <li>
                  <Link to="/kimi/wallet/paylink" className={styles.link}>
                    <i className="fas fa-paper-plane"></i> Pay
                  </Link>
                </li>
                
              </ul>
            )}
          </li>

          {/* 2FA Tool */}
          <li>
            <Link to="/kimi/2fatool" className={styles.link}>
              <i className="fas fa-shield-alt"></i> {isSidebarOpen && "2FA Tool"}
            </Link>
          </li>

          {/* Additional sidebar items can go here */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
