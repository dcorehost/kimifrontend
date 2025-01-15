import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateBingAds.module.css";

const CreateBingAds = () => {
  const navigate = useNavigate();
  const [adNum, setAdNum] = useState(1); // Track the number of ads
  const [adsData, setAdsData] = useState([]); // Track ad field inputs
  const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100
  const [responseMessage, setResponseMessage] = useState(""); // For API response messages
  const [loading, setLoading] = useState(false); // For loading state

  // Handle change in ad number
  const handleAdNumChange = (e) => {
    const number = parseInt(e.target.value) || 1; // Ensure a valid number
    setAdNum(number);

    // Adjust adsData array length based on adNum
    const newAdsData = [...adsData];
    while (newAdsData.length < number) {
      newAdsData.push({ domain: "", gmail: "", deposit: "" }); // Initialize default objects
    }
    while (newAdsData.length > number) {
      newAdsData.pop();
    }
    setAdsData(newAdsData);
  };

  // Handle field changes
  const handleFieldChange = (index, field, value) => {
    const updatedAdsData = [...adsData];
    if (!updatedAdsData[index]) {
      updatedAdsData[index] = { domain: "", gmail: "", deposit: "" }; // Ensure object exists
    }
    updatedAdsData[index][field] = value;
    setAdsData(updatedAdsData);
  };

  // Handle deposit change (dropdown)
  const handleDepositChange = (index, value) => {
    const numericValue = value ? parseFloat(value) : 0; // Convert value to number
    handleFieldChange(index, "deposit", numericValue);
  };

  // Calculate total deposit
  const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

  // Handle API call on form submission
  const handleSubmit = async () => {
    setLoading(true);
    const requestData = {
      adNum,
      adsDetails: adsData,
    };

    console.log("Request data to be sent:", requestData);

    try {
      const response = await axios.post(
        "http://13.127.161.242:8001/kimi/create-bing-ads",
        requestData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdlM2Q2OWU2ZGFkZDYwNjRkM2IzN2IiLCJwaG9uZSI6NDMyODcsImVtYWlsIjoiZGVlcGlrYWF3d3ExQGdtYWlsLmNvbSIsInR5cGVPZlVzZXIiOiJVc2VyIiwiaWF0IjoxNzM2OTMxNDAzLCJleHAiOjE3Mzk1MjM0MDN9.l_12LV-sM8BUuSFaVUp3uDnvuMviKQUnDthYywbFwAc`,
          },
        }
      );

      console.log("API Response:", response);
      if (response?.data) {
        setResponseMessage(response.data.message || "Ads created successfully.");
        setWalletAmount(parseFloat(response.data.wallet || walletAmount)); // Update wallet amount
      }
    } catch (error) {
      console.error("Error creating ads:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setResponseMessage(error.response.data?.message || "Failed to create ads.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setResponseMessage("No response from server. Please try again.");
      } else {
        console.error("Error setting up request:", error.message);
        setResponseMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };



  
  return (
    <div className={styles.container}>
      <h1>Create Bing Ads</h1>

      <div className={styles.inputGroup}>
        <label htmlFor="adNum">Ad Number:</label>
        <select
          id="adNum"
          value={adNum}
          onChange={handleAdNumChange}
          className={styles.input}
        >
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      {[...Array(adNum)].map((_, index) => (
        <div key={index} className={styles.adFields}>
          <h3>Ad {index + 1}</h3>

          <div className={styles.fieldRow}>
            <div className={styles.fieldContainer}>
              <label htmlFor={`domain-${index}`}>Domain:</label>
              <input
                type="text"
                id={`domain-${index}`}
                value={adsData[index]?.domain || ""}
                onChange={(e) => handleFieldChange(index, "domain", e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.fieldContainer}>
              <label htmlFor={`gmail-${index}`}>Outlook Mail:</label>
              <input
                type="email"
                id={`gmail-${index}`}
                value={adsData[index]?.gmail || ""}
                onChange={(e) => handleFieldChange(index, "gmail", e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.fieldContainer}>
              <label htmlFor={`deposit-${index}`}>Ads Deposit:</label>
              <select
                id={`deposit-${index}`}
                value={adsData[index]?.deposit || ""}
                onChange={(e) => handleDepositChange(index, e.target.value)}
                className={styles.input}
              >
                <option value="">Select Deposit</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <strong>Total Deposit Of Ads:</strong> ${totalDeposit.toFixed(2)}
        </div>
        <div className={styles.summaryItem}>
          <strong>Wallet:</strong> ${walletAmount.toFixed(2)}
        </div>
      </div>

      {responseMessage && (
        <div className={styles.responseMessage}>
          <p>{responseMessage}</p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate(-1)}>
          Back
        </button>
        <button className={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CreateBingAds;
