import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ApplyGoogleAdsTable.module.css";

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
      const token = localStorage.getItem("userToken");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-google-ads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); // Debugging log

        if (response.data.message === "google ads fetched successfully" && Array.isArray(response.data.ads)) {
          const ads = response.data.ads.map((ad) => ({
            applyId: ad.applyId,
            adsNumber: ad.adNum,
            state: ad.state,
            totalCost: ad.adsDetails.reduce((acc, detail) => acc + detail.deposit, 0), 
            gmailList: ad.adsDetails.map(detail => detail.gmail).join(", "), 
            applyTime: ad.createdAt,
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
      <button className={styles.button} onClick={handleNextPage}>
        Create ad here
      </button>
      <div className={styles.tableContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apply ID</th>
                <th>Ads Number</th>
                <th>State</th>
                <th>Total Cost</th>
                <th>Apply Time</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.applyId || "N/A"}</td>
                    <td>{ad.adsNumber || "N/A"}</td>
                    <td>{ad.state || "N/A"}</td>
                    <td>{ad.totalCost}</td>
                    <td>{new Date(ad.applyTime).toLocaleString() || "N/A"}</td>
                    <td>
                      <button className={styles.button} onClick={() => handleOpenModal(ad)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No ads data available</td>
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
            <span className={styles.closeModal} onClick={handleCloseModal}>&#10005;</span> {/* Close button */}
            <h3>Ad Details</h3>
            <p><strong>Apply ID:</strong> {selectedAd.applyId}</p>
            <p><strong>Ads Number:</strong> {selectedAd.adsNumber}</p>
            <p><strong>State:</strong> {selectedAd.state}</p>
            <p><strong>Total Deposit Cost:</strong> {selectedAd.totalCost}</p> {/* Updated field */}
            <p><strong>Apply Time:</strong> {new Date(selectedAd.applyTime).toLocaleString()}</p>
            <p><strong>Gmails:</strong> {selectedAd.gmailList}</p> {/* List of Gmail addresses */}
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
