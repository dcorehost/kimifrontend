
import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BingAccountList.module.css";
import Auth from "../Services/Auth";

const BingAccountList = () => {
  const [adsData, setAdsData] = useState([]); 
  const [error, setError] = useState(null); 
  const [selectedAd, setSelectedAd] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = Auth.getToken(); 

  const handleNextPage = () => {
    navigate("/bing/accountManage/accountList/createbingads"); 
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-bing-ads", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.message === "Bing ads fetched successfully" && Array.isArray(response.data.ads)) {
          const ads = response.data.ads.map((ad) => ({
            adsId: ad.adsId,  
            adNumber: ad.adNum,
            state: ad.state,
            totalCost: ad.totalCost,
            applyTime: ad.createdAt,
            applyId: ad.applyId,
            adsDetails: ad.adsDetails,
          }));
          setAdsData(ads); 
        } else {
          setError("Failed to fetch ads data."); 
        }
      } catch (err) {
        setError("An error occurred while fetching ads data.");
      }
    };

    fetchAdsData(); 
  }, [token]); 

  const handleDetailClick = (ad) => {
    setSelectedAd(ad); 
    setIsModalOpen(true); 
  };

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
                adsData.map((ad, index) => (
                  <tr key={ad.adsId}> 
                    <td>{ad.applyId || "N/A"}</td>
                    <td>{ad.adNumber || "N/A"}</td>
                    {/* <td>{ad.state || "N/A"}</td> */}
                     <td>
                      <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                      {ad.state || "N/A"}
                      </span>
                      </td>
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
                ))
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