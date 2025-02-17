// import React from "react";
// import styles from "./MetaAccountList.module.css";
// import { useNavigate } from 'react-router-dom';




// const MetaAccountList = () => {
//     const navigate = useNavigate();
  
//     const handleDirectCreateAd = () => {
//       navigate('/facebook/accountManage/createaccount'); 
//     };
  
//     const handleVipPackage = () => {
//       navigate('/#'); 
//     };

//   return (
//     <div className={styles.container}>
//       {/* Notification Section */}
//       <div className={styles.notificationSection}>
//         <h3 className={styles.sectionTitle}>Notification</h3>
//         <div className={styles.notificationCards}>
//           {["Pending Application", "Pending Deposit", "Pending Modify", "Pending Share", "Pending Refund"].map(
//             (title, index) => (
//               <div key={index} className={styles.card}>
//                 <p className={styles.cardTitle}>{title}</p>
//                 <p className={styles.cardCount}>0</p>
//               </div>
//             )
//           )}
//         </div>
//       </div>

//       {/* Ad Account List Section */}
//       <div className={styles.adAccountSection}>
//         <h3 className={styles.sectionTitle}>Ad Account List</h3>
//         <div className={styles.actionButtons}>
          
//                 <button
//                     className={`${styles.button} ${styles.createAdButton}`}
//                      onClick={handleDirectCreateAd}
//                       >
//                      direct create ad
//                     </button>
//                <button
//                    className={`${styles.button} ${styles.vipButton}`}
//                    onClick={handleVipPackage}
//                     >
//                 vip package
//                 </button>

//         </div>
//         <div className={styles.tableContainer}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>License</th>
//                 <th>Ads Account ID</th>
//                 <th>Ads Account Name</th>
//                 <th>Operate</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td colSpan="4" className={styles.noData}>
//                   <img
//                     src="/path/to/no-data-image.png"
//                     alt="No Data"
//                     className={styles.noDataImage}
//                   />
//                   <p>No Data</p>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MetaAccountList;



import React, { useEffect, useState } from "react";
import styles from "./MetaAccountList.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Auth from "../Services/Auth";

const MetaAccountList = () => {
  const navigate = useNavigate();
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);

  const handleDirectCreateAd = () => {
    navigate("/facebook/accountManage/createaccount");
  };

  const handleVipPackage = () => {
    navigate("/#");
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      const token = Auth.getToken();

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "https://admediaagency.online/kimi/get-facebook-ads",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);

        if (
          response.data.message === "facebook ads fetched successfully" &&
          Array.isArray(response.data.ads)
        ) {
          setAdsData(response.data.ads);
        } else {
          setError("Failed to fetch ads data.");
        }
      } catch (err) {
        console.error("Error fetching ads data:", err.message);
        setError("An error occurred while fetching ads data.");
      }
    };

    fetchAdsData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.notificationSection}>
        <h3 className={styles.sectionTitle}>Notification</h3>
        <div className={styles.notificationCards}>
          {["Pending Application", "Pending Deposit", "Pending Modify", "Pending Share", "Pending Refund"].map(
            (title, index) => (
              <div key={index} className={styles.card}>
                <p className={styles.cardTitle}>{title}</p>
                <p className={styles.cardCount}>0</p>
              </div>
            )
          )}
        </div>
      </div>

      <div className={styles.adAccountSection}>
        <h3 className={styles.sectionTitle}>Ad Account List</h3>
        <div className={styles.actionButtons}>
          <button className={`${styles.button} ${styles.createAdButton}`} onClick={handleDirectCreateAd}>
            Direct Create Ad
          </button>
          <button className={`${styles.button} ${styles.vipButton}`} onClick={handleVipPackage}>
            VIP Package
          </button>
        </div>
        <div className={styles.tableContainer}>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>License</th>
                  <th>Ads Account ID</th>
                  <th>Ads Account Name</th>
                  <th>Operate</th>
                </tr>
              </thead>
              <tbody>
                {adsData.length > 0 ? (
                  adsData.map((ad) => (
                    <tr key={ad._id}>
                      <td>{ad.licenseName}</td>
                      <td>{ad.adsId}</td>
                      <td>{ad.ads.map((account) => account.accountName).join(", ")}</td>
                      <td>
                        <button className={styles.operateButton}>Manage</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={styles.noData}>
                      <img src="/path/to/no-data-image.png" alt="No Data" className={styles.noDataImage} />
                      <p>No Data</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetaAccountList;