import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ApplyBingAd.module.css";

const ApplyBingAd = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/bing/accountManage/accountList/createbingads"); // Adjust the route as needed
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      const token = localStorage.getItem("userToken"); // Retrieve token from localStorage

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://admediaagency.online/kimi/get-bing-ads", {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
        });

        console.log("API Response:", response.data); // Log the full API response

        if (response.data.message === "bing ads fetched successfully" && Array.isArray(response.data.ads)) {
          const ads = response.data.ads.map((ad) => ({
            applyId: ad.applyId, // Apply ID
            adNumber: ad.adNum, // Ad Number
            state: ad.state, // State
            totalCost: ad.totalCost, // Total Cost
            createTime: ad.createdAt, // Create Time
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
                <th>Ad Number</th>
                <th>State</th>
                <th>Total Cost</th>
                <th>Create Time</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.applyId || "N/A"}</td> {/* Apply ID */}
                    <td>{ad.adNumber || "N/A"}</td> {/* Ad Number */}
                    <td>{ad.state || "N/A"}</td> {/* State */}
                    <td>{ad.totalCost || "N/A"}</td> {/* Total Cost */}
                    <td>{new Date(ad.createTime).toLocaleString() || "N/A"}</td> {/* Create Time */}
                    <td></td> {/* Empty "Operate" column */}
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

export default ApplyBingAd;
