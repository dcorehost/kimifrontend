import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BingAccountList.module.css";
import Auth from "../Services/Auth";

const BingAccountList = () => {
  const [adsData, setAdsData] = useState([]); // Store ads data
  const [error, setError] = useState(null); // Store error if any
  const [selectedAd, setSelectedAd] = useState(null); // Store selected ad for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const navigate = useNavigate();
  const token = Auth.getToken(); // Get token for authentication

  const handleNextPage = () => {
    navigate("/bing/accountManage/accountList/createbingads"); 
  };

  // Fetch ads data from the API
  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        // Fetch the data from the API
        const response = await axios.get("https://admediaagency.online/kimi/get-bing-ads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); // Log the API response for debugging

        // Check if the response is valid and contains the expected data
        if (response.data.message === "Bing ads fetched successfully" && Array.isArray(response.data.ads)) {
          // Map through the ads data and store it in the state
          const ads = response.data.ads.map((ad) => ({
            adsId: ad.adsId,  // Use adsId from the API data
            adNumber: ad.adNum,
            state: ad.state,
            totalCost: ad.totalCost,
            applyTime: ad.createdAt,
            applyId: ad.applyId,
            adsDetails: ad.adsDetails,
          }));

          console.log("Updated Ads Data:", ads); // Log the ads data after mapping
          setAdsData(ads); // Update the state with the new data
        } else {
          setError("Failed to fetch ads data."); // Set error message if the data is invalid
        }
      } catch (err) {
        console.error("Error fetching ads data:", err.message); // Log error if request fails
        setError("An error occurred while fetching ads data.");
      }
    };

    fetchAdsData(); // Call the function to fetch ads data
  }, [token]); // Run the effect whenever the token changes

  // Handle detail button click to show modal
  const handleDetailClick = (ad) => {
    setSelectedAd(ad); 
    setIsModalOpen(true); 
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAd(null);
  };

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
                <th>Ad Number</th>
                <th>State</th>
                <th>Total Cost</th>
                <th>Apply Time</th>
                <th>Ads ID</th> 
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad, index) => {
                  console.log("Rendering Ad:", ad); 
                  return (
                    <tr key={ad.adsId}> 
                      <td>{ad.applyId || "N/A"}</td>
                      <td>{ad.adNumber || "N/A"}</td>
                      <td>{ad.state || "N/A"}</td>
                      <td>{ad.totalCost ? `$${ad.totalCost}` : "N/A"}</td>
                      <td>{new Date(ad.applyTime).toLocaleString() || "N/A"}</td>
                      <td>{ad.adsId || "N/A"}</td> 
                      <td>
                        <button
                          className={styles.detailButton}
                          onClick={() => handleDetailClick(ad)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">No ads data available</td> 
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for displaying ad details */}
      {isModalOpen && selectedAd && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Ad Details</h2>
            <div className={styles.modalContent}>
              <p><strong>Apply ID:</strong> {selectedAd.applyId}</p>
              <p><strong>Ad Number:</strong> {selectedAd.adNumber}</p>
              <p><strong>State:</strong> {selectedAd.state}</p>
              <p><strong>Total Cost:</strong> ${selectedAd.totalCost?.toFixed(2)}</p>
              <p><strong>Apply Time:</strong> {new Date(selectedAd.applyTime).toLocaleString()}</p>
              <p><strong>Ads ID:</strong> {selectedAd.adsId}</p> 
              <h3>Ad Details:</h3>
              {selectedAd.adsDetails && selectedAd.adsDetails.length > 0 ? (
                selectedAd.adsDetails.map((detail, index) => (
                  <div key={index} className={styles.adDetail}>
                    <p><strong>Domain:</strong> {detail.domain}</p>
                    <p><strong>Outlook Mail:</strong> {detail.outlookMail}</p>
                    <p><strong>Deposit:</strong> ${detail.deposit}</p>
                  </div>
                ))
              ) : (
                <p>No additional details available</p>
              )}
            </div>
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BingAccountList;


