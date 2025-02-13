import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Table.module.css";
import Auth from "../Services/Auth";

const Table = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [shareMessage, setShareMessage] = useState("");  
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalAds, setTotalAds] = useState(0); // Track total number of ads
  const adsPerPage = 8; // Set ads per page
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/google/accountManage/accountList/creategoogleads");
  };

  const handleShare = (adId) => {
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
    handleCloseModal();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update current page
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      const token = Auth.getToken();

      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-google-ads", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: currentPage,
            limit: adsPerPage, // Pass pagination parameters
          },
        });

        if (response.data.message === "google ads fetched successfully" && Array.isArray(response.data.ads)) {
          setAdsData(response.data.ads.map(ad => ({
            adsId: ad._id,
            createTime: ad.createdAt,
          })));
          setTotalAds(response.data.totalAds || 0); // Set total number of ads
        } else {
          setError("Failed to fetch ads data.");
        }
      } catch (err) {
        console.error("Error fetching ads data:", err.message);
        setError("An error occurred while fetching ads data.");
      }
    };

    fetchAdsData();
  }, [currentPage]); // Trigger re-fetch when page changes

  const totalPages = Math.ceil(totalAds / adsPerPage); // Calculate total number of pages

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
            <label htmlFor="shareMessage">Gmail:</label>
            <input
              type="text"
              id="shareMessage"
              placeholder="Please enter Gmail address"
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)} 
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

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button className={styles.pageButton} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          <button
            key={page}
            className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className={styles.pageButton} onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
