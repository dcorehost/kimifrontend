import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Auth from "../Services/Auth";
import styles from "./BingRefund.module.css";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const BingRefund = () => {
  const [refundData, setRefundData] = useState([]);
  const [adsIds, setAdsIds] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adAccount, setAdAccount] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefundData = async () => {
      const token = Auth.getToken();
      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }
      try {
        const response = await axios.get("https://admediaagency.online/kimi/refund-Details?adType=Bing", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.message === "Refund details fetched successfully" && Array.isArray(response.data.refundsDetails)) {
          setRefundData(response.data.refundsDetails);
        } else {
          setError("Failed to fetch refund details.");
        }
      } catch (err) {
        setError("An error occurred while fetching refund data.");
      }
    };

    const fetchAdsIds = async () => {
      const token = Auth.getToken();
      if (!token) {
        setError("User not authenticated.");
        return;
      }
      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-ads-id?adType=Bing", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdsIds(response.data.adsIds);
      } catch (error) {
        setError("Failed to fetch ads IDs.");
      }
    };

    fetchRefundData();
    fetchAdsIds();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setAdAccount("");
    setAmount("");
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    if (!adAccount || !amount) {
      setError("Please fill in both fields.");
      return;
    }
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }
    const requestData = {
      adsId: adAccount.trim(),
      amount: parseFloat(amount),
      adType: "Bing",
    };
    try {
      const response = await axios.post("https://admediaagency.online/kimi/apply-refund", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.message === "Refund applied successfully.") {
        setShowModal(false);
        setSuccessMessage("Refund applied successfully!");
        setAdAccount("");
        setAmount("");
        setRefundData([...refundData, response.data.refund]);
        setTimeout(() => setSuccessMessage(null), 3000);
        toast.success("Refund applied successfully!");
      } else {
        setError(response.data.message || "Failed to apply refund.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while applying the refund.");
      toast.error("An error occurred while applying the refund.");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer /> 
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} onClick={handleModalOpen}>Apply Refund</button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads Id</th>
              <th>Amount</th>
              <th>Remaining Money</th>
              <th>Apply State</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {refundData.length > 0 ? (
              refundData.map((refund, index) => (
                <tr key={index}>
                  <td>{refund.applyId || "N/A"}</td>
                  <td>{refund.adBingAccount?.adsId || "N/A"}</td>
                  <td>${refund.amount.toFixed(2) || "N/A"}</td> 
                  <td>${refund.remainMoney.toFixed(2) || "N/A"}</td> 
                  {/* <td>{refund.applyState || "N/A"}</td> */}
                   <td>
                   <span className={`${styles.state} ${styles[refund.applyState.toLowerCase()]}`}>
                   {refund.applyState || "N/A"}
                   </span>
                   </td>
                  <td>{new Date(refund.createdAt).toLocaleString() || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No refund details available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Apply Refund</h2>
            <form onSubmit={handleRefundSubmit}>
              <div className={styles.inputContainer}>
                <label>Ad Bing Account</label>
                <select value={adAccount} onChange={(e) => setAdAccount(e.target.value)} required>
                  <option value="">Select Ads ID</option>
                  {adsIds.map((id, index) => (
                    <option key={index} value={id}>{id}</option>
                  ))}
                </select>
              </div>
              <div className={styles.inputContainer}>
                <label>Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  required
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}>Submit</button>
                <button type="button" onClick={handleModalClose} className={styles.closeButton}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BingRefund;
