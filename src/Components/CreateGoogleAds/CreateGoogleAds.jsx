// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1); // Track the number of ads
//   const [adsData, setAdsData] = useState([]); // Track ad field inputs
//   const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100

 

//   // Handle change in ad number
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1; // Ensure a valid number
//     setAdNum(number);

//     // Adjust adsData array length based on adNum
//     const newAdsData = [...adsData];
//     while (newAdsData.length < number) {
//       newAdsData.push({  gmail: "", deposit: "" });
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }
//     setAdsData(newAdsData);
//   };

//   // Handle field changes
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   // Handle deposit change (dropdown)
//   const handleDepositChange = (index, value) => {
//     handleFieldChange(index, "deposit", value);
//   };

//   // Calculate total deposit
//   const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

//   // Calculate total cost (including one-time fee and 15% platform fee)
//   const oneTimeFee = 30;
//   const platformFeePercentage = 0.15;
//   const totalCost = oneTimeFee + totalDeposit + (totalDeposit * platformFeePercentage);

//   return (
//     <div className={styles.container}>
//       <h1>Create Google Ads</h1>

//       <div className={styles.inputGroup}>
//         <label htmlFor="adNum">Ad Number:</label>
//         <select
//           id="adNum"
//           value={adNum}
//           onChange={handleAdNumChange}
//           className={styles.input}
//         >
//           {[...Array(10)].map((_, index) => (
//             <option key={index + 1} value={index + 1}>
//               {index + 1}
//             </option>
//           ))}
//         </select>
//       </div>

//       {[...Array(adNum)].map((_, index) => (
//         <div key={index} className={styles.adFields}>
//           <h3>Ad {index + 1}</h3>
          
//           <div>
//             <label htmlFor={`gmail-${index}`}>Gmail:</label>
//             <input
//               type="email"
//               id={`gmail-${index}`}
//               value={adsData[index]?.gmail || ""}
//               onChange={(e) => handleFieldChange(index, "gmail", e.target.value)}
//               className={styles.input}
//             />
//           </div>
//           <div>
//             <label htmlFor={`deposit-${index}`}>Ads Deposit:</label>
//             <select
//               id={`deposit-${index}`}
//               value={adsData[index]?.deposit || ""}
//               onChange={(e) => handleDepositChange(index, e.target.value)}
//               className={styles.input}
//             >
//               <option value="">Select Deposit</option>
//               <option value="15">15</option>
//               <option value="30">30</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
//               <option value="200">200</option>
//               <option value="500">500</option>
//             </select>
//           </div>
//         </div>
//       ))}

//       <div className={styles.summary}>
//         <div className={styles.summaryItem}>
//           <strong>Total Deposit Of Ads:</strong> ${totalDeposit.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Wallet:</strong> ${walletAmount.toFixed(2)}
//         </div>
//       </div>

//       <div className={styles.buttonContainer}>
        
//         <button className={styles.button} onClick={() => navigate(-1)}>
//           Back
//         </button>
//         <button className={styles.button} onClick={() => alert("Paying...")}>
//           Pay
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1); // Track the number of ads
//   const [adsData, setAdsData] = useState([]); // Track ad field inputs
//   const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100

//   // Handle change in ad number
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1; // Ensure a valid number
//     setAdNum(number);

//     // Adjust adsData array length based on adNum
//     const newAdsData = [...adsData];
//     while (newAdsData.length < number) {
//       newAdsData.push({ gmail: "", deposit: "" });
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }
//     setAdsData(newAdsData);
//   };

//   // Handle field changes
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   // Handle deposit change (dropdown)
//   const handleDepositChange = (index, value) => {
//     handleFieldChange(index, "deposit", value);
//   };

//   // Calculate total deposit
//   const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

//   // Calculate total cost (including one-time fee and 15% platform fee)
//   const oneTimeFee = 30;
//   const platformFeePercentage = 0.15;
//   const totalCost = oneTimeFee + totalDeposit + (totalDeposit * platformFeePercentage);

//   return (
//     <div className={styles.container}>
//       <h1>Create Google Ads</h1>

