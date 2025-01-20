

import React, { useState } from "react";
import styles from "./MetaSidebar.module.css";
import { assets } from "../../assets/assets.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

const MetaSidebar = ({ isSidebarOpen, toggleSidebar }) => {
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
          <img src={assets.facebook} alt="facebook logo" className={styles.facebooklogo} />
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
                  <a href="/meta-accountlist" className={styles.link}>
                    Account List
                  </a>
                </li>
                <li>
                  <a href="#apply-new-ad-account" className={styles.link}>
                    Apply New Ad Account
                  </a>
                </li>
                <li>
                  <a href="#BM-share-log" className={styles.link}>
                    BM Share Log
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
                  <a href="#ads-deposit" className={styles.link}>
                    Ads Deposit
                  </a>
                </li>
                <li>
                  <a href="#ad-deposit-record" className={styles.link}>
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
                  <a href="#refund" className={styles.link}>
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

export default MetaSidebar;
