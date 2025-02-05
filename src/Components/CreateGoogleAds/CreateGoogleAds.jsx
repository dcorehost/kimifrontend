


import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGoogleAds.module.css";

const CreateGoogleAds = () => {
  const navigate = useNavigate();
  const [adNum, setAdNum] = useState(1);
  const [adsData, setAdsData] = useState([]);
  const [walletAmount, setWalletAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [additionalAmount, setAdditionalAmount] = useState("");

  const handleAdNumChange = (e) => {
    const number = parseInt(e.target.value) || 1;
    setAdNum(number);
    const newAdsData = [...adsData];
    while (newAdsData.length < number) {
      newAdsData.push({ gmail: "", deposit: "" });
    }
    while (newAdsData.length > number) {
      newAdsData.pop();
    }
    setAdsData(newAdsData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedAdsData = [...adsData];
    if (!updatedAdsData[index]) {
      updatedAdsData[index] = { gmail: "", deposit: "" };
    }
    updatedAdsData[index][field] = value;
    setAdsData(updatedAdsData);
  };

  const handleDepositChange = (index, value) => {
    const numericValue = value ? parseFloat(value) : 0;
    handleFieldChange(index, "deposit", numericValue);
  };

  const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("userToken");

    if (!token) {
      setResponseMessage("Authentication error: No token found. Please log in again.");
      setLoading(false);
      return;
    }

    const requestData = {
      adNum,
      adsDetails: adsData,
    };

    try {
      const response = await axios.post(
        "https://admediaagency.online/kimi/create-google-ads",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Request data", response);
      if (response?.data) {
        setResponseMessage(response.data.message);
        setWalletAmount(parseFloat(response.data.wallet));
        setTotalCost(parseFloat(response.data.totalCost));
      }
    } catch (error) {
      console.error("Error creating ads:", error);
      setResponseMessage("Failed to create ads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAmount = () => {
    const updatedWallet = walletAmount + parseFloat(additionalAmount || 0);
    setWalletAmount(updatedWallet);
    setAdditionalAmount("");
  };

  return (
    <div className={styles.container}>
      <h1>Create Google Ads</h1>

      <div className={styles.inputGroup}>
        <label htmlFor="adNum">Ad Number:</label>
        <select id="adNum" value={adNum} onChange={handleAdNumChange} className={styles.input}>
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
              <label htmlFor={`gmail-${index}`}>Gmail:</label>
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
                {[15, 30, 50, 100, 200, 500].map((amount) => (
                  <option key={amount} value={amount}>{amount}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.summary}>
        <div className={styles.summaryItem}><strong>Total Deposit Of Ads:</strong> <span>${totalDeposit.toFixed(2)}</span></div>
        <div className={styles.summaryItem}><strong>Total Cost:</strong> <span>${totalCost.toFixed(2)}</span></div>
        <div className={styles.summaryItem}><strong>Wallet:</strong> <span>${walletAmount.toFixed(2)}</span></div>
      </div>

      {walletAmount < totalCost && (
        <div className={styles.addAmountSection}>
          <h3>Your wallet balance is insufficient</h3>
          <label htmlFor="addAmount">Add Amount:</label>
          <input
            type="number"
            id="addAmount"
            value={additionalAmount}
            onChange={(e) => setAdditionalAmount(e.target.value)}
            className={styles.input}
          />
          <button className={styles.button} onClick={handleAddAmount}>Add Amount</button>
        </div>
      )}

      {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate(-1)}>Back</button>
        <button className={styles.button} onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
      </div>
    </div>
  );
};

export default CreateGoogleAds;



