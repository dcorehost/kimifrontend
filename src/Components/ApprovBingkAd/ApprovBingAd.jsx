import React, { useEffect, useState } from "react";
import styles from "./ApprovBingAd.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovBingAd = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 

  
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
      console.log("Fetching Bing Ads...");
      const response = await Httpservices.get("/get-pending-bing-ads");

      console.log("Response:", response);
      console.log("Ads Data:", response.data.ads);

      if (response.data.message === "bing ads fetched successfully" && Array.isArray(response.data.ads)) {
        setAdsData(response.data.ads);
      } else {
        setError("Failed to fetch Bing ads data.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (isoString) => new Date(isoString).toLocaleString();

  
  const handleUpdateState = async (id, action) => {
    try {
      console.log(`Sending request to update status for Ad ID: ${id} to ${action}`);

      const response = await Httpservices.put(
        `/approve-bingAd?id=${id}&action=${action}`
      );

      console.log("Response from API:", response);

      if (response.data && response.data.message === "Failed to update status. Please try again.") {
        setAdsData((prevAds) =>
          prevAds.map((ad) =>
            ad._id === id ? { ...ad, state: action === "approve" ? "Approved" : "Rejected" } : ad
          )
        );

        
        setSuccessMessage(
          action === "approve" ? "Ad approved successfully!" : "Ad rejected successfully!"
        );

        setError(null); 
      } else {
        setError("Status updated successfully");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Error updating ad status:", error);

      if (error.response) {
        console.error("API Response Error:", error.response.data);
        setError(`Error: ${error.response.data.message || "Failed to update status."}`);
      } else {
        console.error("Error message:", error.message);
        setError(`Error: ${error.message || "Failed to update status."}`);
      }

      setSuccessMessage(null);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Bing Ads Management</h2>

      {loading ? (
        <p>Loading ads...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p> 
      ) : successMessage ? (
        <p className={styles.success}>{successMessage}</p> 
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
              <th>Operate</th>
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
                    "No Details"
                  )}
                </td>
                <td>{ad.applyId}</td>
                <td>{ad.state}</td>
                <td>${ad.totalCost}</td>
                <td>${ad.totalDeposit}</td>
                <td>{ad.userId}</td>
                <td>{formatDate(ad.createdAt)}</td>
                <td>{formatDate(ad.updatedAt)}</td>
                <td className={styles.operate}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateState(ad._id, "approve")} 
                    disabled={ad.state === "Approved"}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleUpdateState(ad._id, "reject")} 
                    disabled={ad.state === "Rejected"}
                  >
                    Disapprove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending Bing ads available</p>
      )}
    </div>
  );
};

export default ApprovBingAd;
