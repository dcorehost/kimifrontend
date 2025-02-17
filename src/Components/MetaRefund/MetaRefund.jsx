
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MetaRefund.module.css";

const FacebookRefund = () => {
  const [refundData, setRefundData] = useState([]);
  const [adsIds, setAdsIds] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adAccount, setAdAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefundData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }
      try {
        const response = await axios.get("https://admediaagency.online/kimi/refund-Details?adType=Facebook", {
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
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("User not authenticated.");
        return;
      }
      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-ads-id?adType=Facebook", {
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
    setRefundReason("");
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    if (!adAccount || !amount || !refundReason) {
      setError("Please fill in all fields.");
      return;
    }
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }
    const requestData = {
      adsId: adAccount.trim(),
      amount: parseFloat(amount),
      refundReason: refundReason.trim(),
      adType: "Facebook",
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
        setRefundReason("");
        setRefundData([...refundData, response.data.refund]);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.data.message || "Failed to apply refund.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while applying the refund.");
    }
  };

  return (
    <div className={styles.container}>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.button} onClick={() => setShowModal(true)}>
        Apply Refund
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads Id</th>
              <th>Amount Applied</th>
              <th>Refund Reason</th>
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
                  <td>{refund.adFacebookAccount?.adsId || "N/A"}</td>
                  <td>{refund.amount || "N/A"}</td>
                  <td>{refund.refundReason || "N/A"}</td>
                  <td>{refund.remainMoney || "N/A"}</td>
                  <td>{refund.applyState || "N/A"}</td>
                  <td>{new Date(refund.createdAt).toLocaleString() || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No refund details available</td>
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
              <label>Ad Facebook Account</label>
              <select value={adAccount} onChange={(e) => setAdAccount(e.target.value)} required>
                <option value="">Select Ads ID</option>
                {adsIds.map((id, index) => (
                  <option key={index} value={id}>{id}</option>
                ))}
              </select>
              <label>Amount</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              <label>Refund Reason</label>
              <textarea value={refundReason} onChange={(e) => setRefundReason(e.target.value)} required />
              <button type="submit">Submit</button>
              <button type="button" onClick={handleModalClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacebookRefund;