
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";
// import Auth from "../Services/Auth";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1);
//   const [adsData, setAdsData] = useState([{ gmail: "", deposit: "" }]);
//   const [wallet, setWallet] = useState(0);
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [accountOpeningFee, setAccountOpeningFee] = useState(30); // Fixed fee
//   const [topUpFee, setTopUpFee] = useState(0); // 15% of total deposit
//   const [responseMessage, setResponseMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = Auth.getToken();

//   // Handle ad number change
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1;
//     setAdNum(number);
//     const newAdsData = [...adsData];

//     while (newAdsData.length < number) {
//       newAdsData.push({ gmail: "", deposit: "" });
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }

//     setAdsData(newAdsData);
//   };

//   // Handle field change
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     updatedAdsData[index] = { ...updatedAdsData[index], [field]: value };
//     setAdsData(updatedAdsData);

//     // Calculate total deposit
//     const depositTotal = updatedAdsData.reduce((sum, ad) => sum + (parseFloat(ad.deposit) || 0), 0);
//     setTotalDeposit(depositTotal);

//     // Calculate top-up fee (15% of total deposit)
//     const calculatedTopUpFee = depositTotal * 0.15;
//     setTopUpFee(calculatedTopUpFee);

//     // Calculate total cost
//     const calculatedTotalCost = depositTotal + accountOpeningFee + calculatedTopUpFee;
//     setTotalCost(calculatedTotalCost);
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     setLoading(true);

//     const requestData = {
//       adNum,
//       adsDetails: adsData.map((ad) => ({
//         gmail: ad.gmail,
//         deposit: parseFloat(ad.deposit) || 0, // Ensure deposit is a number
//       })),
//     };

//     // console.log("Sending request:", JSON.stringify(requestData, null, 2));

//     try {
//       const response = await axios.post(
//         "https://admediaagency.online/kimi/create-google-ads",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // console.log("API Response:", response.data);
//       setResponseMessage(response.data.message);

//       // Update wallet and fees from API response
//       const { accountOpeningFee, totalDeposit, topUpFee, totalCost, wallet } = response.data.data;
//       setAccountOpeningFee(parseFloat(accountOpeningFee));
//       setTotalDeposit(parseFloat(totalDeposit));
//       setTopUpFee(parseFloat(topUpFee));
//       setTotalCost(parseFloat(totalCost));
//       setWallet(parseFloat(wallet));
//     } catch (error) {
//       console.error("Error creating ads:", error);

//       if (error.response) {
//         console.error("Server Response Data:", error.response.data);
//         console.error("Status Code:", error.response.status);
//       }

//       setResponseMessage(error.response?.data?.message || "Failed to create ads. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch wallet balance on mount
//   useEffect(() => {
//     async function fetchWalletAmount() {
//       try {
//         const walletRequest = await axios.get(
//           "https://admediaagency.online/kimi/get-wallet-of-user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const { data } = walletRequest;
//         setWallet(parseFloat(data?.users?.wallet));
//       } catch (error) {
//         console.error("Error fetching wallet amount:", error);
//       }
//     }
//     fetchWalletAmount();
//   }, [token]);

//   return (
//     <div className={styles.container}>
//       <h1>Create Google Ads</h1>

//       {/* Ad Number Input */}
//       <div className={styles.inputGroup}>
//         <label htmlFor="adNum">Ad Number:</label>
//         <select id="adNum" value={adNum} onChange={handleAdNumChange} className={styles.input}>
//           {[...Array(10)].map((_, index) => (
//             <option key={index + 1} value={index + 1}>
//               {index + 1}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Ad Fields */}
//       {adsData.map((_, index) => (
//         <div key={index} className={styles.adFields}>
//           <h3>Ad {index + 1}</h3>
//           <div className={styles.fieldRow}>
//             <div className={styles.fieldContainer}>
//               <label htmlFor={`gmail-${index}`}>Gmail:</label>
//               <input
//                 type="email"
//                 id={`gmail-${index}`}
//                 value={adsData[index]?.gmail || ""}
//                 onChange={(e) => handleFieldChange(index, "gmail", e.target.value)}
//                 className={styles.input}
//               />
//             </div>
//             <div className={styles.fieldContainer}>
//               <label htmlFor={`deposit-${index}`}>Ads Deposit:</label>
//               <select
//                 id={`deposit-${index}`}
//                 value={adsData[index]?.deposit || ""}
//                 onChange={(e) => handleFieldChange(index, "deposit", e.target.value)}
//                 className={styles.input}
//               >
//                 <option value="">Select Deposit</option>
//                 {[0, 15, 30, 50, 100, 200, 500].map((amount) => (
//                   <option key={amount} value={amount}>{amount}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Wallet and Cost Information */}
//       <div className={styles.summary}>
//         <div className={styles.summaryItem}>
//           <strong>Account Opening Fee:</strong> <span>${accountOpeningFee.toFixed(2)}</span>
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Deposit:</strong> <span>${totalDeposit.toFixed(2)}</span>
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Top-Up Fee:</strong> <span>${topUpFee.toFixed(2)}</span>
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Cost:</strong> <span>${totalCost.toFixed(2)}</span>
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Wallet Balance:</strong> <span>${wallet.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Response Message */}
//       {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}

