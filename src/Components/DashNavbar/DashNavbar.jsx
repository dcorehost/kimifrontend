



import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./DashNavbar.module.css";
import { AiTwotoneDollar } from "react-icons/ai";
import Auth from "../Services/Auth";
import "@fortawesome/fontawesome-free/css/all.min.css";

const DashNavbar = ({ isSidebarOpen, toggleSidebar, handleSidebarChange }) => {
  const [userName, setUserName] = useState("Guest");
  const [walletAmount, setWalletAmount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Retrieve user data from Auth on component mount
  useEffect(() => {
    const authData = Auth.getAuthData(); // Fetch data from localStorage using Auth module
    if (authData) {
      setUserName(authData.username || "Guest");
      setWalletAmount(authData.wallet || 0);
    } else {
      console.error("Auth data not found or incomplete.");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isSidebarOpen ? styles.open : ""}`}>
      <button
        className={`${styles.toggleButton} ${isSidebarOpen ? styles.rotate : ""}`}
        onClick={toggleSidebar}
      >
        <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <div className={styles.leftNav}>
        <ul className={styles.navLinks}>
          <li>
            <Link
              to="/"
              className={styles.link}
              onClick={() => handleSidebarChange("default")}
            >
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link
              to="/google/accountManage/accountList"
              className={styles.link}
              onClick={() => handleSidebarChange("/google")}
            >
              <i className="fab fa-google"></i> Google
            </Link>
          </li>
          <li>
            <Link
              to="/bing/accountManage/accountList"
              className={styles.link}
              onClick={() => handleSidebarChange("/bing")}
            >
              <i className="fab fa-microsoft"></i> Bing
            </Link>
          </li>
          <li>
            <Link
              to="/facebook/accountManage/accountList"
              className={styles.link}
              onClick={() => handleSidebarChange("/facebook")}
            >
              <i className="fab fa-facebook"></i> Facebook
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.rightNav}>
        <span className={styles.wallet}>
          <AiTwotoneDollar className={styles.walletIcon} /> ${walletAmount.toFixed(2)}
        </span>
        <div className={styles.userDropdown} ref={dropdownRef}>
          <span
            className={styles.userName}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {userName} <i className="fas fa-caret-down"></i>
          </span>
          {dropdownOpen && (
            <ul className={styles.dropdown}>
              <li>
                <Link to="/user-profile" className={styles.link}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className={styles.link}>
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/logout" className={styles.link}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;





// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import styles from "./DashNavbar.module.css";
// import { AiTwotoneDollar } from "react-icons/ai";
// import Auth from "../Services/Auth";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const DashNavbar = ({ isSidebarOpen, toggleSidebar, handleSidebarChange }) => {
//   const [userName, setUserName] = useState("Guest");
//   const [walletAmount, setWalletAmount] = useState(0);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const authData = Auth.getAuthData();

//     if (authData) {
//       setUserName(authData.username || "Guest");
//       setWalletAmount(authData.wallet || 0);
//     }
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className={`${styles.navbar} ${isSidebarOpen ? styles.open : ""}`}>
//       <button
//         className={`${styles.toggleButton} ${isSidebarOpen ? styles.rotate : ""}`}
//         onClick={toggleSidebar}
//       >
//         <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
//       </button>

//       <div className={styles.leftNav}>
//         <ul className={styles.navLinks}>
//           <li>
//             <Link
//               to="/"
//               className={styles.link}
//               onClick={() => handleSidebarChange("default")}
//             >
//               <i className="fas fa-home"></i> Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/google/accountManage/accountList"
//               className={styles.link}
//               onClick={() => handleSidebarChange("/google")}
//             >
//               <i className="fab fa-google"></i> Google
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/bing/accountManage/accountList"
//               className={styles.link}
//               onClick={() => handleSidebarChange("/bing")}
//             >
//               <i className="fab fa-microsoft"></i> Bing
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/facebook/accountManage/accountList"
//               className={styles.link}
//               onClick={() => handleSidebarChange("/facebook")}
//             >
//               <i className="fab fa-facebook"></i> Facebook
//             </Link>
//           </li>
//         </ul>
//       </div>

//       <div className={styles.rightNav}>
//         <span>
//           <AiTwotoneDollar /> ${walletAmount.toFixed(2)}
//         </span>
//         <div className={styles.userDropdown} ref={dropdownRef}>
//           <span
//             className={styles.userName}
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             {userName} <i className="fas fa-caret-down"></i>
//           </span>
//           {dropdownOpen && (
//             <ul className={styles.dropdown}>
//               <li>
//                 <Link to="/user-profile" className={styles.link}>Profile</Link>
//               </li>
//               <li>
//                 <Link to="/settings" className={styles.link}>Settings</Link>
//               </li>
//               <li>
//                 <Link to="/logout" className={styles.link}>Logout</Link>
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default DashNavbar;



// // Updated DashNavbar Component
// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import styles from "./DashNavbar.module.css";
// import { AiTwotoneDollar } from "react-icons/ai";
// import Auth from "../Services/Auth";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const DashNavbar = ({ isSidebarOpen, toggleSidebar, handleSidebarChange }) => {
//   const [userName, setUserName] = useState("Guest");
//   const [walletAmount, setWalletAmount] = useState(0);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     // Retrieve user data from Auth
//     const authData = Auth.getAuthData();

//     if (authData) {
//       setUserName(authData.username || "Guest");
//       setWalletAmount(authData.wallet || 0);
//     }
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className={`${styles.navbar} ${isSidebarOpen ? styles.open : ""}`}>
//       <button
//         className={`${styles.toggleButton} ${isSidebarOpen ? styles.rotate : ""}`}
//         onClick={toggleSidebar}
//       >
//         <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
//       </button>

//       <div className={styles.leftNav}>
//         <ul className={styles.navLinks}>
//           <li>
//             <Link
//               to="/"
//               className={styles.link}
//               onClick={() => handleSidebarChange("default")}
//             >
//               <i className="fas fa-home"></i> Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/google/accountManage/accountList"
//               className={styles.link}
//               onClick={() => handleSidebarChange("/google")}
//             >
//               <i className="fab fa-google"></i> Google
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/bing/accountManage/accountList"
//               className={styles.link}
//               onClick={() => handleSidebarChange("/bing")}
//             >
//               <i className="fab fa-microsoft"></i> Bing
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/facebook/accountManage/accountList"
//               className={styles.link}
//               onClick={() => handleSidebarChange("/facebook")}
//             >
//               <i className="fab fa-facebook"></i> Facebook
//             </Link>
//           </li>
//         </ul>
//       </div>

//       <div className={styles.rightNav}>
//         <span>
//           <AiTwotoneDollar /> ${walletAmount.toFixed(2)}
//         </span>
//         <div className={styles.userDropdown} ref={dropdownRef}>
//           <span
//             className={styles.userName}
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             {userName} <i className="fas fa-caret-down"></i>
//           </span>
//           {dropdownOpen && (
//             <ul className={styles.dropdown}>
//               <li>
//                 <Link to="/user-profile" className={styles.link}>Profile</Link>
//               </li>
//               <li>
//                 <Link to="/settings" className={styles.link}>Settings</Link>
//               </li>
//               <li>
//                 <Link to="/logout" className={styles.link}>Logout</Link>
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default DashNavbar;



