
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ApplyBingAd.module.css";
import Auth from "../Services/Auth";

const ApplyBingAd = () => {
  const [adsData, setAdsData] = useState([]); 
  const [error, setError] = useState(null); 
  const [selectedAd, setSelectedAd] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const token = Auth.getToken(); 

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
            createTime: ad.createdAt,
            UpdatedTime: ad.updatedAt,
            applyId: ad.applyId,
            adsDetails: ad.adsDetails || [], 
            wallet: ad.userId?.wallet,
            username: ad.userId?.username || "N/A", 
            emailId: ad.userId?.contact?.emailId || "N/A", 
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
                <th>Ad Number</th>
                <th>Ads Details</th>
                <th>State</th>
                <th>Total Cost</th>
                <th>Wallet Amount</th>
                <th>Create Time</th>
                <th>Updated Time</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {adsData.length > 0 ? (
                adsData.map((ad) => {
                  return (
                   
                     <tr key={ad.adsId}> 
                     <td>{ad.applyId || "N/A"}</td>
                     <td>{ad.adsId || "N/A"}</td> 
                     <td>{ad.username}</td>
                     <td>{ad.emailId}</td>
                     <td>{ad.adNumber || "N/A"}</td>
                     <td>
                     {ad.adsDetails.length > 0 ? (
                      <ul>
                     {ad.adsDetails.map((detail, index) => (
                     <li key={index}>
                     {detail.domain && <span>Domain: {detail.domain}</span>} 
                     {detail.outlookMail && <span> | Outlook Mail: {detail.outlookMail}</span>}
                     {detail.deposit && <span> | Deposit: ${detail.deposit}</span>}
                     </li>
                     ))}
                     </ul>
                     ) : (
                     "No details available"
                     )}
                     </td>
                     <td>
                     <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                     {ad.state || "N/A"}
                     </span>
                     </td>
                     <td>{ad.totalCost ? `$${ad.totalCost}` : "N/A"}</td>
                      <td>{ad.wallet ? `$${ad.wallet.toFixed(2)}` : "N/A"}</td>
                      <td>{new Date(ad.createTime).toLocaleString() || "N/A"}</td>
                      <td>{new Date(ad.UpdatedTime).toLocaleString() || "N/A"}</td>
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
                  <td colSpan="9">No ads data available</td>
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
                  <p><strong>Ads ID:</strong> {selectedAd.adsId}</p> 
                  <p><strong>UserName:</strong> {selectedAd.username}</p>
                  <p><strong>Email:</strong> {selectedAd.emailId}</p>
                  
                  <p><strong>Ad Number:</strong> {selectedAd.adNumber}</p>
                  <p><strong>State:</strong> {selectedAd.state}</p>
                  <p><strong>Total Cost:</strong> ${selectedAd.totalCost?.toFixed(2)}</p>
                  <p><strong>Create Time:</strong> {new Date(selectedAd.createTime).toLocaleString()}</p>
                  <p><strong>Updated Time:</strong> {new Date(selectedAd.UpdatedTime).toLocaleString()}</p>
                  
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

export default ApplyBingAd;

