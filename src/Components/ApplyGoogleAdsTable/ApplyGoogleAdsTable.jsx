// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./ApplyGoogleAdsTable.module.css";

// const ApplyGoogleAdsTable = () => {
//   const navigate = useNavigate();

//   const handleNextPage = () => {
//     navigate("/google/accountManage/accountList/creategoogleads");
//   };

//   const data = [
//     {
//       applyId: "APP001",
//       adsNumber: "AD001",
//       state: "Active",
//       totalCost: "$5000",
//       applyTime: "2025-01-09",
//     },
//     {
//       applyId: "APP002",
//       adsNumber: "AD002",
//       state: "Inactive",
//       totalCost: "$200",
//       applyTime: "2025-01-08",
//     },
//   ];

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} onClick={handleNextPage}>
//         Create ad here
//       </button>
//       <div className={styles.tableContainer}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Apply ID</th>
//               <th>Ads Number</th>
//               <th>State</th>
//               <th>Total Cost</th>
//               <th>Apply Time</th>
//               <th>Operate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.applyId}</td>
//                 <td>{row.adsNumber}</td>
//                 <td>{row.state}</td>
//                 <td>{row.totalCost}</td>
//                 <td>{row.applyTime}</td>
//                 <td></td> {/* Empty "Operate" column */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ApplyGoogleAdsTable;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ApplyGoogleAdsTable.module.css";

const ApplyGoogleAdsTable = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/google/accountManage/accountList/creategoogleads");
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      const token = localStorage.getItem("userToken"); // Retrieve token from localStorage

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://admediaagency.online/kimi/get-google-ads", {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
        });

        console.log("API Response:", response.data); // Log the full API response

        if (response.data.message === "google ads fetched successfully" && Array.isArray(response.data.ads)) {
          const ads = response.data.ads.map((ad) => ({
            applyId: ad._id, // Apply ID (_id)
            adsNumber: ad.adNum, // Ads Number (adNum)
            state: ad.state, // State (e.g., "Active", "Completed")
            totalCost: ad.totalCost || "N/A", // Total cost (if available)
            applyTime: ad.createdAt, // Apply Time (createdAt)
          }));
          setAdsData(ads);
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
      <button className={styles.button} onClick={handleNextPage}>
        Create ad here
      </button>
      <div className={styles.tableContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apply ID</th>
                <th>Ads Number</th>
                <th>State</th>
                <th>Total Cost</th>
                <th>Apply Time</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.applyId || "N/A"}</td> {/* Apply ID */}
                    <td>{ad.adsNumber || "N/A"}</td> {/* Ads Number */}
                    <td>{ad.state || "N/A"}</td> {/* State */}
                    <td>{ad.totalCost}</td> {/* Total Cost */}
                    <td>{new Date(ad.applyTime).toLocaleString() || "N/A"}</td> {/* Apply Time */}
                    <td>
                      {/* Operate button or any other action */}
                      <button className={styles.button}>Action</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No ads data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplyGoogleAdsTable;
