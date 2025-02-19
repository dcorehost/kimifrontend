
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./GoogleRefund.module.css";
import Auth from "../Services/Auth";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const GoogleRefund = () => {
  const [refundData, setRefundData] = useState([]);
  const [adsIds, setAdsIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [adAccount, setAdAccount] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefundData = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        toast.error("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "https://admediaagency.online/kimi/refund-Details?adType=Google",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (
          response.data.message === "Refund details fetched successfully" &&
          Array.isArray(response.data.refundsDetails)
        ) {
          setRefundData(response.data.refundsDetails);
        } else {
          toast.error("Failed to fetch refund details.");
        }
      } catch (err) {
        toast.error("An error occurred while fetching refund data.");
      }
    };

    const fetchAdsIds = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }

      try {
        const response = await axios.get(
          "https://admediaagency.online/kimi/get-ads-id?adType=Google",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAdsIds(response.data.adsIds);
      } catch (error) {
        toast.error("Failed to fetch ads IDs.");
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

    if (!adAccount || !amount) {
      toast.error("Please fill in both fields.");
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated. Please log in.");
      return;
    }

    const requestData = {
      adsId: adAccount.trim(),
      amount: parseFloat(amount),
      adType: "Google",
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
        toast.success("Refund applied successfully!");
        setAdAccount("");
        setAmount("");
        setRefundData([...refundData, response.data.refund]);
        setTimeout(() => toast.dismiss(), 3000); // Dismiss the toast after 3 seconds
      } else {
        toast.error(response.data.message || "Failed to apply refund.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred while applying the refund."
      );
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer /> {/* Adding ToastContainer for displaying notifications */}
      <button className={styles.button} onClick={handleModalOpen}>
        Apply Refund
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads Id</th>
              <th>Amount Applied</th>
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
                  <td>{refund.adGoogleAccount?.adsId || "N/A"}</td>
                  <td> ${refund.amount || "N/A"}</td>
                  <td> ${refund.remainMoney || "N/A"}</td>
                  {/* <td>{refund.applyState || "N/A"}</td> */}
                   <td>
                        <span className={`${styles.applyState} ${styles[refund.applyState.toLowerCase()]}`}>
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
                <label>Ad Google Account</label>
                <select
                  value={adAccount}
                  onChange={(e) => setAdAccount(e.target.value)}
                  required
                >
                  <option value="">Select Ads ID</option>
                  {adsIds.map((id, index) => (
                    <option key={index} value={id}>
                      {id}
                    </option>
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
                <button type="submit" className={styles.button}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleRefund;
