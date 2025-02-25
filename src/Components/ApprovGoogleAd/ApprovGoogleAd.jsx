
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ApprovGoogleAd.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovGoogleAd = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchAdsData();
  }, []);

  const fetchAdsData = async () => {
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get("/get-pending-google-ads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data.ads) {
        setAdsData(response.data.ads);
      } else {
        setError("No pending ads found.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (id, action) => {
    setSelectedAction({ id, action });
    setInputValue("");
  };

  const handleUpdateState = async () => {
    if (!selectedAction || !inputValue.trim()) {
      toast.error("Please enter a valid input.");
      return;
    }

    const { id, action } = selectedAction;
    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    const requestData = action === "approve" ? { adsId: inputValue } : { remarks: inputValue };

    try {
      const response = await Httpservices.put(
        `/approve-googleAd?id=${id}&action=${action}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAdsData((prevAds) =>
          prevAds.map((ad) =>
            ad._id === id ? { ...ad, state: action === "approve" ? "Approved" : "Rejected" } : ad
          )
        );
        setSelectedAction(null);
        toast.success(`Ad ${action}d successfully!`);
      } else {
        toast.error("Failed to update ad status.");
      }
    } catch (error) {
      toast.error("Error updating ad status.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Google Ads</h2>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ApplyId</th>
              <th>UserName</th>
              <th>UserEmail</th>
              <th>Ad Number</th>
              <th>Applied Gmail</th>
              <th>State</th>
              <th>Wallet Amount</th>
              <th>Total Cost</th>
              <th>Account Open Fee</th>
              <th>Total Deposit</th>
              <th>Create Time</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.applyId}</td>
                <td>{ad.userId ? ad.userId.username : "N/A"}</td>
                <td>{ad.userId?.contact?.emailId || "N/A"}</td>
                <td>{ad.adNum}</td>
                <td>
                  {ad.adsDetails?.length > 0 ? ad.adsDetails.map((detail) => detail.gmail).join(", ") : "N/A"}
                </td>
                <td>
                  <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                    {ad.state || "N/A"}
                  </span>
                </td>
                <td>${ad.userId ?. wallet}</td>
                <td>${ad.totalCost}</td>
                <td>${ad.accountOpenFee}</td>
                <td>${ad.totalDeposit}</td>
                <td>{new Date(ad.createdAt).toLocaleString()}</td>
                <td className={styles.operate}>
                  {selectedAction?.id === ad._id ? (
                    <div>
                      <input
                        type="text"
                        placeholder={selectedAction.action === "approve" ? "Enter Ads ID" : "Enter Remark"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <button onClick={handleUpdateState} className={styles.submitBtn}>Submit</button>
                    </div>
                  ) : (
                    <>
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleActionClick(ad._id, "approve")}
                        disabled={ad.state === "Completed"}
                      >
                        Approve
                      </button>
                      <button
                        className={styles.disapproveBtn}
                        onClick={() => handleActionClick(ad._id, "reject")}
                        disabled={ad.state === "Reject"}
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
        <p>No pending ads available</p>
      )}
    </div>
  );
};

export default ApprovGoogleAd;
