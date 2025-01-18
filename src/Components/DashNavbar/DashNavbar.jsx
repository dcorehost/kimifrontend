
import React, { useEffect, useState, useRef } from "react";
import styles from "./DashNavbar.module.css";
import { AiTwotoneDollar } from "react-icons/ai";
import Auth from "../Services/Auth";
import "@fortawesome/fontawesome-free/css/all.min.css";

const DashNavbar = ({ isSidebarOpen, toggleSidebar, handleSidebarChange }) => {
  const [userName, setUserName] = useState("Guest");
  const [walletAmount, setWalletAmount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const authData = Auth.getAuthData();

    if (authData) {
      setUserName(authData.username || "Guest");
      setWalletAmount(authData.wallet || 0);
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
            <a
              href="#home"
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                handleSidebarChange("default");
              }}
            >
              <i className="fas fa-home"></i> Home
            </a>
          </li>
          <li>
            <a
              href="#google"
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                handleSidebarChange("google");
              }}
            >
              <i className="fab fa-google"></i> Google
            </a>
          </li>
          <li>
            <a
              href="#bing"
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                handleSidebarChange("bing");
              }}
            >
              <i className="fab fa-microsoft"></i> Bing
            </a>
          </li>
          <li>
            <a
              href="#facebook"
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                handleSidebarChange("facebook");
              }}
            >
              <i className="fab fa-facebook"></i> Facebook
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.rightNav}>
        <span>
          <AiTwotoneDollar /> ${walletAmount.toFixed(2)}
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
                <a href="/user-profile" className={styles.link}>Profile</a>
              </li>
              <li>
                <a href="#setting" className={styles.link}>Settings</a>
              </li>
              <li>
                <a href="#logout" className={styles.link}>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;






// import React, { useEffect, useState } from "react";
// import styles from "./DashNavbar.module.css";
// import { AiTwotoneDollar } from "react-icons/ai";
// import Auth from "../Services/Auth";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const DashNavbar = ({ isSidebarOpen, toggleSidebar, handleSidebarChange }) => {
//   const [userName, setUserName] = useState("Guest");
//   const [walletAmount, setWalletAmount] = useState(0);

//   useEffect(() => {
//     const authData = Auth.getAuthData();

//     if (authData) {
//       setUserName(authData.username || "Guest");
//       setWalletAmount(authData.wallet || 0);
//     }
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
//             <a
//               href="#home"
//               className={styles.link}
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent default navigation
//                 handleSidebarChange("default"); // Switch to default Sidebar
//               }}
//             >
//               <i className="fas fa-home"></i> Home
//             </a>
//           </li>
//           {/* Google Sidebar Link */}
//           <li>
//             <a
//               href="#google"
//               className={styles.link}
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent default navigation
//                 handleSidebarChange("google"); // Switch to Google Sidebar
//               }}
//             >
//               <i className="fab fa-google"></i> Google
//             </a>
//           </li>
//           {/* Bing Sidebar Link */}
//           <li>
//             <a
//               href="#bing"
//               className={styles.link}
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent default navigation
//                 handleSidebarChange("bing"); // Switch to Bing Sidebar
//               }}
//             >
//               <i className="fab fa-microsoft"></i> Bing
//             </a>
//           </li>
//           {/* Facebook/Meta Sidebar Link */}
//           <li>
//             <a
//               href="#facebook"
//               className={styles.link}
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent default navigation
//                 handleSidebarChange("facebook"); // Switch to Meta Sidebar
//               }}
//             >
//               <i className="fab fa-facebook"></i> Facebook
//             </a>
//           </li>
//         </ul>
//       </div>

//       <div className={styles.rightNav}>
//         <span>
//           <AiTwotoneDollar /> ${walletAmount.toFixed(2)}
//         </span>
//         <span>{userName}</span>
//       </div>
//     </nav>
//   );
// };

// export default DashNavbar;


