
import React, { useEffect, useState } from "react"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ApprovFacebookAd.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovFacebookAd = () => {
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
      toast.error("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get("/get-pending-facebook-ads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data.ads) {
        setAdsData(response.data.ads);
      } else {
        toast.error("No pending ads found.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  const handleUpdateState = async (id, action) => {
    if (!inputValue.trim()) {
      toast.error("Please enter required information.");
      return;
    }
    
    const payload = action === "approve" ? { adsId: inputValue } : { remarks: inputValue };
    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const response = await Httpservices.put(
        `/approve-facebookAd?id=${id}&action=${action}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.ad) {
        setAdsData((prevAds) =>
          prevAds.map((ad) =>
            ad._id === id ? { ...ad, state: response.data.ad.state } : ad
          )
        );
        toast.success(`Ad successfully ${action}d!`);
      } else {
        toast.error(response.data.message || "Failed to update ad status.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating ad status.");
    } finally {
      setSelectedAd(null);
      setInputValue("");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Facebook Ads</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>User</th>
              <th>Email</th>
              <th>License Mode</th>
              <th>License Name</th>
              <th>Pages</th>
              <th>Page URLs</th>
              <th>Domain Option</th>
              <th>Domains</th>
              <th>App URL</th>
              <th>App ID</th>
              <th>Ads (Accounts & Deposits)</th>
              <th>Remarks</th>
              <th>State</th>
              <th>Total Cost</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.applyId}</td>
                <td>{ad.userId?.username || "N/A"}</td>
                <td>{ad.userId?.contact?.emailId || "N/A"}</td>
                <td>{ad.licenseMode}</td>
                <td>{ad.licenseName}</td>
                <td>{ad.pageNum}</td>
                <td>{ad.pageUrls?.join(", ") || "N/A"}</td>
                <td>{ad.domainOption}</td>
                <td>{ad.domains?.join(", ") || "N/A"}</td>
                <td>
                  {ad.appUrl ? (
                    <a href={ad.appUrl} target="_blank" rel="noopener noreferrer">{ad.appUrl}</a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{ad.appId || "N/A"}</td>
                <td>
                  {ad.ads?.length > 0 ? (
                    <ul>
                      {ad.ads.map((adItem, index) => (
                        <li key={index}>
                          {adItem.accountName} - ${adItem.deposit}
                        </li>
                      ))}
                    </ul>
                  ) : "N/A"}
                </td>
                <td>{ad.remarks}</td>
                <td className={`${styles.state} ${styles[ad.state?.toLowerCase()]}`}>
                  {ad.state || "N/A"}
                </td>
                <td>${ad.totalCost}</td>
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
                      >
                        Approve
                      </button>
                      <button
                        className={styles.disapproveBtn}
                        onClick={() => setSelectedAd({ id: ad._id, action: "reject" })}
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

export default ApprovFacebookAd;
