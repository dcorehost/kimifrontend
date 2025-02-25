
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
  const [selectedAction, setSelectedAction] = useState(null);
  const [inputValue, setInputValue] = useState("");

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

      if (response.status === 200 && response.data.deposits) {
        setDepositsData(response.data.deposits);
      } else {
        setError("No pending deposits found.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch deposits.");
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (adsId, applyId, action) => {
    setSelectedAction({ adsId, applyId, action });
    setInputValue("");
  };

  const handleUpdateState = async () => {
    if (!selectedAction || !inputValue.trim()) {
      toast.error("Please enter a valid input.");
      return;
    }

    const { adsId, applyId, action } = selectedAction;
    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    const requestData = action === "approve" ? { transactionId: inputValue } : { remarks: inputValue };

    try {
      const response = await Httpservices.put(
        `https://admediaagency.online/kimi/approve-deposit?adsId=${adsId}&adType=Bing&action=${action}&applyId=${applyId}`,
        requestData,
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
            deposit.adsId === adsId && deposit.applyId === applyId
              ? { ...deposit, state: action === "approve" ? "Approved" : "Rejected" }
              : deposit
          )
        );
        setSelectedAction(null);
        toast.success(`Deposit ${action}d successfully!`);
      } else {
        toast.error(response.data.message || "Failed to update deposit status.");
      }
    } catch (error) {
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
              <th>Username</th>
              <th>Email</th>
              <th>Money</th>
              <th>State</th>
              <th>Wallet Amount</th>
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
                <td>${deposit.userId?.wallet}</td>

                <td>${deposit.totalCost}</td>
                <td>{new Date(deposit.createdAt).toLocaleString()}</td>
                <td className={styles.operate}>
                  {selectedAction?.adsId === deposit.adsId && selectedAction?.applyId === deposit.applyId ? (
                    <div>
                      <input
                        type="text"
                        placeholder={selectedAction.action === "approve" ? "Enter Transaction ID" : "Enter Remark"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <button onClick={handleUpdateState} className={styles.submitBtn}>Submit</button>
                    </div>
                  ) : (
                    <>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleActionClick(deposit.adsId, deposit.applyId, "approve")}
                        disabled={deposit.state === "Approved"}
                      >
                        Approve
                      </button>
                      <button
                        className={styles.disapproveBtn}
                        onClick={() => handleActionClick(deposit.adsId, deposit.applyId, "reject")}
                        disabled={deposit.state === "Rejected"}
                      >
                        Reject
                      </button>
                    </>
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

export default PendingAdsBingDeposite;
