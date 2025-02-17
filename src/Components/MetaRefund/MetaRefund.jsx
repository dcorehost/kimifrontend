
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MetaRefund.module.css";
import Auth from "../Services/Auth"; // Import Auth module

const MetaRefund = () => {
  const [refundData, setRefundData] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adAccount, setAdAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefundData = async () => {
      const token = Auth.getToken(); // Use Auth to get token

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("https://admediaagency.online/kimi/refund-Details?adType=Facebook", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.message === "Refund details fetched successfully" && Array.isArray(response.data.refundsDetails)) {
          const formattedData = response.data.refundsDetails.map((refund) => ({
            applyId: refund.applyId,
            adsId: refund.adFacebookAccount?._id || "N/A",
            adsName: refund.adFacebookAccount?.ads.map(ad => ad.accountName).join(", ") || "N/A",
            refundReason: refund.refundReason,
            amount: refund.amount,
            remainMoney: refund.remainMoney,
            refundWithFee: refund.refundWithFee || "N/A",
            remarks: refund.adFacebookAccount?.remarks || "N/A",
            applyState: refund.applyState,
            createdTime: new Date(refund.createdAt).toLocaleString(),
          }));
          setRefundData(formattedData);
        } else {
          setError("Failed to fetch refund details.");
        }
      } catch (err) {
        setError("An error occurred while fetching refund data.");
      }
    };

    fetchRefundData();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setAdAccount("");
    setAmount("");
    setRefundReason("");
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!adAccount || !amount || !refundReason) {
      setError("Please fill in all fields.");
      return;
    }

    const token = Auth.getToken(); // Use Auth to get token

    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    const requestData = {
      adFacebookAccount: adAccount.trim(),
      amount: parseFloat(amount),
      adType: "Facebook",
      refundReason: refundReason.trim(),
    };

    try {
      const response = await axios.post(
        "https://admediaagency.online/kimi/apply-refund",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Refund applied successfully.") {
        setShowModal(false);
        setSuccessMessage("Refund applied successfully!");
        setAdAccount("");
        setAmount("");
        setRefundReason("");
        setRefundData((prevData) => [...prevData, response.data.refund]);

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

      <button className={styles.button} onClick={handleModalOpen}>
        Apply Refund
      </button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Apply for Refund</h2>
            <form onSubmit={handleRefundSubmit}>
              <div className={styles.inputContainer}>
                <label>Ad Account ID:</label>
                <input type="text" value={adAccount} onChange={(e) => setAdAccount(e.target.value)} required />
              </div>

              <div className={styles.inputContainer}>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>

              <div className={styles.inputContainer}>
                <label>Refund Reason:</label>
                <textarea value={refundReason} onChange={(e) => setRefundReason(e.target.value)} required />
              </div>

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>Submit</button>
                <button type="button" onClick={handleModalClose} className={styles.closeButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads ID</th>
              <th>Ads Name</th>
              <th>Refund Reason</th>
              <th>Apply Money</th>
              <th>Remaining Money</th>
              <th>Refund With Fee</th>
              <th>Remarks</th>
              <th>Apply State</th>
              <th>Created Time</th>
            </tr>
          </thead>
          <tbody>
            {refundData.length > 0 ? (
              refundData.map((refund, index) => (
                <tr key={index}>
                  <td>{refund.applyId || "N/A"}</td>
                  <td>{refund.adsId || "N/A"}</td>
                  <td>{refund.adsName || "N/A"}</td>
                  <td>{refund.refundReason || "N/A"}</td>
                  <td>{refund.amount || "N/A"}</td>
                  <td>{refund.remainMoney || "N/A"}</td>
                  <td>{refund.refundWithFee || "N/A"}</td>
                  <td>{refund.remarks || "N/A"}</td>
                  <td>{refund.applyState || "N/A"}</td>
                  <td>{refund.createdTime || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No refund details available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetaRefund;