//       {/* Submit Button */}
//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)}>Back</button>
//         <button className={styles.button} onClick={handleSubmit} disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;






import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CreateGoogleAds.module.css";
import Auth from "../Services/Auth";

const CreateGoogleAds = () => {
  const navigate = useNavigate();
  const [adNum, setAdNum] = useState(1);
  const [adsData, setAdsData] = useState([{ gmail: "", deposit: "" }]);
  const [wallet, setWallet] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [accountOpeningFee, setAccountOpeningFee] = useState(30);
  const [topUpFee, setTopUpFee] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Auth.getToken();

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
    updatedAdsData[index] = { ...updatedAdsData[index], [field]: value };
    setAdsData(updatedAdsData);

    const depositTotal = updatedAdsData.reduce((sum, ad) => sum + (parseFloat(ad.deposit) || 0), 0);
    setTotalDeposit(depositTotal);

    const calculatedTopUpFee = depositTotal * 0.15;
    setTopUpFee(calculatedTopUpFee);

    const calculatedTotalCost = depositTotal + accountOpeningFee + calculatedTopUpFee;
    setTotalCost(calculatedTotalCost);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const requestData = {
      adNum,
      adsDetails: adsData.map((ad) => ({
        gmail: ad.gmail,
        deposit: parseFloat(ad.deposit) || 0,
      })),
    };

    try {
      const response = await axios.post(
        "https://admediaagency.online/kimi/create-google-ads",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponseMessage(response.data.message);

      const { accountOpeningFee, totalDeposit, topUpFee, totalCost, wallet } = response.data.data;
      setAccountOpeningFee(parseFloat(accountOpeningFee));
      setTotalDeposit(parseFloat(totalDeposit));
      setTopUpFee(parseFloat(topUpFee));
      setTotalCost(parseFloat(totalCost));
      setWallet(parseFloat(wallet));

      toast.success("Ads created successfully!");
    } catch (error) {
      console.error("Error creating ads:", error);

      if (error.response) {
        console.error("Server Response Data:", error.response.data);
        console.error("Status Code:", error.response.status);
      }

      const errorMessage = error.response?.data?.message || "Failed to create ads. Please try again.";
      setResponseMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchWalletAmount() {
      try {
        const walletRequest = await axios.get(
          "https://admediaagency.online/kimi/get-wallet-of-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = walletRequest;
        setWallet(parseFloat(data?.users?.wallet));
      } catch (error) {
        console.error("Error fetching wallet amount:", error);
      }
    }
    fetchWalletAmount();
  }, [token]);

  useEffect(() => {
    if (wallet < totalCost) {
      toast.warn("Your balance is low. Please add money.", {
        onClick: () => navigate("/google/add-money"),
        autoClose: false,
      });
    }
  }, [wallet, totalCost, navigate]);

  return (
    <div className={styles.container}>
      <h1>Create Google Ads</h1>
      <ToastContainer />    

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

      {adsData.map((_, index) => (
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
                onChange={(e) => handleFieldChange(index, "deposit", e.target.value)}
                className={styles.input}
              >
                <option value="">Select Deposit</option>
                {[0, 15, 30, 50, 100, 200, 500].map((amount) => (
                  <option key={amount} value={amount}>{amount}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
      
      {/* Wallet and Cost Information */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <strong>Account Opening Fee:</strong> <span>${accountOpeningFee.toFixed(2)}</span>
        </div>
        <div className={styles.summaryItem}>
          <strong>Total Deposit:</strong> <span>${totalDeposit.toFixed(2)}</span>
        </div>
        <div className={styles.summaryItem}>
          <strong>Top-Up Fee:</strong> <span>${topUpFee.toFixed(2)}</span>
        </div>
        <div className={styles.summaryItem}>
          <strong>Total Cost:</strong> <span>${totalCost.toFixed(2)}</span>
        </div>
        <div className={styles.summaryItem}>
          <strong>Wallet Balance:</strong> <span>${wallet.toFixed(2)}</span>
        </div>
      </div>


         {/* button section */}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate(-1)}>Back</button>
        <button className={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CreateGoogleAds;