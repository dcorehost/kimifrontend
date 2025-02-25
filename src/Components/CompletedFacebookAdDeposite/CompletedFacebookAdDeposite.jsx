import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CompletedFacebookAdDeposite.module.css"; 
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const CompletedFacebookAdDeposite = () => {
  const [depositsData, setDepositsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepositsData();
  }, []);

  const fetchDepositsData = async () => {
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get("https://admediaagency.online/kimi/get-complete-facebook-adDeposit", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.deposits) {
        setDepositsData(response.data.deposits);
      } else {
        setError("No completed deposits found.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch deposits.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : depositsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads Id</th>
              <th>Username</th>
              <th>Email ID</th>
              <th>TransactionId</th>
              <th>Money</th>
              <th>State</th>
              <th>Wallet Amount</th>
              <th>Total Cost</th>
              <th>Remarks</th>
              <th>Created Time</th>
              <th>Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {depositsData.map((deposit) => (
              <tr key={deposit.applyId}>
                <td>{deposit.applyId}</td>
                <td>{deposit.adsId}</td>
                <td>{deposit.userId?.username || "N/A"}</td>
                <td>{deposit.userId?.contact?.emailId || "N/A"}</td>
                <td>{deposit.transactionId}</td>
                <td>${deposit.money}</td>
                {/* <td>{deposit.state}</td> */}
                <td>
                        <span className={`${styles.state} ${styles[deposit.state.toLowerCase()]}`}>
                         {deposit.state || "N/A"}
                         </span>
                       </td>

                <td>${deposit.userId?.wallet}</td>
                <td>${deposit.totalCost}</td>
                <td>{deposit.remarks}</td>
                <td>{formatDate(deposit.createdAt)}</td>
                <td>{formatDate(deposit.updatedAt)}</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No completed deposits available</p>
      )}
    </div>
  );
};

export default CompletedFacebookAdDeposite;
