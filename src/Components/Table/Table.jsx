


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Table.module.css";

const Table = () => {
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
            adsId: ad._id, // Use `_id` as the Ads ID
            createTime: ad.createdAt, // Use `createdAt` for creation time
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
                <th>Ads ID</th>
                <th>Create Time</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.adsId || "N/A"}</td> {/* Use `_id` for Ads ID */}
                    <td>{new Date(ad.createTime).toLocaleString() || "N/A"}</td> {/* Format `createdAt` to readable format */}
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No ads data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;

