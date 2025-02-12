
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import styles from "./ApprovedGoogleAds.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovedGoogleAds = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await Httpservices.get("/get-approved-google-ads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.ads) {
        setAdsData(response.data.ads);
      } else {
        setError("No pending ads found.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  const handleUpdateState = async (id, action) => {
    if (!id) {
      setError("Error: Missing Ad ID.");
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    try {
      console.log(`Updating Ad ID: ${id}, Action: ${action}`);

      const response = await Httpservices.put(
        `/approve-googleAd?id=${id}&action=${action}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Response:", response.data);

      if (response.status === 200 && response.data.googleAd) {
        setAdsData((prevAds) =>
          prevAds.map((ad) =>
            ad._id === id ? { ...ad, state: response.data.googleAd.state } : ad
          )
        );

        toast.success(`Ad ${action}d successfully!`);
      } else {
        setError(response.data.message || "Failed to update ad status.");
      }
    } catch (error) {
      console.error(`Error updating status for ${id}:`, error.response || error.message);
      setError(error.response?.data?.message || "Error updating ad status.");

      toast.error("Failed to update ad status.");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} /> 
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ad ID</th>
              <th>Ad Number</th>
              <th>Gmail</th>
              <th>Status</th>
              <th>Total Cost</th>
              <th>Account Open Fee</th>
              <th>User ID</th>
              <th>Total Deposit</th>
              <th>Create Time</th>
              <th>Updated Time</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad._id}</td>
                <td>{ad.adNum}</td>
                <td>
                  {ad.adsDetails?.length > 0 ? ad.adsDetails.map((detail) => detail.gmail).join(", ") : "N/A"}
                </td>
                <td>{ad.state}</td>
                <td>${ad.totalCost}</td>
                <td>${ad.accountOpenFee}</td>
                <td>{ad.userId}</td>
                <td>${ad.totalDeposit}</td>
                <td>{formatDate(ad.createdAt)}</td>
                <td>{formatDate(ad.updatedAt)}</td>
                <td className={styles.operate}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateState(ad._id, "approve")}
                    disabled={ad.state === "Completed"}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleUpdateState(ad._id, "disapprove")}
                    disabled={ad.state === "Disapproved"}
                  >
                    Disapprove
                  </button>
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

export default ApprovedGoogleAds;
