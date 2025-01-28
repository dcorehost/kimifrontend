import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BingSidebar.module.css";
import { assets } from "../../assets/assets.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

const BingSidebar = ({ isSidebarOpen, toggleSidebar }) => {
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
          <img src={assets.bing} alt="bing logo" className={styles.binglogo} />
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
                  <Link to="/bing/accountManage/accountList" className={styles.link}>
                    Account List
                  </Link>
                </li>
                <li>
                  <Link to="/bing/accountManage/applyAd" className={styles.link}>
                    Apply Bing Ad
                  </Link>
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
                  <Link to="/bing/financing/adDeposit" className={styles.link}>
                    Ads Deposit
                  </Link>
                </li>
                <li>
                  <Link to="/bing/financing/adDepositRecord" className={styles.link}>
                    Ad Deposit Record
                  </Link>
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
                  <Link to="/bing/afterSale/refund" className={styles.link}>
                    Refund
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BingSidebar;
