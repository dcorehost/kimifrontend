import React, { useEffect, useState } from "react";
import styles from "./ApprovedBingAds.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovedBingAds = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdsData();
  }, []);

  const fetchAdsData = async () => {
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching approved Bing ads...");
      const response = await Httpservices.get("https://admediaagency.online/kimi/get-approved-bing-ads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && Array.isArray(response.data.ads)) {
        setAdsData(response.data.ads);
      } else {
        setError("No approved Bing ads found.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch approved Bing ads.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  return (
    <div className={styles.container}>
      <h2>Approved Bing Ads</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ad ID</th>
              <th>Ad Number</th>
              <th>Ads Details</th>
              <th>Apply ID</th>
              <th>Status</th>
              <th>Total Cost</th>
              <th>Total Deposit</th>
              <th>User ID</th>
              <th>Create Time</th>
              <th>Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad._id}</td>
                <td>{ad.adNum}</td>
                <td>
                  {ad.adsDetails && ad.adsDetails.length > 0 ? (
                    <ul>
                      {ad.adsDetails.map((detail, index) => (
                        <li key={index}>
                          <strong>Domain:</strong> {detail.domain} <br />
                          <strong>Email:</strong> {detail.outlookMail} <br />
                          <strong>Deposit:</strong> ${detail.deposit}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{ad.applyId}</td>
                <td>{ad.state}</td>
                <td>${ad.totalCost}</td>
                <td>${ad.totalDeposit}</td>
                <td>{ad.userId}</td>
                <td>{formatDate(ad.createdAt)}</td>
                <td>{formatDate(ad.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved Bing ads available</p>
      )}
    </div>
  );
};

export default ApprovedBingAds;
