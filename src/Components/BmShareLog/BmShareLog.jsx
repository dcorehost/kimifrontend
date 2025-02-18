
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BmShareLog.module.css";
import Auth from "../Services/Auth"; 

const BmShareLog = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdsData = async () => {
      const token = Auth.getToken();

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-facebook-ads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        if (response.data.message === "facebook ads fetched successfully" && Array.isArray(response.data.ads)) {
          const ads = response.data.ads.map((ad) => ({
            applyId: ad.applyId,
            adsId: ad.adsId || "N/A",
            licenseMode: ad.licenseMode || "N/A",
            licenseName: ad.licenseName || "N/A",
            state: ad.state || "N/A",
            createdAt: new Date(ad.createdAt).toLocaleString(),
            remarks: ad.remarks || "N/A",
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
      <div className={styles.tableContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apply ID</th>
                <th>Ads ID</th>
                <th>License Mode</th>
                <th>License Name</th>
                <th>State</th>
                <th>Create Time</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.applyId}</td>
                    <td>{ad.adsId}</td>
                    <td>{ad.licenseMode}</td>
                    <td>{ad.licenseName}</td>
                    <td>{ad.state}</td>
                    <td>{ad.createdAt}</td>
                    <td>{ad.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No ads data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BmShareLog;
