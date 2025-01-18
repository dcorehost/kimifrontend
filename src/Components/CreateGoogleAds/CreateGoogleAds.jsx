


// import axios from "axios"; // Add this line
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";
// import Httpservices from "../Services/Httpservices"; // Import the HTTP service
// import Auth from "../Services/Auth";
// import AddAmount from "./AddAmount"; // Assuming AddAmount is the component where the user can add payment.

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1); // Track the number of ads
//   const [adsData, setAdsData] = useState([]); // Track ad field inputs
//   const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100
//   const [totalCost, setTotalCost] = useState(0); // Total cost of ads from API
//   const [responseMessage, setResponseMessage] = useState(""); // For API response messages
//   const [loading, setLoading] = useState(false); // For loading state
//   const [additionalAmount, setAdditionalAmount] = useState(""); // To track the input for additional amount
//   const [showRechargeSection, setShowRechargeSection] = useState(false); // To track if recharge section should appear
//   const [showAddAmountComponent, setShowAddAmountComponent] = useState(false); // To control if AddAmount component is visible

//   // Handle change in ad number
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1; // Ensure a valid number
//     setAdNum(number);

//     // Adjust adsData array length based on adNum
//     const newAdsData = [...adsData];
//     while (newAdsData.length < number) {
//       newAdsData.push({ gmail: "", deposit: "" }); // Initialize default objects
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }
//     setAdsData(newAdsData);
//   };

