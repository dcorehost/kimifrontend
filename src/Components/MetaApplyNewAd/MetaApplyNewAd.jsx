
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MetaApplyNewAd.module.css";
import Auth from "../Services/Auth"; 

const MetaApplyNewAd = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/facebook/accountManage/accountList");
  };

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
            pageNum: ad.pageNum || "N/A",
            pageUrls: ad.pageUrls.join(", ") || "N/A",
            domainOption: ad.domainOption || "N/A",
            domainNum: ad.domainNum || "N/A",
            domains: ad.domains.join(", ") || "N/A",
            appUrl: ad.appUrl || "N/A",
            appId: ad.appId || "N/A",
            adsAccounts: ad.ads.map((account) => `${account.accountName} (Deposit: ${account.deposit})`).join(", ") || "N/A",
            remarks: ad.remarks || "N/A",
            state: ad.state || "N/A",
            totalCost: ad.totalCost || "N/A",
            totalDeposit: ad.totalDeposit || "N/A",
            userEmail: ad.userId?.contact?.emailId || "N/A",
            username: ad.userId?.username || "N/A",
            createdAt: new Date(ad.createdAt).toLocaleString(),
            updatedAt: new Date(ad.updatedAt).toLocaleString(),
            wallet: ad.userId?.wallet,

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
                <th>User Name</th>
                <th>User Email</th>

                <th>License Mode</th>
                <th>License Name</th>
                <th>Page Number</th>
                <th>Page URLs</th>
                <th>Domain Option</th>
                <th>Domain Number</th>
                <th>Domains</th>
                <th>App URL</th>
                <th>App ID</th>
                <th>Ad Accounts</th>
                <th>Remarks</th>
                <th>State</th>
                <th>Wallet Amount</th>
                <th>Total Cost</th>
                <th>Total Deposit</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.applyId}</td>
                    <td>{ad.adsId}</td>
                    <td>{ad.username}</td>
                    <td>{ad.userEmail}</td>

                    <td>{ad.licenseMode}</td>
                    <td>{ad.licenseName}</td>
                    <td>{ad.pageNum}</td>
                    <td>{ad.pageUrls}</td>
                    <td>{ad.domainOption}</td>
                    <td>{ad.domainNum}</td>
                    <td>{ad.domains}</td>
                    <td>{ad.appUrl}</td>
                    <td>{ad.appId}</td>
                    <td>{ad.adsAccounts}</td>
                    <td>{ad.remarks}</td>
                     <td>
                     <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                     {ad.state || "N/A"}
                     </span>
                     </td>
                     <td>{ad.wallet ? `$${ad.wallet.toFixed(2)}` : "N/A"}</td>

                    <td>${ad.totalCost}</td>
                    <td>${ad.totalDeposit}</td>
                    <td>{ad.createdAt}</td>
                    <td>{ad.updatedAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="18">No ads data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MetaApplyNewAd;
