
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
              <th>Apply ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>AdsId</th>
              <th>Ad Number</th>
              <th>Ads Details</th>
              <th>State</th>
              <th>Wallet Amount</th>
              <th>Total Cost</th>
              <th>Total Deposit</th>
              <th>Remarks</th>
              
              <th>Create Time</th>
              <th>Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.applyId}</td>
                <td>{ad.userId?.username || "N/A"}</td>
                <td>{ad.userId?.contact?.emailId || "N/A"}</td>
                <td>{ad.adsId}</td>
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
                <td>
                  <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                    {ad.state || "N/A"}
                  </span>
                </td>
                <td>${ad.userId ?. wallet}</td>
                <td>${ad.totalCost}</td>
                <td>${ad.totalDeposit}</td>
                <td>{ad.remarks}</td>

                {/* Show username and email ID in separate columns */}
                
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
