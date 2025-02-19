



import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ApprovedFacebookAds.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovedFacebookAds = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdsData();
  }, []);

  const fetchAdsData = async () => {
    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get("/get-approved-facebook-ads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.ads) {
        setAdsData(response.data.ads);
      } else {
        toast.error("No approved ads found.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      toast.error(err.response?.data?.message || "Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  return (
    <div className={styles.container}>
      <h2>Approved Facebook Ads</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ad ID</th>
              <th>License Mode</th>
              <th>License Name</th>
              <th>Pages</th>
              <th>Page URLs</th>
              <th>Domain Option</th>
              <th>Domains</th>
              <th>App URL</th>
              <th>App ID</th>
              <th>Ads (Accounts & Deposits)</th>
              <th>Remarks</th>
              <th>Apply ID</th>
              <th>State</th>
              <th>Total Cost</th>
              <th>User ID</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad._id}</td>
                <td>{ad.licenseMode}</td>
                <td>{ad.licenseName}</td>
                <td>{ad.pageNum}</td>
                <td>{ad.pageUrls?.length > 0 ? ad.pageUrls.join(", ") : "N/A"}</td>
                <td>{ad.domainOption}</td>
                <td>{ad.domains?.length > 0 ? ad.domains.join(", ") : "N/A"}</td>
                <td><a href={ad.appUrl} target="_blank" rel="noopener noreferrer">{ad.appUrl}</a></td>
                <td>{ad.appId}</td>
                <td>
                  {ad.ads?.length > 0 ? (
                    <ul>
                      {ad.ads.map((adItem, index) => (
                        <li key={index}>
                          {adItem.accountName} - ${adItem.deposit}
                        </li>
                      ))}
                    </ul>
                  ) : "N/A"}
                </td>
                <td>{ad.remarks}</td>
                <td>{ad.applyId}</td>
                {/* <td>{ad.state}</td> */}
                  <td>
                                        <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                                         {ad.state || "N/A"}
                                         </span>
                                       </td>
                
                <td>${ad.totalCost}</td>
                <td>{ad.userId}</td>
                <td>{formatDate(ad.createdAt)}</td>
                <td>{formatDate(ad.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved ads available</p>
      )}
    </div>
  );
};

export default ApprovedFacebookAds;