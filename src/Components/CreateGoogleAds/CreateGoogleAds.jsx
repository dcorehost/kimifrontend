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






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGoogleAds.module.css";

const CreateGoogleAds = () => {
  const navigate = useNavigate();
  const [adNum, setAdNum] = useState(1); // Track the number of ads
  const [adsData, setAdsData] = useState([]); // Track ad field inputs
  const [walletAmount, setWalletAmount] = useState(100); // Assuming wallet starts with $100

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

  // Calculate total cost (including one-time fee and 15% platform fee)
  const oneTimeFee = 30;
  const platformFeePercentage = 0.15;
  const platformFee = totalDeposit * platformFeePercentage;
  const totalCost = oneTimeFee + totalDeposit + platformFee;

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
          <strong>One-Time Fee:</strong> $30.00
        </div>
        <div className={styles.summaryItem}>
          <strong>Platform Fee (15% of Deposit):</strong> ${platformFee.toFixed(2)}
        </div>
        <div className={styles.summaryItem}>
          <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
        </div>
        <div className={styles.summaryItem}>
          <strong>Wallet:</strong> ${walletAmount.toFixed(2)}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate(-1)}>
          Back
        </button>
        <button className={styles.button} onClick={() => alert("Paying...")}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default CreateGoogleAds;

