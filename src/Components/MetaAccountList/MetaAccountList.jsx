import React, { useEffect, useState } from "react";
import styles from "./MetaAccountList.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Auth from "../Services/Auth";

const MetaAccountList = () => {
  const navigate = useNavigate();
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const [pendingDetails, setPendingDetails] = useState({
    application: 0,
    deposits: 0,
    refunds: 0,
  });
  const [selectedAd, setSelectedAd] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleDirectCreateAd = () => {
    navigate("/facebook/accountManage/createaccount");
  };

  const handleVipPackage = () => {
    navigate("/#");
  };

  const handleShowDetails = (ad) => {
    setSelectedAd(ad); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedAd(null); 
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

    const fetchPendingDetails = async () => {
      const token = Auth.getToken();

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "https://admediaagency.online/kimi/get-pending-details-facebook-ads",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.message === "facebook ads fetched successfully") {
          setPendingDetails({
            application: response.data.application || 0,
            deposits: response.data.deposits || 0,
            refunds: response.data.refunds || 0,
          });
        }
      } catch (err) {
        console.error("Error fetching pending details:", err.message);
      }
    };

    fetchAdsData();
    fetchPendingDetails();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.notificationSection}>
        <h3 className={styles.sectionTitle}>Notification</h3>
        <div className={styles.notificationCards}>
          {[ 
            { title: "Pending Application", count: pendingDetails.application },
            { title: "Pending Deposit", count: pendingDetails.deposits },
            { title: "Pending Refund", count: pendingDetails.refunds },
          ].map((item, index) => (
            <div key={index} className={styles.card}>
              <p className={styles.cardTitle}>{item.title}</p>
              <p className={styles.cardCount}>{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.adAccountSection}>
        <h3 className={styles.sectionTitle}>Ad Account List</h3>
        <div className={styles.actionButtons}>
          <button
            className={`${styles.button} ${styles.createAdButton}`}
            onClick={handleDirectCreateAd}
          >
            Direct Create Ad
          </button>
          {/* <button
            className={`${styles.button} ${styles.vipButton}`}
            onClick={handleVipPackage}
          >
            VIP Package
          </button> */}
        </div>
        <div className={styles.tableContainer}>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                <th>License</th>
                <th>Apply ID</th>

                <th>Ads ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Account Name</th>
                <th>Deposit</th>
                <th>State</th>
                <th>Total Cost</th>
                <th>Wallet Amount</th>
                
                
                <th>Created At</th>
                <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {adsData.length > 0 ? (
                  adsData.map((ad) => (
                    <tr key={ad._id}>
                    <td>{ad.licenseName || "N/A"}</td>
                    <td>{ad.applyId || "N/A"}</td>

                    <td>{ad.adsId || "N/A"}</td>
                    <td>{ad.userId.username || "N/A"}</td>
                    <td>{ad.userId.contact.emailId || "N/A"}</td>
                    <td>{ad.ads.map((account) => account.accountName).join(", ") || "N/A"}</td>
                    {/* <td>{ad.ads.map((account) => account.deposit).join(", ") || "N/A"}</td> */}
                    <td>{ad.ads.map((account) => `$${account.deposit}`).join(", ") || "N/A"}</td>

                    <td>
                    <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                    {ad.state || "N/A"}
                    </span>
                    </td>
                    <td>{ad.totalCost ? `$${ad.totalCost}` : "N/A"}</td>
                    <td>{ad?.userId?.wallet ? `$${ad.userId.wallet.toFixed(2)}` : "N/A"}</td>


                  
                    <td>{new Date(ad.createdAt).toLocaleDateString() || "N/A"}</td>
                    <td>{new Date(ad.updatedAt).toLocaleDateString() || "N/A"}</td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={styles.noData}>
                      <img
                        src="/path/to/no-data-image.png"
                        alt="No Data"
                        className={styles.noDataImage}
                      />
                      <p>No Data</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for showing ad details */}
      {isModalOpen && selectedAd && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              X
            </button>
            <h3>Ad Details</h3>
            <div>
              <p><strong>License:</strong> {selectedAd.licenseName}</p>
              <p><strong>Ads Account ID:</strong> {selectedAd.adsId}</p>
              <p><strong>Account Names:</strong> {selectedAd.ads.map((account) => account.accountName).join(", ")}</p>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetaAccountList;


// import React, { useEffect, useState } from "react";
// import styles from "./MetaAccountList.module.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Auth from "../Services/Auth";

// const MetaAccountList = () => {
//   const navigate = useNavigate();
//   const [adsData, setAdsData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAdsData = async () => {
//       const token = Auth.getToken();
//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }
//       try {
//         const response = await axios.get(
//           "https://admediaagency.online/kimi/get-facebook-ads",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (
//           response.data.message === "facebook ads fetched successfully" &&
//           Array.isArray(response.data.ads)
//         ) {
//           setAdsData(response.data.ads);
//         } else {
//           setError("Failed to fetch ads data.");
//         }
//       } catch (err) {
//         console.error("Error fetching ads data:", err.message);
//         setError("An error occurred while fetching ads data.");
//       }
//     };
//     fetchAdsData();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h3 className={styles.sectionTitle}>Ad Account List</h3>
//       <div className={styles.tableContainer}>
//         {error ? (
//           <p className={styles.error}>{error}</p>
//         ) : (
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>License</th>
//                 <th>Ads ID</th>
//                 <th>Account Name</th>
//                 <th>Deposit</th>
//                 <th>Apply ID</th>
//                 <th>State</th>
//                 <th>Total Cost</th>
//                 <th>User</th>
//                 <th>Email</th>
//                 <th>Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {adsData.length > 0 ? (
//                 adsData.map((ad) => (
//                   <tr key={ad._id}>
//                     <td>{ad.licenseName || "N/A"}</td>
//                     <td>{ad.adsId || "N/A"}</td>
//                     <td>{ad.ads.map((account) => account.accountName).join(", ") || "N/A"}</td>
//                     <td>{ad.ads.map((account) => account.deposit).join(", ") || "N/A"}</td>
//                     <td>{ad.applyId || "N/A"}</td>
//                     <td>{ad.state || "N/A"}</td>
//                     <td>{ad.totalCost || "N/A"}</td>
//                     <td>{ad.userId.username || "N/A"}</td>
//                     <td>{ad.userId.contact.emailId || "N/A"}</td>
//                     <td>{new Date(ad.createdAt).toLocaleDateString() || "N/A"}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="10" className={styles.noData}>No Data Available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MetaAccountList;