

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MetaAdsDepositRecord.module.css";
import Auth from "../Services/Auth";

const MetaAdsDepositRecord = () => {
  const [depositsData, setDepositsData] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepositsData = async () => {
      setLoading(true);
      setError(null);
      
      const { token, username, typeOfUser } = Auth.getAuthData(); // Retrieve token & user data

      if (!token) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://admediaagency.online/kimi/get-Facebook-adDeposit",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", response.data);

        if (
          response.data.message === "Deposits details fetched successfully" &&
          Array.isArray(response.data.deposits)
        ) {
          const deposits = response.data.deposits.map((deposit) => ({
            applyId: deposit.applyId,
            adsId: deposit.adsId,
            chargeMoney: `$${deposit.money}`,
            totalCost: `$${deposit.totalCost}`,
            state: deposit.state,
            createTime: new Date(deposit.createdAt).toLocaleString(),
          }));
          setDepositsData(deposits);
        } else {
          setError("Failed to fetch deposit data.");
        }
      } catch (err) {
        console.error("Error fetching deposit data:", err.message);
        setError("An error occurred while fetching deposit data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepositsData();
  }, []);

  const handleExport = async () => {
    setError(null);
    const token = Auth.getToken();

    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    try {
      console.log("Fetching export file...");

      const response = await axios.get(
        "https://admediaagency.online/kimi/export-facebookad-deposit",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "facebookDepositList.xlsx");
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

      <button className={styles.button} onClick={handleExport} disabled={loading}>
        {loading ? "Loading..." : "Export Excel"}
      </button>

      <div className={styles.tableContainer}>
        {loading ? (
          <p className={styles.loading}>Loading deposit records...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apply ID</th>
                <th>Ads ID</th>
                <th>Charge Money</th>
                <th>Total Cost</th>
                <th>State</th>
                <th>Create Time</th>
              </tr>
            </thead>
            <tbody>
              {depositsData.length > 0 ? (
                depositsData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.applyId}</td>
                    <td>{row.adsId}</td>
                    <td>{row.chargeMoney}</td>
                    <td>{row.totalCost}</td>
                    {/* <td>{row.state}</td> */}
                     <td>
                     <span className={`${styles.state} ${styles[row.state.toLowerCase()]}`}>
                     {row.state || "N/A"}
                     </span>
                     </td>
                    <td>{row.createTime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No deposit data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MetaAdsDepositRecord;
