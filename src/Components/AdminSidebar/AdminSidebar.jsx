


import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminSidebar.module.css";
import { assets } from "../../assets/assets.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
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
          <img src={assets.admin} alt="Bing Logo" className={styles.adminlogo} />
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
                  <Link to="/#" className={styles.link}>
                    User List
                  </Link>
                </li>
                <li>
                  <Link to="/admin/accountmanage/changenetwork" className={styles.link}>
                    Change Network
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* New Menu for Ad Approval */}
          <li>
            <button
              onClick={() => toggleMenu("adApproval")}
              className={`${styles.link} ${styles.walletToggle}`}
            >
              <i className="fas fa-check-circle"></i> {isSidebarOpen && "Ad Approval"}
              <i
                className={`fas ${openMenus.adApproval ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}
              ></i>
            </button>
            {openMenus.adApproval && (
              <ul className={styles.subMenu}>
                <li>
                  <Link to="/admin/adapproval/gapprove" className={styles.link}>
                    Google Ads Approval
                  </Link>
                </li>
                <li>
                  <Link to="/admin/adapproval/bapprove" className={styles.link}>
                    Bing Ads Approval
                  </Link>
                </li>
                <li>
                  <Link to="/admin/adapproval/fapprove" className={styles.link}>
                    Facebook Ads Approval
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* New Menu for Approved Ads */}
          <li>
            <button
              onClick={() => toggleMenu("approvedAds")}
              className={`${styles.link} ${styles.walletToggle}`}
            >
              <i className="fas fa-thumbs-up"></i> {isSidebarOpen && "Approved Ads"}
              <i
                className={`fas ${openMenus.approvedAds ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}
              ></i>
            </button>
            {openMenus.approvedAds && (
              <ul className={styles.subMenu}>
                <li>
                  <Link to="/admin/approvedads/g-oogle" className={styles.link}>
                    Approved Google Ads
                  </Link>
                </li>
                <li>
                  <Link to="/admin/approvedads/bing" className={styles.link}>
                    Approved Bing Ads
                  </Link>
                </li>
                <li>
                  <Link to="/admin/approvedads/f-acebook" className={styles.link}>
                    Approved Facebook Ads
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* New Menu for Refund Approval */}
          <li>
            <button
              onClick={() => toggleMenu("Refund")}
              className={`${styles.link} ${styles.walletToggle}`}
            >
              <i className="fas fa-undo-alt"></i> {isSidebarOpen && "Refund"}
              <i
                className={`fas ${openMenus.Refund ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}
              ></i>
            </button>
            {openMenus.Refund && (
              <ul className={styles.subMenu}>
                <li>
                  <Link to="/admin/refund/pendingrefund" className={styles.link}>
                    Pending Refunds
                  </Link>
                </li>
                <li>
                  <Link to="/admin/refund/approverefund" className={styles.link}>
                    Approved Refunds
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

export default AdminSidebar;

