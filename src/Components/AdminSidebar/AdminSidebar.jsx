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
            <button onClick={() => toggleMenu("accountManage")} className={`${styles.link} ${styles.walletToggle}`}>
              <i className="fas fa-user-circle"></i> {isSidebarOpen && "Account Manage"}
              <i className={`fas ${openMenus.accountManage ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}></i>
            </button>
            {openMenus.accountManage && (
              <ul className={styles.subMenu}>
            <li>
              <Link to="/admin/dashboard/UserAdsInformation" className={styles.link}>
                User List
              </Link>
            </li>                
            <li><Link to="/admin/accountmanage/changenetwork" className={styles.link}>Change Network</Link></li>
              </ul>
            )}
          </li>

          {/* Ad Approval */}
          <li>
            <button onClick={() => toggleMenu("adApproval")} className={`${styles.link} ${styles.walletToggle}`}>
              <i className="fas fa-check-circle"></i> {isSidebarOpen && "Ads Approval"}
              <i className={`fas ${openMenus.adApproval ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}></i>
            </button>
            {openMenus.adApproval && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/adapproval/gapprove" className={styles.link}>Pending Google Ads </Link></li>
                <li><Link to="/admin/adapproval/bapprove" className={styles.link}>Pending Bing Ads </Link></li>
                <li><Link to="/admin/adapproval/fapprove" className={styles.link}>Pending Facebook Ads </Link></li>
              </ul>
            )}
          </li>

          {/* Approved Ads */}
          <li>
            <button onClick={() => toggleMenu("approvedAds")} className={`${styles.link} ${styles.walletToggle}`}>
              <i className="fas fa-thumbs-up"></i> {isSidebarOpen && "Approved Ads"}
              <i className={`fas ${openMenus.approvedAds ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}></i>
            </button>
            {openMenus.approvedAds && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/approvedads/g-oogle" className={styles.link}>Approved Google Ads</Link></li>
                <li><Link to="/admin/approveds/b-ing" className={styles.link}>Approved Bing Ads</Link></li>
                <li><Link to="/admin/approvedads/f-acebook" className={styles.link}>Approved Facebook Ads</Link></li>
              </ul>
            )}
          </li>

          {/* Refund */}
          <li>
            <button onClick={() => toggleMenu("Refund")} className={`${styles.link} ${styles.walletToggle}`}>
              <i className="fas fa-undo-alt"></i> {isSidebarOpen && "Refund"}
              <i className={`fas ${openMenus.Refund ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}></i>
            </button>
            {openMenus.Refund && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/refund/pendingrefund" className={styles.link}>Pending Refunds</Link></li>
                <li><Link to="/admin/refund/approverefund" className={styles.link}>Approved Refunds</Link></li>
              </ul>
            )}
          </li>

          {/* Transactions */}
          <li>
            <button onClick={() => toggleMenu("transactions")} className={`${styles.link} ${styles.walletToggle}`}>
              <i className="fas fa-exchange-alt"></i> {isSidebarOpen && "Transactions"}
              <i className={`fas ${openMenus.transactions ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}></i>
            </button>
            {openMenus.transactions && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/transactions/pending" className={styles.link}>Pending Transactions</Link></li>
                <li><Link to="/admin/transactions/approved" className={styles.link}>Approved Transactions</Link></li>
              </ul>
            )}
          </li>

          {/* Option Menu */}
          <li>
            <button onClick={() => toggleMenu("option")} className={`${styles.link} ${styles.walletToggle}`}>
              <i className="fas fa-cog"></i> {isSidebarOpen && "Pending Ads Deposite"}
              <i className={`fas ${openMenus.option ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}></i>
            </button>
            {openMenus.option && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/AdsDeposite/PendingAdsGoogleDeposite" className={styles.link}>Pending Google Ads Deposite</Link></li>
                <li><Link to="/admin/AdsDeposite/PendingAdsBingDeposite" className={styles.link}>Pending Bing Ads Deposite</Link></li>
                <li><Link to="/admin/AdsDeposite/PendingAdsFacebookDeposite" className={styles.link}>Pending Facebook Ads Deposite</Link></li>
              </ul>
            )}
          </li>

          {/* Complete Ads Deposit Menu */}
          <li>
            <button onClick={() => toggleMenu("completeAdsDeposit")} className={`${styles.link} ${styles.walletToggle}`}>
              <i className="fas fa-check-circle"></i> {isSidebarOpen && "Complete Ads Deposit"}
              <i className={`fas ${openMenus.completeAdsDeposit ? "fa-chevron-up" : "fa-chevron-down"} ${styles.chevron}`}></i>
            </button>
            {openMenus.completeAdsDeposit && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/AdsDeposite/CompleteAdsGoogleDeposite" className={styles.link}>Complete Google Ads Deposite</Link></li>
                <li><Link to="/admin/AdsDeposite/CompleteAdsBingDeposite" className={styles.link}>Complete Bing Ads Deposite</Link></li>
                <li><Link to="/admin/AdsDeposite/CompleteAdsFacebookDeposite" className={styles.link}>Complete Facebook Ads Deposite</Link></li>
              </ul>
            )}
          </li>


          <li className={styles.mainMenuItem}>
            <Link to="/admin/logs/GmailShareLog" className={`${styles.link} ${styles.mainHeading}`}>
              <i className="fas fa-envelope"></i> Gmail Share Log
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
