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
      const response = await Httpservices.get("https://admediaagency.online/kimi/get-pending-bing-adDeposit", {
        headers: { Authorization: `Bearer ${token}` },
      });

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

  const handleUpdateState = async (id, action) => {
    if (!id) {
      setError("Error: Missing Deposit ID.");
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    try {
      console.log(`Updating Deposit ID: ${id}, Action: ${action}`);

      const response = await Httpservices.patch(
        `https://admediaagency.online/kimi/approve-bing-adDeposit?id=${id}&action=${action}`,
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
            deposit.applyId === id ? { ...deposit, state: action } : deposit
          )
        );

        toast.success(`Deposit ${action}d successfully!`);
      } else {
        setError(response.data.message || "Failed to update deposit status.");
      }
    } catch (error) {
      console.error(`Error updating status for ${id}:`, error.response || error.message);
      setError(error.response?.data?.message || "Error updating deposit status.");
      toast.error("Failed to update deposit status.");
    }
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
              {/* <th>Ads ID</th> */}
              <th>Money</th>
              <th>Status</th>
              <th>Total Cost</th>
              <th>Created Time</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {depositsData.map((deposit) => (
              <tr key={deposit.applyId}>
                <td>{deposit.applyId}</td>
                {/* <td>{deposit.adBingAccount.adsId}</td> */}
                <td>${deposit.money}</td>
                <td>{deposit.state}</td>
                <td>${deposit.totalCost}</td>
                <td>{formatDate(deposit.createdAt)}</td>
                <td className={styles.operate}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateState(deposit.applyId, "approve")}
                    disabled={deposit.state === "Approved"}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleUpdateState(deposit.applyId, "reject")}
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