//       <div className={styles.inputGroup}>
//         <label htmlFor="adNum">Ad Number:</label>
//         <select
//           id="adNum"
//           value={adNum}
//           onChange={handleAdNumChange}
//           className={styles.input}
//         >
//           {[...Array(10)].map((_, index) => (
//             <option key={index + 1} value={index + 1}>
//               {index + 1}
//             </option>
//           ))}
//         </select>
//       </div>

//       {[...Array(adNum)].map((_, index) => (
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
//                 onChange={(e) => handleDepositChange(index, e.target.value)}
//                 className={styles.input}
//               >
//                 <option value="">Select Deposit</option>
//                 <option value="15">15</option>
//                 <option value="30">30</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//                 <option value="200">200</option>
//                 <option value="500">500</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className={styles.summary}>
//         <div className={styles.summaryItem}>
//           <strong>Total Deposit Of Ads:</strong> ${totalDeposit.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Wallet:</strong> ${walletAmount.toFixed(2)}
//         </div>
//       </div>

//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)}>
//           Back
//         </button>
//         <button className={styles.button} onClick={() => alert("Paying...")}>
//           Pay
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;


//Api started 
import axios from "axios"; // Add this line

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGoogleAds.module.css";
import Httpservices from "../Services/Httpservices"; // Import the HTTP service

