



import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import styles from "./PendingRefund.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const PendingRefund = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRefundData();
  }, []);

  const fetchRefundData = async () => {
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get(
        "https://admediaagency.online/kimi/refund-Details-for-admin",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.refundsDetails) {
        setRefunds(response.data.refundsDetails);
      } else {
        setError("No refund details available.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch refund data.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  const handleUpdateState = async (applyId, adType, action) => {
    if (!applyId || !adType) {
      setError("Error: Missing required parameters.");
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    try {
      console.log(`Updating Refund ID: ${applyId}, Action: ${action}`);

      const response = await Httpservices.put(
        `https://admediaagency.online/kimi/approve-refund-by-admin?id=${applyId}&adType=${adType}&action=${action}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Response:", response.data);

      if (response.status === 200) {
        setRefunds((prevRefunds) =>
          prevRefunds.map((refund) =>
            refund.applyId === applyId ? { ...refund, applyState: action } : refund
          )
        );

        toast.success(`Refund ${action}d successfully!`);
      } else {
        setError(response.data.message || "Failed to update refund status.");
      }
    } catch (error) {
      console.error(`Error updating status for ${applyId}:`, error.response || error.message);
      setError(error.response?.data?.message || "Error updating refund status.");
      toast.error("Failed to update refund status.");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} /> 
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : refunds.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Refund ID</th>
              <th>Amount</th>
              <th>Remaining Balance</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Created Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund) => (
              <tr key={refund.applyId}>
                <td>{refund.applyId}</td>
                <td>${refund.amount}</td>
                <td>${refund.remainMoney}</td>
                <td>{refund.applyState}</td>
                <td>{refund.refundReason || "N/A"}</td>
                <td>{formatDate(refund.createdAt)}</td>
                <td className={styles.operate}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateState(refund.applyId, "Google", "approve")}
                    disabled={refund.applyState === "Completed"}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleUpdateState(refund.applyId, "Google", "reject")}
                    disabled={refund.applyState === "reject"}
                  >
                    Disapprove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending refunds available</p>
      )}
    </div>
  );
};

export default PendingRefund;
