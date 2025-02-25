
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
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [remarks, setRejectReason] = useState("");

  useEffect(() => {
    fetchRefundData();
  }, []);

  const fetchRefundData = async () => {
    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated. Please log in.");
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
      toast.error(err.response?.data?.message || "Failed to fetch refund data.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  const handleUpdateState = async (adsId, applyId, action, adType) => {
    if (!adsId || !applyId || !adType) {
      toast.error("Error: Missing Ads ID, Apply ID, or Ad Type.");
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      console.log(`Updating Ads ID: ${adsId}, Apply ID: ${applyId}, Action: ${action}, Ad Type: ${adType}`);

      const response = await Httpservices.put(
        `https://admediaagency.online/kimi/approve-refund-by-admin?adsId=${adsId}&adType=${adType}&applyId=${applyId}&action=${action}`,
        { transactionId, remarks },
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
            refund.applyId === applyId
              ? { ...refund, applyState: action === "approve" ? "Approved" : "Rejected" }
              : refund
          )
        );

        toast.success(response.data.message || `Refund ${action}d successfully!`);
      } else {
        toast.error(response.data.message || "Failed to update refund status.");
      }
    } catch (error) {
      console.error(`Error updating status for ${applyId}:`, error.response || error.message);
      toast.error(error.response?.data?.message || "Error updating refund status.");
    } finally {
      setSelectedRefund(null);
      setTransactionId("");
      setRejectReason("");
    }
  };

  const handleApproveClick = (applyId) => {
    setSelectedRefund({ applyId, action: "approve" });
  };

  const handleRejectClick = (applyId) => {
    setSelectedRefund({ applyId, action: "reject" });
  };

  const handleSubmit = (adsId, applyId, action, adType) => {
    if (action === "approve" && !transactionId) {
      toast.error("Please enter a transaction ID.");
      return;
    }
    if (action === "reject" && !remarks) {
      toast.error("Please enter a reason for rejection.");
      return;
    }
    handleUpdateState(adsId, applyId, action, adType);
  };

  return (
    <div className={styles.container}>
      <h2>Pending Refund</h2>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : refunds.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Ads ID</th>
              <th>Ad Type</th>
              <th>Amount</th>
              <th>Remaining Balance</th>
              <th>State</th>
              <th>Wallet Amount</th>
              <th>Created Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund) => {
              const adsId =
                refund.adBingAccount?.adsId ||
                refund.adGoogleAccount?.adsId ||
                (refund.adFacebookAccount?.ads &&
                  refund.adFacebookAccount.ads.length > 0
                  ? refund.adFacebookAccount.ads.map(ad => ad.adsId).join(", ")
                  : "N/A");

              const accountId =
                refund.adBingAccount?._id ||
                refund.adGoogleAccount?._id ||
                refund.adFacebookAccount?._id ||
                "N/A";

              const adType = refund.adType || "N/A";

              const username = refund.userId?.username || "N/A";
              const emailId = refund.userId?.contact?.emailId || "N/A";

              return (
                <tr key={refund.applyId}>
                  <td>{refund.applyId}</td>
                  <td>{username}</td>
                  <td>{emailId}</td>
                  <td>{adsId}</td>
                  <td>{adType}</td>
                  <td>${refund.amount}</td>
                  <td>${refund.remainMoney}</td>
                  <td>
                    <span className={`${styles.state} ${styles[refund.applyState.toLowerCase()]}`}>
                      {refund.applyState || "N/A"}
                    </span>
                  </td>
                  <td>${refund.userId?.wallet}</td>

                  <td>{formatDate(refund.createdAt)}</td>
                  <td className={styles.operate}>
                    {selectedRefund?.applyId === refund.applyId && selectedRefund.action === "approve" ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Transaction ID"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                        <button
                          className={styles.submitBtn}
                          onClick={() => handleSubmit(adsId, refund.applyId, "approve", adType)}
                        >
                          Submit
                        </button>
                      </div>
                    ) : selectedRefund?.applyId === refund.applyId && selectedRefund.action === "reject" ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Reason for Rejection"
                          value={remarks}
                          onChange={(e) => setRejectReason(e.target.value)}
                        />
                        <button
                          className={styles.submitBtn}
                          onClick={() => handleSubmit(adsId, refund.applyId, "reject", adType)}
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className={styles.approveBtn}
                          onClick={() => handleApproveClick(refund.applyId)}
                          disabled={refund.applyState === "Approved"}
                        >
                          Approve
                        </button>
                        <button
                          className={styles.disapproveBtn}
                          onClick={() => handleRejectClick(refund.applyId)}
                          disabled={refund.applyState === "Rejected"}
                        >
                          Disapprove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No pending refunds available</p>
      )}
    </div>
  );
};

export default PendingRefund;
