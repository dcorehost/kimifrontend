


import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./PendingAdsBingDeposite.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const PendingAdsBingDeposite = () => {
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
      const response = await Httpservices.get(
        "https://admediaagency.online/kimi/get-pending-bing-adDeposit",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.deposits) {
        setDepositsData(response.data.deposits);
      } else {
        setError("No pending deposits found.");
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

  const handleUpdateState = async (adsId, applyId, action) => {
    if (!adsId || !applyId) {
      toast.error("Error: Missing Ads ID or Apply ID.");
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      console.log(`Updating Ads ID: ${adsId}, Apply ID: ${applyId}, Action: ${action}`);

      const response = await Httpservices.put(
        `https://admediaagency.online/kimi/approve-deposit?adsId=${adsId}&adType=Bing&action=${action}&applyId=${applyId}`,
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
        setDepositsData((prevDeposits) =>
          prevDeposits.map((deposit) =>
            deposit.adsId === adsId && deposit.applyId === applyId
              ? { ...deposit, state: action === "approve" ? "Approved" : "Rejected" }
              : deposit
          )
        );

        toast.success(`Deposit ${action}d successfully!`);
      } else {
        toast.error(response.data.message || "Failed to update deposit status.");
      }
    } catch (error) {
      console.error(`Error updating status for ${adsId}:`, error.response || error.message);
      toast.error(error.response?.data?.message || "Error updating deposit status.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Bing Ads Deposits</h2>
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
              <th>Money</th>
              <th>Status</th>
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
                <td>${deposit.money}</td>
                <td>{deposit.state}</td>
                <td>${deposit.totalCost}</td>
                <td>{formatDate(deposit.createdAt)}</td>
                <td className={styles.operate}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateState(deposit.adsId, deposit.applyId, "approve")}
                    disabled={deposit.state === "Approved"}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleUpdateState(deposit.adsId, deposit.applyId, "reject")}
                    disabled={deposit.state === "Rejected"}
                  >
                    Reject
                  </button>
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

export default PendingAdsBingDeposite;
