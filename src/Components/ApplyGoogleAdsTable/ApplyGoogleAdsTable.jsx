


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ApplyGoogleAdsTable.module.css";
import Auth from "../Services/Auth"; 

const ApplyGoogleAdsTable = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null); 
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/google/accountManage/accountList/creategoogleads");
  };

  const handleOpenModal = (ad) => {
    console.log("Opening modal for ad:", ad); 
    setSelectedAd(ad); 
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    console.log("Closing modal"); 
    setIsModalOpen(false); 
    setSelectedAd(null); 
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      const authData = Auth.getAuthData();
      const token = authData.token;

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-google-ads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.message === "google ads fetched successfully" && Array.isArray(response.data.ads)) {
          const ads = response.data.ads.map((ad) => ({
            applyId: ad.applyId,
            adsNumber: ad.adNum,
            state: ad.state,
            totalCost: ad.adsDetails.reduce((acc, detail) => acc + detail.deposit, 0), 
            gmailList: ad.adsDetails.map(detail => detail.gmail).join(", "), 
            // applyTime: ad.createdAt,
            adsId: ad.adsId || "N/A",
            username: ad.userId?.username || "N/A", 
            emailId: ad.userId?.contact?.emailId || "N/A", 
            createTime: ad.createdAt,
            UpdatedTime: ad.updatedAt,
            wallet: ad.userId?.wallet,

          }));
          setAdsData(ads);
        } else {
          setError("Failed to fetch ads data.");
        }
      } catch (err) {
        console.error("Error fetching ads data:", err.message);
        setError("An error occurred while fetching ads data.");
      }
    };

    fetchAdsData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
               <th>Apply ID</th>
               <th>Ads ID</th>
               <th>User Name</th>
               <th>Email</th>

                <th>Ads Number</th>
                <th>State</th>
                <th>Total Cost</th>
                <th>Wallet Amount</th>

                <th>Create Time</th>
                <th>Updated Time</th>
                <th>Applied Gmail</th>

                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index} className={`${styles.tableRow} ${styles[ad.state.toLowerCase()]}`}>
                    <td>{ad.applyId || "N/A"}</td>
                    <td>{ad.adsId || "N/A"}</td>
                    <td>{ad.username}</td>
                    <td>{ad.emailId}</td>

                    <td>{ad.adsNumber || "N/A"}</td>
                    <td>
                      <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                        {ad.state || "N/A"}
                      </span>
                    </td>
                    <td> ${ad.totalCost}</td>
                    <td>{ad.wallet ? `$${ad.wallet.toFixed(2)}` : "N/A"}</td>

                    <td>{new Date(ad.createTime).toLocaleString() || "N/A"}</td>
                    <td>{new Date(ad.UpdatedTime).toLocaleString() || "N/A"}</td>                 




                    <td>{ad.gmailList || "N/A"}</td>
                    <td>
                      <button className={styles.button} onClick={() => handleOpenModal(ad)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No ads data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for showing ad details */}
      {isModalOpen && selectedAd && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeModal} onClick={handleCloseModal}>&#10005;</span>
            <h3>Ad Details</h3>
            <p><strong>Apply ID:</strong> {selectedAd.applyId}</p>
            <p><strong>Ads ID:</strong> {selectedAd.adsId}</p>
            <p><strong>UserName:</strong> {selectedAd.username}</p>
            <p><strong>Email:</strong> {selectedAd.emailId}</p>
            <p><strong>Ads Number:</strong> {selectedAd.adsNumber}</p>
            <p><strong>State:</strong> {selectedAd.state}</p>
            <p><strong>Total Deposit Cost:</strong> $ {selectedAd.totalCost}</p>
            <p><strong>Total Deposit Cost:</strong> $ {selectedAd.wallet}</p>
            <p><strong>Create Time:</strong> {new Date(selectedAd.createTime).toLocaleString()}</p>
            <p><strong>Updated Time:</strong> {new Date(selectedAd.UpdatedTime).toLocaleString()}</p>
            <p><strong>Applied Gmail:</strong> {selectedAd.gmailList}</p>
            <div className={styles.modalButtons}>
              <button className={styles.closeButton} onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyGoogleAdsTable;



