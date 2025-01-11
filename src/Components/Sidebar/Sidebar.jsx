// import React, { useState } from "react";
// import styles from "./Sidebar.module.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [walletExpanded, setWalletExpanded] = useState(false); // State to toggle wallet options

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleWallet = () => {
//     setWalletExpanded(!walletExpanded); // Toggle wallet options visibility
//   };

  // return (
  //   <div>
  //     {/* Sidebar */}
  //     <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
  //       {/* Toggle Button inside Sidebar */}
  //       <button
  //         className={`${styles.toggleButton} ${isOpen ? styles.rotate : ""}`}
  //         onClick={toggleSidebar}
  //       >
  //         <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i> {/* Show fa-bars when sidebar is closed, fa-times when open */}
  //       </button>

  //       {/* Sidebar Links */}
  //       <ul className={`${styles.sidebarLinks} ${isOpen ? styles.showText : ""}`}>
  //         <li>
  //           <a href="#dashboard" className={styles.link}>
  //             <i className="fas fa-tachometer-alt"></i> {/* Icon always visible */}
  //             {isOpen && ' Dashboard'} {/* Text only when open */}
  //           </a>
  //         </li>
          // <li>
          //   <div
          //     className={`${styles.link} ${styles.walletLink}`}
          //     onClick={toggleWallet} // Toggle wallet options on click
          //   >
          //     <i className="fas fa-wallet"></i> {/* Icon always visible */}
          //     {isOpen && ' Wallet'}
          //     {isOpen && (
          //       <i className={`fas ${walletExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: 'auto' }}></i>
          //     )}
          //   </div>
          //   {walletExpanded && isOpen && (
          //     <ul className={styles.subMenu}>
          //       <li>
          //         <a href="#add-money" className={styles.subLink}>
          //           Add Money
          //         </a>
          //       </li>
          //       <li>
          //         <a href="#pay-link" className={styles.subLink}>
          //           Pay Link
          //         </a>
          //       </li>
          //       <li>
          //         <a href="#wallet-flow" className={styles.subLink}>
          //           Wallet Flow
          //         </a>
          //       </li>
  //             </ul>
  //           )}
  //         </li>
          // <li>
          //   <a href="#2f" className={styles.link}>
          //     <i className="fas fa-key"></i> {/* Icon always visible */}
          //     {isOpen && ' 2F Tool'} {/* Text only when open */}
          //   </a>
          // </li>
  //       </ul>
  //     </div>
  //   </div>
  // );
// };

// export default Sidebar;










//working code 
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { assets } from "../../assets/assets.jsx";

import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const toggleWalletMenu = () => {
    setIsWalletOpen((prev) => !prev);
  };

  return (
    <div>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
                <img src={assets.logo} alt="Kimi Agency Logo" className={styles.kimilogo} />
              </div>
        {/* Sidebar Menu */}
        <ul className={`${styles.sidebarLinks} ${isSidebarOpen ? styles.showText : ""}`}>
          <li>
            <a href="#dashboard" className={styles.link}>
              <i className="fas fa-tachometer-alt"></i> {isSidebarOpen && "Dashboard"}
            </a>
          </li>
          <li>
            <button onClick={toggleWalletMenu} className={`${styles.link} ${styles.walletToggle}`}>
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
                  <a href="#add-money" className={styles.link}>
                    <i className="fas fa-plus-circle"></i> Add Money
                  </a>
                </li>
                <li>
                  <a href="#pay" className={styles.link}>
                    <i className="fas fa-paper-plane"></i> Pay
                  </a>
                </li>
                <li>
                  <a href="#link-wallet" className={styles.link}>
                    <i className="fas fa-link"></i> Link Wallet
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="#2fa" className={styles.link}>
              <i className="fas fa-shield-alt"></i> {isSidebarOpen && "2FA Tool"}
            </a>
          </li>
          {/* Additional sidebar items */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

