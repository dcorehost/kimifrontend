
import React, { useEffect, useState } from "react";
import styles from "./ApprovBingAd.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApprovBingAd = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);
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
      const response = await Httpservices.get("/get-pending-bing-ads");
      if (response.data.message === "bing ads fetched successfully" && Array.isArray(response.data.ads)) {
        setAdsData(response.data.ads);
      } else {
        setError("Failed to fetch Bing ads data.");
      }
    } catch (err) {
      setError("Failed to fetch Bing ads data.");
      toast.error("Error fetching Bing ads.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => new Date(isoString).toLocaleString();

  const handleUpdateState = async (id, action) => {
    if (!inputValue.trim()) {
      toast.error("Please enter required information.");
      return;
    }
    
    const payload = action === "approve" ? { adsId: inputValue } : { remarks: inputValue };
    
    try {
      const response = await Httpservices.put(`/approve-bingAd?id=${id}&action=${action}`, payload);
      
      if (response.data.message === "Failed to update status. Please try again.") {
        toast.error("Failed to update ad status.");
      } else {
        setAdsData((prevAds) =>
          prevAds.map((ad) =>
            ad._id === id ? { ...ad, state: action === "approve" ? "Approved" : "Rejected" } : ad
          )
        );
        toast.success(`Ad ${action === "approve" ? "approved" : "rejected"} successfully!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update ad status.");
    } finally {
      setSelectedAd(null);
      setInputValue("");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Bing Ads</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <p>Loading ads...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Ad Number</th>
              <th>Ads Details</th>
              <th>State</th>
              <th>Wallet Amount</th>
              <th>Total Cost</th>
              <th>Total Deposit</th>
              <th>Create Time</th>
              <th>Updated Time</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.applyId}</td>
                <td>{ad.userId?.username || "N/A"}</td>
                <td>{ad.userId?.contact?.emailId || "N/A"}</td>
                <td>{ad.adNum}</td>
                <td>
                  {ad.adsDetails && ad.adsDetails.length > 0 ? (
                    <ul>
                      {ad.adsDetails.map((detail, index) => (
                        <li key={index}>
                          <strong>Domain:</strong> {detail.domain} <br />
                          <strong>Outlook Mail:</strong> {detail.outlookMail} <br />
                          <strong>Deposit:</strong> ${detail.deposit}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No Details"
                  )}
                </td>
                <td>
                  <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                    {ad.state || "N/A"}
                  </span>
                </td>
                <td>${ad.userId ?. wallet}</td>
                <td>${ad.totalCost}</td>
                <td>${ad.totalDeposit}</td>
                <td>{formatDate(ad.createdAt)}</td>
                <td>{formatDate(ad.updatedAt)}</td>
                <td className={styles.operate}>
                  {selectedAd?.id === ad._id ? (
                    <div>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={selectedAd.action === "approve" ? "Enter Ad ID" : "Enter remarks"}
                      />
                      <button onClick={() => handleUpdateState(ad._id, selectedAd.action)}>Submit</button>
                      <button onClick={() => setSelectedAd(null)}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <button
                        className={styles.approveBtn}
                        onClick={() => setSelectedAd({ id: ad._id, action: "approve" })}
                        disabled={ad.state === "Approved"}
                      >
                        Approve
                      </button>
                      <button
                        className={styles.disapproveBtn}
                        onClick={() => setSelectedAd({ id: ad._id, action: "reject" })}
                        disabled={ad.state === "Rejected"}
                      >
                        Disapprove
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending Bing ads available</p>
      )}
    </div>
  );
};

export default ApprovBingAd;