const CreateGoogleAds = () => {
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
      newAdsData.push({ gmail: "", deposit: "" });
    }
    while (newAdsData.length > number) {
      newAdsData.pop();
    }
    setAdsData(newAdsData);
  };

  // Handle field changes
  const handleFieldChange = (index, field, value) => {
    const updatedAdsData = [...adsData];
    updatedAdsData[index][field] = value;
    setAdsData(updatedAdsData);
  };

  // Handle deposit change (dropdown)
  const handleDepositChange = (index, value) => {
    handleFieldChange(index, "deposit", value);
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

    try {
      const response = await Httpservices.post("http://13.127.161.242:8001/kimi/create-google-ads", requestData);
      if (response?.data) {
        setResponseMessage(response.data.message);
        setWalletAmount(parseFloat(response.data.wallet)); // Update wallet amount
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
      } else {
        console.error("Error creating ads:", error);
        setResponseMessage("Failed to create ads. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Google Ads</h1>

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

export default CreateGoogleAds;











// //lastworking code 
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1); // Track the number of ads
//   const [adsData, setAdsData] = useState([]); // Track ad field inputs
//   const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100

//   // Handle change in ad number
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1; // Ensure a valid number
//     setAdNum(number);

//     // Adjust adsData array length based on adNum
//     const newAdsData = [...adsData];
//     while (newAdsData.length < number) {
//       newAdsData.push({ gmail: "", deposit: "" });
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }
//     setAdsData(newAdsData);
//   };

//   // Handle field changes
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   // Handle deposit change (dropdown)
//   const handleDepositChange = (index, value) => {
//     handleFieldChange(index, "deposit", value);
//   };

//   // Calculate total deposit
//   const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

//   // Calculate total cost (including one-time fee and 15% platform fee)
//   const oneTimeFee = 30;
//   const platformFeePercentage = 0.15;
//   const platformFee = totalDeposit * platformFeePercentage;
//   const totalCost = oneTimeFee + totalDeposit + platformFee;

//   return (
//     <div className={styles.container}>
//       <h1>Create Google Ads</h1>

//       <div className={styles.inputGroup}>
//         <label htmlFor="adNum">Ad Number:</label>
//         <select
//           id="adNum"
//           value={adNum}
//           onChange={handleAdNumChange}
//           className={styles.input}
//         >
//           {[...Array(10)].map((_, index) => (
//             <option key={index + 1} value={index + 1}>
//               {index + 1}
//             </option>
//           ))}
//         </select>
//       </div>

//       {[...Array(adNum)].map((_, index) => (
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
//                 onChange={(e) => handleDepositChange(index, e.target.value)}
//                 className={styles.input}
//               >
//                 <option value="">Select Deposit</option>
//                 <option value="15">15</option>
//                 <option value="30">30</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//                 <option value="200">200</option>
//                 <option value="500">500</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className={styles.summary}>
//         <div className={styles.summaryItem}>
//           <strong>Total Deposit Of Ads:</strong> ${totalDeposit.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>One-Time Fee:</strong> $30.00
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Platform Fee (15% of Deposit):</strong> ${platformFee.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Wallet:</strong> ${walletAmount.toFixed(2)}
//         </div>
//       </div>

//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)}>
//           Back
//         </button>
//         <button className={styles.button} onClick={() => alert("Paying...")}>
//           Pay
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;






// // error in api 
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";
// import Httpservices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1); // Track the number of ads
//   const [adsData, setAdsData] = useState([]); // Track ad field inputs
//   const [walletAmount, setWalletAmount] = useState(Auth.getAuthData()?.wallet || 0); // Wallet amount from Auth data
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   // Handle change in ad number
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1; // Ensure a valid number
//     setAdNum(number);

//     // Adjust adsData array length based on adNum
//     const newAdsData = [...adsData];
//     while (newAdsData.length < number) {
//       newAdsData.push({ gmail: "", deposit: "" });
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }
//     setAdsData(newAdsData);
//   };

//   // Handle field changes
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   // Handle deposit change (dropdown)
//   const handleDepositChange = (index, value) => {
//     handleFieldChange(index, "deposit", value);
//   };

//   // Calculate total deposit
//   const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

//   // Calculate total cost (including one-time fee and 15% platform fee)
//   const oneTimeFee = 30;
//   const platformFeePercentage = 0.15;
//   const platformFee = totalDeposit * platformFeePercentage;
//   const totalCost = oneTimeFee + totalDeposit + platformFee;

//   // Handle payment
//   const handlePay = async () => {
//     if (totalCost > walletAmount) {
//       alert("Insufficient wallet balance.");
//       return;
//     }

//     const token = Auth.getAuthData()?.token; // Retrieve token from Auth service

//     if (!token) {
//       alert("Authentication error. Please log in again.");
//       navigate("/login");
//       return;
//     }

//     const payload = {
//       adNum,
//       adsDetails: adsData.map(({ gmail, deposit }) => ({
//         gmail,
//         deposit: parseFloat(deposit),
//       })),
//     };

//     setIsLoading(true);

//     try {
//       const response = await Httpservices.post(
//         "http://13.127.161.242:8001/kimi/create-google-ads",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token in the request headers
//           },
//         }
//       );

//       if (response.status === 200) {
//         const { totalDeposit, totalCost: updatedTotalCost, wallet } = response.data;

//         alert(`Ads created successfully!\nTotal Deposit: ${totalDeposit}\nTotal Cost: ${updatedTotalCost}\nRemaining Wallet Balance: ${wallet}`);

//         // Update wallet amount
//         setWalletAmount(parseFloat(wallet));

//         // Update Auth data
//         const authData = Auth.getAuthData();
//         Auth.login({ ...authData, wallet: parseFloat(wallet) });

//         navigate("/success");
//       } else {
//         alert("Failed to create ads. Please try again.");
//       }
//     } catch (error) {
//       alert("An error occurred while creating ads. Please try again.");
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Create Google Ads</h1>

//       <div className={styles.inputGroup}>
//         <label htmlFor="adNum">Ad Number:</label>
//         <select
//           id="adNum"
//           value={adNum}
//           onChange={handleAdNumChange}
//           className={styles.input}
//         >
//           {[...Array(10)].map((_, index) => (
//             <option key={index + 1} value={index + 1}>
//               {index + 1}
//             </option>
//           ))}
//         </select>
//       </div>

//       {[...Array(adNum)].map((_, index) => (
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
//                 onChange={(e) => handleDepositChange(index, e.target.value)}
//                 className={styles.input}
//               >
//                 <option value="">Select Deposit</option>
//                 <option value="15">15</option>
//                 <option value="30">30</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//                 <option value="200">200</option>
//                 <option value="500">500</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className={styles.summary}>
//         <div className={styles.summaryItem}>
//           <strong>Total Deposit Of Ads:</strong> ${totalDeposit.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>One-Time Fee:</strong> $30.00
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Platform Fee (15% of Deposit):</strong> ${platformFee.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Wallet:</strong> ${walletAmount.toFixed(2)}
//         </div>
//       </div>

//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)} disabled={isLoading}>
//           Back
//         </button>
//         <button className={styles.button} onClick={handlePay} disabled={isLoading}>
//           {isLoading ? "Processing..." : "Pay"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;