// //lastworking code 
// import React, { useEffect, useState } from "react";
// import styles from "./DashNavbar.module.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import Auth from "../Services/Auth"; // Import Auth to retrieve user data
// import { AiTwotoneDollar } from "react-icons/ai";

// const DashNavbar = ({ isSidebarOpen, toggleSidebar, handleSidebarChange }) => {
//   const [userName, setUserName] = useState("Guest");
//   const [walletAmount, setWalletAmount] = useState(0);

//   // Fetch user data from Auth and set userName and walletAmount
//   useEffect(() => {
//     const authData = Auth.getAuthData();
//     console.log("Auth Data Retrieved: ", authData); // Debug log to verify if data is fetched

//     if (authData && authData.username && authData.wallet) {
//       setUserName(authData.username);    // Set username from the saved Auth data
//       setWalletAmount(authData.wallet);  // Set wallet amount from the saved Auth data
//     } else {
//       console.error("No auth data found.");
//     }
//   }, []); // Empty dependency array to run only once after component mounts

//   return (
//     <nav className={`${styles.navbar} ${isSidebarOpen ? styles.open : ""}`}>
            
//       {/* Toggle Button */}
//       <button
//         className={`${styles.toggleButton} ${isSidebarOpen ? styles.rotate : ""}`}
//         onClick={toggleSidebar}
//       >
//         <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
//       </button>
         
      // <div className={styles.leftNav}>
      //   <ul className={styles.navLinks}>
      //     <li>
      //       <a
      //         href="#home"
      //         className={styles.link}
      //         onClick={(e) => {
      //           e.preventDefault(); // Prevent default navigation
      //           handleSidebarChange("default"); // Switch to default Sidebar
      //         }}
      //       >
      //         <i className="fas fa-home"></i> Home
      //       </a>
      //     </li>
      //     {/* Google Sidebar Link */}
      //     <li>
      //       <a
      //         href="#google"
      //         className={styles.link}
      //         onClick={(e) => {
      //           e.preventDefault(); // Prevent default navigation
      //           handleSidebarChange("google"); // Switch to Google Sidebar
      //         }}
      //       >
      //         <i className="fab fa-google"></i> Google
      //       </a>
      //     </li>
      //     {/* Bing Sidebar Link */}
      //     <li>
      //       <a
      //         href="#bing"
      //         className={styles.link}
      //         onClick={(e) => {
      //           e.preventDefault(); // Prevent default navigation
      //           handleSidebarChange("bing"); // Switch to Bing Sidebar
      //         }}
      //       >
      //         <i className="fab fa-microsoft"></i> Bing
      //       </a>
      //     </li>
      //     {/* Facebook/Meta Sidebar Link */}
      //     <li>
      //       <a
      //         href="#facebook"
      //         className={styles.link}
      //         onClick={(e) => {
      //           e.preventDefault(); // Prevent default navigation
      //           handleSidebarChange("facebook"); // Switch to Meta Sidebar
      //         }}
      //       >
      //         <i className="fab fa-facebook"></i> Facebook
      //       </a>
      //     </li>
      //   </ul>
      // </div>

//       <div className={styles.rightNav}>
//         <ul className={styles.navLinks}>
//           <li>
//             <a href="#money" className={`${styles.link} ${styles.money}`}>
//               <AiTwotoneDollar className={styles.dollaricon} /> ${walletAmount.toFixed(2)}
//             </a>
//           </li>
//           <li className={styles.dropdown}>
//             <span className={styles.link}>
//               {userName} <span className={styles.arrow}>&#9660;</span>
//             </span>
//             <ul className={styles.submenu}>
//               <li>
//                 <a href="#profile" className={styles.link}>Profile</a>
//               </li>
//               <li>
//                 <a href="#settings" className={styles.link}>Settings</a>
//               </li>
//               <li>
//                 <a href="#logout" className={styles.link}>Logout</a>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default DashNavbar;












