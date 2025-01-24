

import React, { useState } from "react";
import styles from "./GoogleSidebar.module.css";
import { assets } from "../../assets/assets.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

const GoogleSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <img src={assets.google} alt="google logo" className={styles.googlelogo} />
        </div>
        {/* Sidebar Menu */}
        <ul className={`${styles.sidebarLinks} ${isSidebarOpen ? styles.showText : ""}`}>
          {/* Account Manage */}
          <li>
            <button
              onClick={() => toggleMenu("accountManage")}
              className={`${styles.link} ${styles.walletToggle}`}
            >
              <i className="fas fa-user-circle"></i> {isSidebarOpen && "Account Manage"}
              <i
                className={`fas ${openMenus.accountManage ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}
              ></i>
            </button>
            {openMenus.accountManage && (
              <ul className={styles.subMenu}>
                <li>
                  <a href="/google-table" className={styles.link}>
                    Account List
                  </a>
                </li>
                <li>
                  <a href="/applygoogle-ads" className={styles.link}>
                    Apply GG Ad
                  </a>
                </li>
                <li>
                  <a href="/gmailshare-log" className={styles.link}>
                    Gmail Share Log
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Finance */}
          <li>
            <button
              onClick={() => toggleMenu("finance")}
              className={`${styles.link} ${styles.walletToggle}`}
            >
              <i className="fas fa-dollar-sign"></i> {isSidebarOpen && "Finance"}
              <i
                className={`fas ${openMenus.finance ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}
              ></i>
            </button>
            {openMenus.finance && (
              <ul className={styles.subMenu}>
                <li>
                  <a href="/googleads-deposite" className={styles.link}>
                    Ads Deposit
                  </a>
                </li>
                <li>
                  <a href="/googleads-depositerecord" className={styles.link}>
                    Ad Deposit Record
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* AfterSale */}
          <li>
            <button
              onClick={() => toggleMenu("afterSale")}
              className={`${styles.link} ${styles.walletToggle}`}
            >
              <i className="fas fa-undo"></i> {isSidebarOpen && "AfterSale"}
              <i
                className={`fas ${openMenus.afterSale ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}
              ></i>
            </button>
            {openMenus.afterSale && (
              <ul className={styles.subMenu}>
                <li>
                  <a href="/refund-table" className={styles.link}>
                    Refund
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GoogleSidebar;
