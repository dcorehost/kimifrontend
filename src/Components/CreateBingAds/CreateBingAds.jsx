
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateBingAds.module.css";
import Auth from "../Services/Auth";

const CreateBingAds = () => {
  const navigate = useNavigate();
  const [adNum, setAdNum] = useState(1);
  const [adsData, setAdsData] = useState([]);
  const [walletAmount, setWalletAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const token = Auth.getToken();

  const handleAdNumChange = (e) => {
    const number = parseInt(e.target.value) || 1;
    setAdNum(number);
    const newAdsData = [...adsData];
    while (newAdsData.length < number) {
      newAdsData.push({ domain: "", outlookMail: "", deposit: "" });
    }
    while (newAdsData.length > number) {
      newAdsData.pop();
    }
    setAdsData(newAdsData);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedAdsData = [...adsData];
    if (!updatedAdsData[index]) {
      updatedAdsData[index] = { domain: "", outlookMail: "", deposit: "" };
    }
    updatedAdsData[index][field] = value;
    setAdsData(updatedAdsData);
    const totalDeposit = updatedAdsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);
    setTotalCost(totalDeposit);
  };

  const handleDepositChange = (index, value) => {
    const numericValue = value ? parseFloat(value) : 0;
    handleFieldChange(index, "deposit", numericValue);
  };

  const totalDeposit = adsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);

  const handleSubmit = async () => {
    setLoading(true);

    const requestData = {
      adNum,
      adsDetails: adsData,
    };

    try {
      const response = await axios.post(
        "https://admediaagency.online/kimi/create-bing-ads",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data) {
        setResponseMessage(response?.data?.message);
        setWalletAmount(parseFloat(response?.data?.data?.wallet || 0));
        setTotalCost(parseFloat(response?.data?.data?.totalCost || 0));
      }
    } catch (error) {
      console.error("Error creating ads:", error);
      setResponseMessage("Failed to create ads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAmount = () => {
   
    navigate("/bing/add-money")
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
        setWalletAmount(data?.users?.wallet)
      } catch (error) {
        console.log(error)
      }
    }
    fetchWalletAmount();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Create Bing Ads</h1>

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
              <label htmlFor={`outlookMail-${index}`}>Outlook Mail:</label>
              <input
                type="email"
                id={`outlookMail-${index}`}
                value={adsData[index]?.outlookMail || ""}
                onChange={(e) => handleFieldChange(index, "outlookMail", e.target.value)}
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
                {[0,15, 30, 50, 100, 200, 500].map((amount) => (
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

export default CreateBingAds;



// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styles from "./CreateBingAds.module.css";
// import Auth from "../Services/Auth";

// const CreateBingAds = () => {
//   const navigate = useNavigate();
//   const [adNum, setAdNum] = useState(1);
//   const [adsData, setAdsData] = useState([{ domain: "", outlookMail: "", deposit: "" }]);
//   const [wallet, setWallet] = useState(0);
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [accountOpeningFee, setAccountOpeningFee] = useState(30);
//   const [topUpFee, setTopUpFee] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const token = Auth.getToken();

//   const handleAdNumChange = (e) => {
//     const number = parseInt(e.target.value) || 1;
//     setAdNum(number);
//     const newAdsData = [...adsData];

//     while (newAdsData.length < number) {
//       newAdsData.push({ domain: "", outlookMail: "", deposit: "" });
//     }
//     while (newAdsData.length > number) {
//       newAdsData.pop();
//     }

//     setAdsData(newAdsData);
//   };

//   const handleFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     updatedAdsData[index] = { ...updatedAdsData[index], [field]: value };
//     setAdsData(updatedAdsData);

//     const depositTotal = updatedAdsData.reduce((sum, ad) => sum + (parseFloat(ad.deposit) || 0), 0);
//     setTotalDeposit(depositTotal);

//     const calculatedTopUpFee = depositTotal * 0.15;
//     setTopUpFee(calculatedTopUpFee);

//     const calculatedTotalCost = depositTotal + accountOpeningFee + calculatedTopUpFee;
//     setTotalCost(calculatedTotalCost);
//   };

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
//         setWallet(parseFloat(walletRequest.data?.users?.wallet));
//       } catch (error) {
//         console.error("Error fetching wallet amount:", error);
//       }
//     }
//     fetchWalletAmount();
//   }, [token]);

//   useEffect(() => {
//     if (wallet < totalCost) {
//       toast.warn("Your balance is low. Please add money.", {
//         onClick: () => navigate("/bing/add-money"),
//         autoClose: false,
//       });
//     }
//   }, [wallet, totalCost, navigate]);

//   return (
//     <div className={styles.container}>
//       <h1>Create Bing Ads</h1>
//       <ToastContainer />

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

//       {adsData.map((_, index) => (
//         <div key={index} className={styles.adFields}>
//           <h3>Ad {index + 1}</h3>
//           <div className={styles.fieldRow}>
//             <div className={styles.fieldContainer}>
//               <label htmlFor={`domain-${index}`}>Domain:</label>
//               <input
//                 type="text"
//                 id={`domain-${index}`}
//                 value={adsData[index]?.domain || ""}
//                 onChange={(e) => handleFieldChange(index, "domain", e.target.value)}
//                 className={styles.input}
//               />
//             </div>
//             <div className={styles.fieldContainer}>
//               <label htmlFor={`outlookMail-${index}`}>Outlook Mail:</label>
//               <input
//                 type="email"
//                 id={`outlookMail-${index}`}
//                 value={adsData[index]?.outlookMail || ""}
//                 onChange={(e) => handleFieldChange(index, "outlookMail", e.target.value)}
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

//       <button onClick={() => toast.success("Bing Ads created successfully!")} disabled={loading} className={styles.submitButton}>
//         {loading ? "Creating..." : "Create Bing Ads"}
//       </button>
//     </div>
//   );
// };

// export default CreateBingAds;