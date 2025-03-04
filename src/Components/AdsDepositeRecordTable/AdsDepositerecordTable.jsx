
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AdsDpositeRecordTable.module.css";
import Auth from "../Services/Auth"; 

const AdsDepositeRecordTable = () => {
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
        const response = await axios.get(
          "https://admediaagency.online/kimi/get-Google-adDeposit?adType=Google",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (
          response.data.message === "Deposits details fetched successfully" &&
          Array.isArray(response.data.deposits)
        ) {
          const deposits = response.data.deposits.map((deposit) => {
            return {
              applyId: deposit.applyId,
              adsId: deposit.adsId || "N/A",
              chargeMoney: `$${deposit.money}`,
              totalCost: `$${deposit.totalCost}`,
              state: deposit.state || "N/A",
              createTime: new Date(deposit.createdAt).toLocaleString(),
              updateTime: new Date(deposit.updatedAt).toLocaleString(),
              transactionId: deposit.transactionId || "N/A",
              remarks: deposit.remarks || "N/A",
              username: deposit.userId?.username || "N/A",
              email: deposit.userId?.contact?.emailId || "N/A",
              wallet: `$${deposit.userId?.wallet?.toFixed(2)}` || "N/A",
            };
          });
          setDepositsData(deposits);
        } else {
          setError("Failed to fetch deposit data.");
        }
      } catch (err) {
        console.error("Error fetching deposit data:", err.message);
        setError("An error occurred while fetching deposit data.");
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
      console.log("Fetching export file...");

      const response = await axios.get(
        "https://admediaagency.online/kimi/export-googlead-deposit",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "googleDepositList.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccessMessage("Excel file has been downloaded.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Export API failed:", err.response ? err.response.data : err.message);
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
                <th>Transaction ID</th>
                <th>Remarks</th>
                
                <th>Wallet Balance</th>
                <th>Create Time</th>
                <th>Updat Time</th>
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
                        {row.state}
                      </span>
                    </td>
                    <td>{row.transactionId}</td>
                    <td>{row.remarks}</td>
                  
                    <td>{row.wallet}</td>
                    <td>{row.createTime}</td>
                    <td>{row.updateTime}</td>
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

export default AdsDepositeRecordTable;
