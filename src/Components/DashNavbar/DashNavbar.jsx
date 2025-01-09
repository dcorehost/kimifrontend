// import React from "react";
// import styles from "./DashNavbar.module.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const DashNavbar = ({ userName = "Guest" }) => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.leftNav}>
//         <ul className={styles.navLinks}>
//           <li>
//             <a href="#home" className={styles.link} id={styles.home}>
//               <i className="fas fa-home"></i> Home
//             </a>
//           </li>
//           <li className={styles.dropdown}>
//             <a href="#facebook" className={styles.link}>
//               <i className="fab fa-facebook" id={styles.face}></i> Facebook <span className={styles.arrow}>&#9660;</span>
//             </a>
//             <ul className={styles.submenu}>
//               <li>
//                 <a href="#page1" className={styles.link}> <i className="fab fa-facebook" style={{ color: '#316FF6' }}></i> Facebook</a>
//               </li>
//               <li>
//                 <a href="#page2" className={styles.link}> <i className="fas fa-chart-line" style={{ color: '#F2B50F' }}></i> AssetsMarketing</a>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <a href="#google" className={styles.link}>
//               <i className="fab fa-google" id={styles.google}></i> Google
//             </a>
//           </li>
//           <li className={styles.dropdown}>
//             <a href="#other" className={styles.link}>
//               Other Platforms <span className={styles.arrow}>&#9660;</span>
//             </a>
//             <ul className={styles.submenu}>
//               <li>
//                 <a href="#platform1" className={styles.link}><i className="fab fa-tiktok" style={{ color: '#010101  ' }}></i> TikTok</a>
//               </li>
//               <li>
//                 <a href="#platform2" className={styles.link}><i className="fab fa-tiktok" style={{ color: '#010101' }}></i> TikTokShop</a>
//               </li>
//               <li>
//                 <a href="#platform3" className={styles.link}><i className="fab fa-microsoft" style={{ color: '#00A4EF' }}></i> Bing</a>
//               </li>
//               <li>
//                 <a href="#platform4" className={styles.link}><i className="fab fa-snapchat" style={{ color: '#FFFC00' }}></i> Snapchat</a>
//               </li>
//               <li>
//                 <a href="#platform5" className={styles.link}><i className="fab fa-taboola" style={{ color: '#3798D2' }}></i> Taboola</a>
//               </li>
//               <li>
//                 <a href="#platform6" className={styles.link}><i className="fas fa-video" style={{ color: '#FF6B91' }}></i> Mediago</a>
//               </li>
//               <li>
//                 <a href="#platform7" className={styles.link}><i className="fas fa-brain" style={{ color: '#FF6F61' }}></i>Outbrain</a>
//               </li>
//               <li>
//                 <a href="#platform8" className={styles.link}><i className="fab fa-kawaii" style={{ color: '#FF6B91' }}></i> Kawai</a>
//               </li>
//             </ul>
//           </li>
//           <li className={styles.dropdown}>
//             <a href="#company-service" className={styles.link}>
//               Company Service <span className={styles.arrow}>&#9660;</span>
//             </a>
//             <ul className={styles.submenu}>
//               <li>
//                 <a href="#service1" className={styles.link}><i className="fas fa-building" style={{ color: '#000' }}></i> Company</a>
//               </li>
//               <li>
//                 <a href="#service2" className={styles.link}><i className="fas fa-phone" style={{ color: '#FF6F61' }}></i> Tel Card</a>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>

//       <div className={styles.rightNav}>
//         <ul className={styles.navLinks}>
//           <li>
//             <a href="#money" className={`${styles.link} ${styles.money}`} id={styles.home}>
//               <i className="fas fa-dollar-sign"></i> Money
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



//working code 
import React from "react";
import styles from "./DashNavbar.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const DashNavbar = ({ isSidebarOpen, toggleSidebar, userName = "Guest" }) => {
  return (
    <nav className={`${styles.navbar} ${isSidebarOpen ? styles.open : ""}`}>
      {/* Toggle Button */}
      <button
        className={`${styles.toggleButton} ${isSidebarOpen ? styles.rotate : ""}`}
        onClick={toggleSidebar}
      >
        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      <div className={styles.leftNav}>
        <ul className={styles.navLinks}>
          <li>
            <a href="#home" className={styles.link} id={styles.home}>
              <i className="fas fa-home"></i> Home
            </a>
          </li>
          {/* Additional navbar items */}
        </ul>
      </div>

      <div className={styles.rightNav}>
        <ul className={styles.navLinks}>
          <li className={styles.dropdown}>
            <span className={styles.link}>
              {userName} <span className={styles.arrow}>&#9660;</span>
            </span>
            <ul className={styles.submenu}>
              <li>
                <a href="#profile" className={styles.link}>Profile</a>
              </li>
              <li>
                <a href="#settings" className={styles.link}>Settings</a>
              </li>
              <li>
                <a href="#logout" className={styles.link}>Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashNavbar;