//   // Handle field changes
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     if (!updatedAdsData[index]) {
//       updatedAdsData[index] = { gmail: "", deposit: "" }; // Ensure object exists
//     }
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   // Handle deposit change (dropdown)
//   const handleDepositChange = (index, value) => {
//     const numericValue = value ? parseFloat(value) : 0; // Convert value to number
//     const updatedAdsData = [...adsData];
//     if (!updatedAdsData[index]) {
//       updatedAdsData[index] = { gmail: "", deposit: "" }; // Ensure object exists
//     }
//     updatedAdsData[index]["deposit"] = numericValue;
//     setAdsData(updatedAdsData);

//     // Check if the selected deposit exceeds the wallet amount
//     if (numericValue > walletAmount) {
//       setShowRechargeSection(true);
//     } else {
//       setShowRechargeSection(false);
//     }
//   };

//   // Calculate total deposit
//   const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

//   // Handle API call on form submission
//   const handleSubmit = async () => {
//     setLoading(true);
//     const requestData = {
//       adNum,
//       adsDetails: adsData,
//     };

//     try {
//       const response = await axios.post(
//         "http://13.127.161.242:8001/kimi/create-google-ads",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer <your-token>`,
//           },
//         }
//       );
//       console.log("Request data", response);
//       if (response?.data) {
//         setResponseMessage(response.data.message);
//         setWalletAmount(parseFloat(response.data.wallet)); // Update wallet amount
//         setTotalCost(parseFloat(response.data.totalCost)); // Update total cost
//       }
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log("Request canceled");
//       } else {
//         console.error("Error creating ads:", error);
//         setResponseMessage("Failed to create ads. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // This function will be triggered by the link to show the AddAmount component
//   const handleShowAddAmountComponent = () => {
//     setShowAddAmountComponent(true);
//   };

//   // Close AddAmount component
//   const closeAddAmountComponent = () => {
//     setShowAddAmountComponent(false);
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
//           <strong>Total Deposit Of Ads:</strong> <span>${totalDeposit.toFixed(2)}</span>
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Cost:</strong> <span>${totalCost.toFixed(2)}</span>
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Wallet:</strong> <span>${walletAmount.toFixed(2)}</span>
//         </div>
//       </div>

//       {showRechargeSection && (
//         <div className={styles.addAmountSection}>
//           <h3>Your wallet balance is insufficient</h3>
//           <p>
//             <a href="#" onClick={handleShowAddAmountComponent}>
//               Add Amount
//             </a>
//           </p>
//         </div>
//       )}

//       {responseMessage && (
//         <div className={styles.responseMessage}>
//           <p>{responseMessage}</p>
//         </div>
//       )}

//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)}>
//           Back
//         </button>
//         <button className={styles.button} onClick={handleSubmit} disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>

//       {/* AddAmount Component Modal */}
//       {showAddAmountComponent && (
//         <AddAmount
//           walletAmount={walletAmount}
//           setWalletAmount={setWalletAmount}
//           closeAddAmountComponent={closeAddAmountComponent}
//         />
//       )}
//     </div>
//   );
// };

// export default CreateGoogleAds;


//working with add direct
import axios from "axios"; // Add this line
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGoogleAds.module.css";
import Httpservices from "../Services/Httpservices"; // Import the HTTP service
import Auth from "../Services/Auth";

const CreateGoogleAds = () => {
  const navigate = useNavigate();
  const [adNum, setAdNum] = useState(1); // Track the number of ads
  const [adsData, setAdsData] = useState([]); // Track ad field inputs
  const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100
  const [totalCost, setTotalCost] = useState(0); // Total cost of ads from API
  const [responseMessage, setResponseMessage] = useState(""); // For API response messages
  const [loading, setLoading] = useState(false); // For loading state
  const [additionalAmount, setAdditionalAmount] = useState(""); // To track the input for additional amount
  const [showRechargeSection, setShowRechargeSection] = useState(false); // To track if recharge section should appear

  // Handle change in ad number
  const handleAdNumChange = (e) => {
    const number = parseInt(e.target.value) || 1; // Ensure a valid number
    setAdNum(number);

    // Adjust adsData array length based on adNum
    const newAdsData = [...adsData];
    while (newAdsData.length < number) {
      newAdsData.push({ gmail: "", deposit: "" }); // Initialize default objects
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
      updatedAdsData[index] = { gmail: "", deposit: "" }; // Ensure object exists
    }
    updatedAdsData[index][field] = value;
    setAdsData(updatedAdsData);
  };

  // Handle deposit change (dropdown)
  const handleDepositChange = (index, value) => {
    const numericValue = value ? parseFloat(value) : 0; // Convert value to number
    const updatedAdsData = [...adsData];
    if (!updatedAdsData[index]) {
      updatedAdsData[index] = { gmail: "", deposit: "" }; // Ensure object exists
    }
    updatedAdsData[index]["deposit"] = numericValue;
    setAdsData(updatedAdsData);

    // Check if the selected deposit exceeds the wallet amount
    if (numericValue > walletAmount) {
      setShowRechargeSection(true);
    } else {
      setShowRechargeSection(false);
    }
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
      const response = await axios.post(
        "http://13.127.161.242:8001/kimi/create-google-ads",
        requestData,
        {
          headers: {
            Authorization: `Bearer <your-token>`,
          },
        }
      );
      console.log("Request data", response);
      if (response?.data) {
        setResponseMessage(response.data.message);
        setWalletAmount(parseFloat(response.data.wallet)); // Update wallet amount
        setTotalCost(parseFloat(response.data.totalCost)); // Update total cost
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

  const handleAddAmount = () => {
    const updatedWallet = walletAmount + parseFloat(additionalAmount || 0);
    setWalletAmount(updatedWallet);
    setAdditionalAmount(""); // Clear the input field
    setShowRechargeSection(false); // Hide the recharge section after adding amount
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
          <strong>Total Deposit Of Ads:</strong> <span>${totalDeposit.toFixed(2)}</span>
        </div>
        <div className={styles.summaryItem}>
          <strong>Total Cost:</strong> <span>${totalCost.toFixed(2)}</span>
        </div>
        <div className={styles.summaryItem}>
          <strong>Wallet:</strong> <span>${walletAmount.toFixed(2)}</span>
        </div>
      </div>

      {showRechargeSection && (
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
          <button className={styles.button} onClick={handleAddAmount}>
            Add Amount
          </button>
        </div>
      )}

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



// // working 
// import axios from "axios"; // Add this line
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";
// import Httpservices from "../Services/Httpservices"; // Import the HTTP service
// import Auth from "../Services/Auth";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1); // Track the number of ads
//   const [adsData, setAdsData] = useState([]); // Track ad field inputs
//   const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100
//   const [totalCost, setTotalCost] = useState(0); // Total cost of ads from API
//   const [responseMessage, setResponseMessage] = useState(""); // For API response messages
//   const [loading, setLoading] = useState(false); // For loading state
//   const [additionalAmount, setAdditionalAmount] = useState(""); // To track the input for additional amount

//   // Handle change in ad number
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1; // Ensure a valid number
//     setAdNum(number);

//     // Adjust adsData array length based on adNum
//     const newAdsData = [...adsData];
//     while (newAdsData.length < number) {
//       newAdsData.push({ gmail: "", deposit: "" }); // Initialize default objects
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }
//     setAdsData(newAdsData);
//   };

//   // Handle field changes
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     if (!updatedAdsData[index]) {
//       updatedAdsData[index] = { gmail: "", deposit: "" }; // Ensure object exists
//     }
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   // Handle deposit change (dropdown)
//   const handleDepositChange = (index, value) => {
//     const numericValue = value ? parseFloat(value) : 0; // Convert value to number
//     handleFieldChange(index, "deposit", numericValue);
//   };

//   // Calculate total deposit
//   const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

//   // Handle API call on form submission
//   const handleSubmit = async () => {
//     setLoading(true);
//     const requestData = {
//       adNum,
//       adsDetails: adsData,
//     };

//     try {
//       const response = await axios.post(
//         "http://13.127.161.242:8001/kimi/create-google-ads",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdlM2Q2OWU2ZGFkZDYwNjRkM2IzN2IiLCJwaG9uZSI6NDMyODcsImVtYWlsIjoiZGVlcGlrYWF3d3ExQGdtYWlsLmNvbSIsInR5cGVPZlVzZXIiOiJVc2VyIiwiaWF0IjoxNzM2OTMxNDAzLCJleHAiOjE3Mzk1MjM0MDN9.l_12LV-sM8BUuSFaVUp3uDnvuMviKQUnDthYywbFwAc`,
//           },
//         }
//       );
//       console.log("Request data", response);
//       if (response?.data) {
//         setResponseMessage(response.data.message);
//         setWalletAmount(parseFloat(response.data.wallet)); // Update wallet amount
//         setTotalCost(parseFloat(response.data.totalCost)); // Update total cost
//       }
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log("Request canceled");
//       } else {
//         console.error("Error creating ads:", error);
//         setResponseMessage("Failed to create ads. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddAmount = () => {
//     const updatedWallet = walletAmount + parseFloat(additionalAmount || 0);
//     setWalletAmount(updatedWallet);
//     setAdditionalAmount(""); // Clear the input field
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
//           <strong>Total Deposit Of Ads:</strong> <span>${totalDeposit.toFixed(2)}</span>
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Cost:</strong> <span>${totalCost.toFixed(2)}</span>
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Wallet:</strong> <span>${walletAmount.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Display Add Amount section if wallet is less than total cost */}
//       {walletAmount < totalCost && (
//         <div className={styles.addAmountSection}>
//           <h3>Your wallet balance is insufficient</h3>
//           <label htmlFor="addAmount">Add Amount:</label>
//           <input
//             type="number"
//             id="addAmount"
//             value={additionalAmount}
//             onChange={(e) => setAdditionalAmount(e.target.value)}
//             className={styles.input}
//           />
//           <button className={styles.button} onClick={handleAddAmount}>
//             Add Amount
//           </button>
//         </div>
//       )}

//       {responseMessage && (
//         <div className={styles.responseMessage}>
//           <p>{responseMessage}</p>
//         </div>
//       )}

//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)}>
//           Back
//         </button>
//         <button className={styles.button} onClick={handleSubmit} disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;




// //lstest code 
// import axios from "axios"; // Add this line
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";
// import Httpservices from "../Services/Httpservices"; // Import the HTTP service
// import Auth from "../Services/Auth";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1); // Track the number of ads
//   const [adsData, setAdsData] = useState([]); // Track ad field inputs
//   const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100
//   const [totalCost, setTotalCost] = useState(0); // Total cost of ads from API
//   const [responseMessage, setResponseMessage] = useState(""); // For API response messages
//   const [loading, setLoading] = useState(false); // For loading state

//   // Handle change in ad number
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1; // Ensure a valid number
//     setAdNum(number);

//     // Adjust adsData array length based on adNum
//     const newAdsData = [...adsData];
//     while (newAdsData.length < number) {
//       newAdsData.push({ gmail: "", deposit: "" }); // Initialize default objects
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }
//     setAdsData(newAdsData);
//   };

//   // Handle field changes
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     if (!updatedAdsData[index]) {
//       updatedAdsData[index] = { gmail: "", deposit: "" }; // Ensure object exists
//     }
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   // Handle deposit change (dropdown)
//   const handleDepositChange = (index, value) => {
//     const numericValue = value ? parseFloat(value) : 0; // Convert value to number
//     handleFieldChange(index, "deposit", numericValue);
//   };

//   // Calculate total deposit
//   const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

//   // Handle API call on form submission
//   const handleSubmit = async () => {
//     setLoading(true);
//     const requestData = {
//       adNum,
//       adsDetails: adsData,
//     };

//     try {
//       const response = await axios.post(
//         "http://13.127.161.242:8001/kimi/create-google-ads",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdlM2Q2OWU2ZGFkZDYwNjRkM2IzN2IiLCJwaG9uZSI6NDMyODcsImVtYWlsIjoiZGVlcGlrYWF3d3ExQGdtYWlsLmNvbSIsInR5cGVPZlVzZXIiOiJVc2VyIiwiaWF0IjoxNzM2OTMxNDAzLCJleHAiOjE3Mzk1MjM0MDN9.l_12LV-sM8BUuSFaVUp3uDnvuMviKQUnDthYywbFwAc`,
//           },
//         }
//       );
//       console.log("Request data", response);
//       if (response?.data) {
//         setResponseMessage(response.data.message);
//         setWalletAmount(parseFloat(response.data.wallet)); // Update wallet amount
//         setTotalCost(parseFloat(response.data.totalCost)); // Update total cost
//       }
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log("Request canceled");
//       } else {
//         console.error("Error creating ads:", error);
//         setResponseMessage("Failed to create ads. Please try again.");
//       }
//     } finally {
//       setLoading(false);
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
//          <div className={styles.summaryItem}>
//             <strong>Total Deposit Of Ads:</strong> <span>${totalDeposit.toFixed(2)}</span>
//          </div>
//          <div className={styles.summaryItem}>
//            <strong>Total Cost:</strong> <span>${totalCost.toFixed(2)}</span>
//          </div>
//          <div className={styles.summaryItem}>
//            <strong>Wallet:</strong> <span>${walletAmount.toFixed(2)}</span>
//          </div>
//        </div>

//       {responseMessage && (
//         <div className={styles.responseMessage}>
//           <p>{responseMessage}</p>
//         </div>
//       )}

//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)}>
//           Back
//         </button>
//         <button className={styles.button} onClick={handleSubmit} disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;







// //Api started 
// import axios from "axios"; // Add this line
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreateGoogleAds.module.css";
// import Httpservices from "../Services/Httpservices"; // Import the HTTP service
// import Auth from "../Services/Auth";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1); // Track the number of ads
//   const [adsData, setAdsData] = useState([]); // Track ad field inputs
//   const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100
//   const [responseMessage, setResponseMessage] = useState(""); // For API response messages
//   const [loading, setLoading] = useState(false); // For loading state

//   // Handle change in ad number
//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1; // Ensure a valid number
//     setAdNum(number);

//     // Adjust adsData array length based on adNum
//     const newAdsData = [...adsData];
//     while (newAdsData.length < number) {
//       newAdsData.push({ gmail: "", deposit: "" }); // Initialize default objects
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }
//     setAdsData(newAdsData);
//   };
  
  

//   // Handle field changes
//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     if (!updatedAdsData[index]) {
//       updatedAdsData[index] = { gmail: "", deposit: "" }; // Ensure object exists
//     }
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };



  
//   // Handle deposit change (dropdown)
//   const handleDepositChange = (index, value) => {
//     const numericValue = value ? parseFloat(value) : 0; // Convert value to number
//     handleFieldChange(index, "deposit", numericValue);
//   };

//   // Calculate total deposit
//   const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

//   // Handle API call on form submission
//   const handleSubmit = async () => {
//     setLoading(true);
//     const requestData = {
//       adNum,
//       adsDetails: adsData,
//     };

//     try {
//       const response = await axios.post("http://13.127.161.242:8001/kimi/create-google-ads", requestData, {
//         headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdlM2Q2OWU2ZGFkZDYwNjRkM2IzN2IiLCJwaG9uZSI6NDMyODcsImVtYWlsIjoiZGVlcGlrYWF3d3ExQGdtYWlsLmNvbSIsInR5cGVPZlVzZXIiOiJVc2VyIiwiaWF0IjoxNzM2OTMxNDAzLCJleHAiOjE3Mzk1MjM0MDN9.l_12LV-sM8BUuSFaVUp3uDnvuMviKQUnDthYywbFwAc`}
//       });
//       console.log("Request data", response);
//       if (response?.data) {
//         setResponseMessage(response.data.message);
//         setWalletAmount(parseFloat(response.data.wallet)); // Update wallet amount
//       }
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log("Request canceled");
//       } else {
//         console.error("Error creating ads:", error);
//         setResponseMessage("Failed to create ads. Please try again.");
//       }
//     } finally {
//       setLoading(false);
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
//           <strong>Wallet:</strong> ${walletAmount.toFixed(2)}
//         </div>
//       </div>

//       {responseMessage && (
//         <div className={styles.responseMessage}>
//           <p>{responseMessage}</p>
//         </div>
//       )}

//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)}>
//           Back
//         </button>
//         <button className={styles.button} onClick={handleSubmit} disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "./CreateGoogleAds.module.css";

// const CreateGoogleAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1);
//   const [adsData, setAdsData] = useState([]);
//   const [walletAmount, setWalletAmount] = useState(0); // Example wallet balance
//   const [responseMessage, setResponseMessage] = useState("");
//   const [loading, setLoading] = useState(false);

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

//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     if (!updatedAdsData[index]) {
//       updatedAdsData[index] = { gmail: "", deposit: "" };
//     }
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   const handleDepositChange = (index, value) => {
//     const numericValue = value ? parseFloat(value) : 0;
//     handleFieldChange(index, "deposit", numericValue);
//   };

//   const totalDeposit = adsData.reduce(
//     (sum, ad) => sum + parseFloat(ad.deposit || 0),
//     0
//   );

//   const totalCost = adNum * 30 + totalDeposit * 1.06;

//   const handleSubmit = async () => {
//     setLoading(true);
//     const requestData = {
//       adNum,
//       adsDetails: adsData,
//     };

//     try {
//       const response = await axios.post(
//         "http://13.127.161.242:8001/kimi/create-google-ads",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer <your-token>`,
//           },
//         }
//       );
//       if (response?.data) {
//         setResponseMessage(response.data.message);
//         setWalletAmount(parseFloat(response.data.wallet));
//       }
//     } catch (error) {
//       console.error("Error creating ads:", error);
//       setResponseMessage("Failed to create ads. Please try again.");
//     } finally {
//       setLoading(false);
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
//                 onChange={(e) =>
//                   handleFieldChange(index, "gmail", e.target.value)
//                 }
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
//           <strong>Total Deposit Of Ads:</strong> {totalDeposit.toFixed(2)} USD
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Total Cost:</strong> {`30.00 * ${adNum} + ${totalDeposit.toFixed(
//             2
//           )} * 1.06 = ${totalCost.toFixed(2)} USD`}
//         </div>
//         <div className={styles.summaryItem}>
//           <strong>Wallet:</strong> {walletAmount.toFixed(2)} USD
//         </div>
//         {walletAmount < totalCost && (
//           <div className={styles.warning}>
//             <span style={{ color: "red" }}>
//               Wallet balance is insufficient, please{" "}
//               <a href="/recharge" style={{ color: "blue" }}>
//                 recharge
//               </a>
//               .
//             </span>
//           </div>
//         )}
//       </div>

//       {responseMessage && (
//         <div className={styles.responseMessage}>
//           <p>{responseMessage}</p>
//         </div>
//       )}

//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={() => navigate(-1)}>
//           Back
//         </button>
//         <button
//           className={styles.button}
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateGoogleAds;
