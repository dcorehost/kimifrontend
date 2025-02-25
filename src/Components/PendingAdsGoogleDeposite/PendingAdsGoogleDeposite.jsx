import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./PendingAdsGoogleDeposite.module.css"; 
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth"; 

const PendingAdsGoogleDeposite = () => {
  const [depositsData, setDepositsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [remarks, setRejectReason] = useState("");

  useEffect(() => {
    fetchDepositsData();
  }, []);

  const fetchDepositsData = async () => {
    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get(
        "https://admediaagency.online/kimi/get-pending-google-adDeposit",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response.data.deposits) {
        setDepositsData(response.data.deposits);
      } else {
        setError("No pending deposits found.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch deposits.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  const handleSubmit = async (adsId, applyId, action) => {
    if (action === "approve" && !transactionId) {
      toast.error("Please enter a transaction ID.");
      return;
    }
    if (action === "reject" && !remarks) {
      toast.error("Please enter a reason for rejection.");
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const response = await Httpservices.put(
        `https://admediaagency.online/kimi/approve-deposit?adsId=${adsId}&adType=Google&action=${action}&applyId=${applyId}`,
        { transactionId, remarks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setDepositsData((prevDeposits) =>
          prevDeposits.map((deposit) =>
            deposit.applyId === applyId
              ? { ...deposit, state: action === "approve" ? "Completed" : "Rejected" }
              : deposit
          )
        );
        toast.success(response.data.message || `Deposit ${action}d successfully!`);
      } else {
        toast.error(response.data.message || "Failed to update deposit status.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating deposit status.");
    } finally {
      setSelectedDeposit(null);
      setTransactionId("");
      setRejectReason("");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Google Ads Deposits</h2>
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
              <th>Ads ID</th>
              <th>Username</th>
              <th>Email ID</th>
              <th>Money</th>
              <th>State</th>
              <th>Total Cost</th>
              <th>Created Time</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {depositsData.map((deposit) => (
              <tr key={deposit._id}>
                <td>{deposit.applyId}</td>
                <td>{deposit.adsId || "N/A"}</td>
                <td>{deposit.userId?.username || "N/A"}</td>
                <td>{deposit.userId?.contact?.emailId || "N/A"}</td>
                <td>${deposit.money}</td>
                <td>
                  <span className={`${styles.state} ${styles[deposit.state.toLowerCase()]}`}>
                    {deposit.state || "N/A"}
                  </span>
                </td>
                <td>${deposit.totalCost}</td>
                <td>{formatDate(deposit.createdAt)}</td>
                <td className={styles.operate}>
                  {selectedDeposit?.applyId === deposit.applyId ? (
                    <div>
                      {selectedDeposit.action === "approve" ? (
                        <input
                          type="text"
                          placeholder="Enter Transaction ID"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder="Enter Reason for Rejection"
                          value={remarks}
                          onChange={(e) => setRejectReason(e.target.value)}
                        />
                      )}
                      <button
                        className={styles.submitBtn}
                        onClick={() => handleSubmit(deposit.adsId, deposit.applyId, selectedDeposit.action)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className={styles.approveBtn}
                        onClick={() => setSelectedDeposit({ applyId: deposit.applyId, action: "approve" })}
                        disabled={deposit.state === "Completed"}
                      >
                        Approve
                      </button>
                      <button
                        className={styles.disapproveBtn}
                        onClick={() => setSelectedDeposit({ applyId: deposit.applyId, action: "reject" })}
                        disabled={deposit.state === "Rejected"}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending deposits available</p>
      )}
    </div>
  );
};

export default PendingAdsGoogleDeposite;