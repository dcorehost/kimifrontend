

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
      const token = localStorage.getItem("userToken"); 

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://admediaagency.online/kimi/get-google-ads", {
          headers: { Authorization: `Bearer ${token}` }, 
        });

        console.log("API Response:", response.data); 

        if (response.data.message === "google ads fetched successfully" && Array.isArray(response.data.ads)) {
          const ads = response.data.ads.map((ad) => ({
            applyId: ad._id, 
            adsNumber: ad.adNum, 
            state: ad.state, 
            totalCost: ad.totalCost || "N/A", 
            applyTime: ad.createdAt, 
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
                    <td>{ad.applyId || "N/A"}</td> 
                    <td>{ad.adsNumber || "N/A"}</td> 
                    <td>{ad.state || "N/A"}</td> 
                    <td>{ad.totalCost}</td> 
                    <td>{new Date(ad.applyTime).toLocaleString() || "N/A"}</td> 
                    <td>
                      
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
