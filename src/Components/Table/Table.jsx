import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // Import Link from react-router-dom
import axios from "axios";
import styles from "./Table.module.css";
import Auth from "../Services/Auth";

const Table = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [shareMessage, setShareMessage] = useState("");  // State to manage input field value
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/google/accountManage/accountList/creategoogleads");
  };

  const handleShare = (adId) => {
    console.log(`Share ad with ID: ${adId}`);
    setSelectedAdId(adId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdId(null);
    setShareMessage(""); // Reset input field
  };

  const handleShareConfirm = () => {
    console.log(`Ad ${selectedAdId} shared with message: "${shareMessage}"`);
    // Add your share logic here (e.g., API call to share the ad)
    handleCloseModal();
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      const token = Auth.getToken()

      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-google-ads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        if (response.data.message === "google ads fetched successfully" && Array.isArray(response.data.ads)) {
          const ads = response.data.ads.map((ad) => ({
            adsId: ad._id,
            createTime: ad.createdAt,
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
                <th>Ads ID</th>
                <th>Create Time</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => (
                  <tr key={index}>
                    <td>{ad.adsId || "N/A"}</td>
                    <td>{new Date(ad.createTime).toLocaleString() || "N/A"}</td>
                    <td>
                      <button className={styles.shareButton} onClick={() => handleShare(ad.adsId)}>
                        Share
                      </button>
                      <Link to={`/google/finance/googleads-deposite`}>
                        <button className={styles.detailsButton}>
                          Deposit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No ads data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for sharing */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Share</h3>
            {/* <p>Are you sure you want to share the ad with ID: {selectedAdId}?</p> */}
            <label htmlFor="shareMessage">Gmail:</label>
            <input
              type="text"
              id="shareMessage"
              placeholder="Please enter Gmail address"
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)} // Handle input change
              className={styles.modalInput}
            />
            <div className={styles.modalButtons}>
              <button className={styles.closeButton} onClick={handleCloseModal}>Close</button>
              <button className={styles.confirmButton} onClick={handleShareConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
