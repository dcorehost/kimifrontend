
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BingAdsDepositRecord.module.css";
import Auth from "../Services/Auth";

const BingAdsDepositRecord = () => {
  const [depositsData, setDepositsData] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepositsData = async () => {
      const token = Auth.getToken();

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-Bing-adDeposit", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.message === "Deposits details fetched successfully" && Array.isArray(response.data.deposits)) {
          const deposits = response.data.deposits.map((deposit) => ({
            applyId: deposit.applyId || "N/A",
            adsId: deposit.adsId || "N/A",
            chargeMoney: `$${deposit.money.toFixed(2)}`,
            totalCost: `$${deposit.totalCost.toFixed(2)}`,
            state: deposit.state || "Unknown",
            createTime: deposit.createdAt ? new Date(deposit.createdAt).toLocaleString() : "N/A",
            updateTime: deposit.updatedAt ? new Date(deposit.updatedAt).toLocaleString() : "N/A",
            username: deposit.userId?.username || "N/A",
            email: deposit.userId?.contact?.emailId || "N/A",
            wallet: `$${deposit.userId?.wallet?.toFixed(2)}` || "N/A",
            transactionId: deposit.transactionId || "N/A",
            remarks: deposit.remarks || "N/A",
          }));

          setDepositsData(deposits);
        } else {
          setError("Failed to fetch deposit data.");
        }
      } catch (err) {
        setError("An error occurred while fetching deposit data. Please try again later.");
      }
    };

    fetchDepositsData();
  }, []);

  const handleExport = async () => {
    const token = Auth.getToken();

    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.get("https://admediaagency.online/kimi/export-bingad-deposit", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bingDepositList.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccessMessage("✅ Excel file has been downloaded.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError("An error occurred while exporting data.");
    }
  };

  return (
    <div className={styles.container}>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} onClick={handleExport}>Export Excel</button>

      <div className={styles.tableContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apply ID</th>
                <th>Ads ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Charge Money</th>
                <th>Total Cost</th>
                <th>State</th>
                <th>Wallet</th>
                <th>Transaction ID</th>


                <th>Create Time</th>
                <th>Updated Time</th>
               
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {depositsData.length > 0 ? (
                depositsData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.applyId}</td>
                    <td>{row.adsId}</td>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.chargeMoney}</td>
                    <td>{row.totalCost}</td>
                    <td>
                      <span className={`${styles.state} ${styles[row.state.toLowerCase()]}`}>
                        {row.state || "N/A"}
                      </span>
                    </td>
                    <td>{row.wallet}</td>
                    <td>{row.transactionId}</td>


                    <td>{row.createTime}</td>
                    <td>{row.updateTime}</td>
                   
                    <td>{row.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">No deposit data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BingAdsDepositRecord;