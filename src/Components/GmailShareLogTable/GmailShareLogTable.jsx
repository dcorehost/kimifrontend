



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./GmailShareLogTable.module.css";

const GmailShareLogTable = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/next-page"); // Navigate to the next page, adjust the route as needed
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
            adsId: ad.adNum, // Ads ID (adNum)
            gmail: ad.adsDetails.map(detail => detail.gmail).join(", "), // Gmail from the adsDetails array
            state: ad.state, // State (e.g., "Shared", "Pending")
            createTime: ad.createdAt, // Create Time (createdAt)
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
        Create log here
      </button>
      <div className={styles.tableContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apply ID</th>
                <th>Ads ID</th>
                <th>Gmail</th>
                <th>State</th>
                <th>Create Time</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.applyId || "N/A"}</td> {/* Apply ID */}
                    <td>{ad.adsId || "N/A"}</td> {/* Ads ID */}
                    <td>{ad.gmail || "N/A"}</td> {/* Gmail */}
                    <td>{ad.state || "N/A"}</td> {/* State */}
                    <td>{new Date(ad.createTime).toLocaleString() || "N/A"}</td> {/* Create Time */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No ads data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GmailShareLogTable;
