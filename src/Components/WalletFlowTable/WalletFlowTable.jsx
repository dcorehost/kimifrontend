import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./WalletFlowTable.module.css";
// import * as XLSX from "xlsx";  

const WalletFlowTable = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleExportExcel = () => {
  
    const ws = XLSX.utils.json_to_sheet(adsData, {
      header: ["adsId", "createTime", "money"],  
    });

  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ads Data");
                                                       
                   
    XLSX.writeFile(wb, "ads_data.xlsx");
  };

//   useEffect(() => {
//     const fetchAdsData = async () => {
//       const token = localStorage.getItem("userToken");

//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }

//       try {
//         const response = await axios.get("https://admediaagency.online/kimi/get-google-ads", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("API Response:", response.data);

//         if (response.data.message === "google ads fetched successfully" && Array.isArray(response.data.ads)) {
//           const ads = response.data.ads.map((ad) => ({
//             type: ad._id,  // Mapping 'adsId' to 'type'
//             applyId: ad._id,  // Mapping 'adsId' to 'apply id'
//             createTime: ad.createdAt,
//             money: ad.money || "N/A",  // Add a default value for 'money'
//           }));
//           setAdsData(ads);
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

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleExportExcel}>
        Export to Excel
      </button>
      <div className={styles.tableContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Apply ID</th>
                <th>Create Time</th>
                <th>Money</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.type || "N/A"}</td> 
                    <td>{ad.applyId || "N/A"}</td> 
                    <td>{new Date(ad.createTime).toLocaleString() || "N/A"}</td> 
                    <td>{ad.money || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No ads data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WalletFlowTable;
