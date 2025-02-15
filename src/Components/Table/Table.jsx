import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Table.module.css";

const Table = () => {
  const [adsData, setAdsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [shareMessage, setShareMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const adsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdsData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching ads data..."); // Debugging: Log when API call starts
        const response = await axios.get("https://admediaagency.online/kimi/get-google-ads", {
          params: {
            page: currentPage,
            limit: adsPerPage,
          },
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2EwYjBmYmIwODBmNjg0OTk0YTNlYWQiLCJlbWFpbCI6InN1cmplZXQxQGdtYWlsLmNvbSIsInR5cGVPZlVzZXIiOiJVc2VyIiwiaWF0IjoxNzM5MzQ5NTM2LCJleHAiOjE3NDE5NDE1MzZ9.mUWL8HHu6nwE63XuH0xt5HcXjxZGCNiQU4Y2oORbD4I`,
          },
        });

        console.log("API Response:", response.data); // Debugging: Log the API response

        if (response.data && response.data.message === "google ads fetched successfully" && Array.isArray(response.data.ads)) {
          setAdsData(
            response.data.ads.map((ad) => ({
              adsId: ad._id,
              createTime: ad.createdAt,
            }))
          );
          // If the API does not provide totalAds, calculate it based on the ads array length
          setTotalAds(response.data.ads.length || 0);
        } else {
          setError("Invalid response format or no ads found.");
        }
      } catch (err) {
        console.error("Error fetching ads data:", err);
        setError("An error occurred while fetching ads data.");
      } finally {
        console.log("API call completed, setting loading to false."); // Debugging: Log when API call completes
        setLoading(false);
      }
    };

    fetchAdsData();
  }, [currentPage]);

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
    setShareMessage("");
  };

  const handleShareConfirm = async () => {
    if (!shareMessage.trim()) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    try {
      const response = await axios.post("https://admediaagency.online/kimi/send-request-email", {
        emailId: shareMessage,
      });

      if (response.status === 200) {
        alert("Email request sent successfully!");
      } else {
        alert("Failed to send email request.");
      }
    } catch (error) {
      console.error("Error sending email request:", error);
      alert("An error occurred while sending the email.");
    }

    handleCloseModal();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalAds / adsPerPage);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleNextPage}>
        Create ad here
      </button>

      <div className={styles.tableContainer}>
        {loading ? (
          <p className={styles.loading}>Loading ads...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : adsData.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ads ID</th>
                <th>Create Time</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.map((ad, index) => (
                <tr key={index}>
                  <td>{ad.adsId || "N/A"}</td>
                  <td>{new Date(ad.createTime).toLocaleString() || "N/A"}</td>
                  <td>
                    <button className={styles.shareButton} onClick={() => handleShare(ad.adsId)}>
                      Share
                    </button>
                    <Link to={`/google/finance/googleads-deposite`}>
                      <button className={styles.detailsButton}>Deposit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noData}>No ads data available</p>
        )}
      </div>

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
              <button className={styles.closeButton} onClick={handleCloseModal}>
                Close
              </button>
              <button className={styles.confirmButton} onClick={handleShareConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button className={styles.pageButton} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
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