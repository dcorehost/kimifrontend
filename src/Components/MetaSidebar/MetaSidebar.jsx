import React, { useState } from "react";
import { Link } from "react-router-dom";
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
                  <Link to="/facebook/accountManage/accountlist" className={styles.link}>
                    Account List
                  </Link>
                </li>
                <li>
                  <Link to="/facebook/accountManage/applynewad" className={styles.link}>
                    Apply New Ad Account
                  </Link>
                </li>
                <li>
                  <Link to="/facebook/accountManage/bmShareLog" className={styles.link}>
                    BM Share Log
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
                  <Link to="/facebook/finance/metaadsdeposit" className={styles.link}>
                    Ads Deposit
                  </Link>
                </li>
                <li>
                  <Link to="/facebook/finance/metaadsdepositrecord" className={styles.link}>
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
                  <Link to="/facebook/aftersale/refund" className={styles.link}>
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

export default MetaSidebar;
