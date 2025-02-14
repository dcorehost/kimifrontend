

// // all data updated code 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./FacebookCreateAd.module.css";
// import Auth from "../Services/Auth";

// const FacebookCreateAd = () => {
//   const [pageNum, setPageNum] = useState(2);
//   const [urls, setUrls] = useState(["", ""]);
//   const [adType, setAdType] = useState("domain");
//   const [unlimitedDomain, setUnlimitedDomain] = useState("");
//   const [addNumber, setAddNumber] = useState(1);
//   const [domains, setDomains] = useState([""]);
//   const [appUrl, setAppUrl] = useState("");
//   const [appId, setAppId] = useState("");
//   const [licenseType, setLicenseType] = useState("");
//   const [licenseInput, setLicenseInput] = useState("");
//   const [adsData, setAdsData] = useState([{ accountName: "", deposit: "" }]);
//   const [remarks, setRemarks] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");
//   const [wallet, setWallet] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [paymentMode, setPaymentMode] = useState("monthly");

//   const token = Auth.getToken();

//   const handlePageNumChange = (e) => {
//     const num = parseInt(e.target.value, 10);
//     setPageNum(num);
//     setUrls(Array(num).fill(""));
//   };

//   const handleAddNumberChange = (e) => {
//     const num = parseInt(e.target.value, 10);
//     setAddNumber(num);
//     setDomains(Array(num).fill(""));
//   };

//   const handleDomainChange = (e, index) => {
//     const newDomains = [...domains];
//     newDomains[index] = e.target.value;
//     setDomains(newDomains);
//   };

//   const handleAdFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     if (!updatedAdsData[index]) {
//       updatedAdsData[index] = { accountName: "", deposit: "" };
//     }
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);

//     const requestData = {
//       licenseMode: licenseType === "new" ? "new license" : "old license",
//       licenseName: licenseInput,
//       pageNum,
//       pageUrls: urls,
//       domainOption: unlimitedDomain === "yes" ? "unlimited" : "limited",
//       domainNum: domains.length,
//       domains,
//       appUrl: adType === "app" ? appUrl : "",
//       appId: adType === "app" ? appId : "",
//       ads: adsData.map((ad) => ({
//         accountName: ad.accountName,
//         deposit: parseFloat(ad.deposit) || 0,
//       })),
//       remarks,
//       paymentMode, 
//     };

//     try {
//       const response = await axios.post(
//         "https://admediaagency.online/kimi/create-facebook-ads",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data) {
//         setResponseMessage(response.data.message);
//         setWallet(parseFloat(response.data.wallet));
//         setTotalCost(parseFloat(response.data.totalCost));
//       }
//     } catch (error) {
//       console.error("Error creating ads:", error);
//       setResponseMessage("Failed to create ads. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert("Link copied to clipboard!");
//     });
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
//         const { data } = walletRequest;
//         setWallet(data?.users?.wallet)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchWalletAmount();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.labelWithBorder1}>
//         <div className={styles.field}>
//           <label className={styles.label}>
//             <span>*</span> The License name:
//           </label>
//           <select
//             className={styles.select2}
//             value={licenseType}
//             onChange={(e) => setLicenseType(e.target.value)}
//           >
//             <option value="">Select license mode</option>
//             <option value="new">New license</option>
//             <option value="old">Old license</option>
//           </select>
//         </div>
//         {licenseType && (
//           <div className={styles.licenseInputContainer}>
//             <input
//               type="text"
//               className={styles.input2}
//               value={licenseInput}
//               onChange={(e) => setLicenseInput(e.target.value)}
//               placeholder={
//                 licenseType === "new"
//                   ? "Please enter license"
//                   : "Please select license name"
//               }
//             />
//           </div>
//         )}
//       </div>

//       <div className={styles.labelWithBorder}>
//         <div className={styles.field}>
//           <label className={styles.label}>
//             <span>*</span> Page Num:
//           </label>
//           <input
//             type="number"
//             min="1"
//             value={pageNum}
//             className={styles.input}
//             onChange={handlePageNumChange}
//           />
//         </div>
//         {urls.map((url, index) => (
//           <div key={index} className={styles.field}>
//             <label className={styles.label}>
//               <span>*</span> {index + 1}. Page URL:
//             </label>
//             <input
//               type="text"
//               placeholder="Please enter Page URL"
//               className={styles.input}
//               value={url}
//               onChange={(e) =>
//                 setUrls(urls.map((u, i) => (i === index ? e.target.value : u)))
//               }
//             />
//           </div>
//         ))}
//       </div>

//       <div className={styles.labelWithBorder}>
//         <div className={styles.radioGroup}>
//           <label className={styles.label}>
//             <span>*</span> Ad Type:
//           </label>
//           <div>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="adType"
//                 value="domain"
//                 checked={adType === "domain"}
//                 onChange={() => setAdType("domain")}
//               />
//               Domain
//             </label>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="adType"
//                 value="app"
//                 checked={adType === "app"}
//                 onChange={() => setAdType("app")}
//               />
//               App
//             </label>
//           </div>
//         </div>

//         {adType === "domain" && (
//           <>
//             <div className={styles.field}>
//               <label className={styles.label}>
//                 <span>*</span> Is it unlimited domain?
//               </label>
//               <select
//                 className={styles.select}
//                 value={unlimitedDomain}
//                 onChange={(e) => setUnlimitedDomain(e.target.value)}
//               >
//                 <option value="">Please select</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </div>
//             {unlimitedDomain === "no" && (
//               <>
//                 <div className={styles.field}>
//                   <label className={styles.label}>
//                     <span>*</span> Domain Num:
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={addNumber}
//                     className={styles.input}
//                     onChange={handleAddNumberChange}
//                   />
//                 </div>
//                 {domains.map((domain, index) => (
//                   <div key={index} className={styles.field}>
//                     <label className={styles.label}>
//                       <span>*</span> Domain {index + 1}:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter domain"
//                       className={styles.input}
//                       value={domain}
//                       onChange={(e) => handleDomainChange(e, index)}
//                     />
//                   </div>
//                 ))}
//               </>
//             )}
//           </>
//         )}

//         {adType === "app" && (
//           <>
//             <div className={styles.field}>
//               <label className={styles.label}>
//                 <span>*</span> App URL:
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter app URL"
//                 className={styles.input}
//                 value={appUrl}
//                 onChange={(e) => setAppUrl(e.target.value)}
//               />
//             </div>
//             <div className={styles.field}>
//               <label className={styles.label}>
//                 <span>*</span> App ID:
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter app ID"
//                 className={styles.input}
//                 value={appId}
//                 onChange={(e) => setAppId(e.target.value)}
//               />
//             </div>
//           </>
//         )}
//       </div>

//       <div className={styles.labelWithBorder}>
//         <div className={styles.radioGroup}>
//           <label className={styles.label}>
//             <span>*</span> Payment Mode:
//           </label>
//           <div>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="paymentMode"
//                 value="monthly"
//                 checked={paymentMode === "monthly"}
//                 onChange={() => setPaymentMode("monthly")}
//               />
//               Monthly VIP
//             </label>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="paymentMode"
//                 value="oneByOne"
//                 checked={paymentMode === "oneByOne"}
//                 onChange={() => setPaymentMode("oneByOne")}
//               />
//               Pay One-by-One
//             </label>
//           </div>
//         </div>
//         {paymentMode === "oneByOne" &&
//           adsData.map((ad, index) => (
//             <div key={index} className={styles.field}>
//               <label className={styles.label}>
//                 <span>*</span> Account Name:
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter account name"
//                 className={styles.input}
//                 value={ad.accountName}
//                 onChange={(e) =>
//                   handleAdFieldChange(index, "accountName", e.target.value)
//                 }
//               />
//               <label className={styles.label}>
//                 <span>*</span> Deposit:
//               </label>
//               <input
//                 type="number"
//                 placeholder="Enter deposit amount"
//                 className={styles.input}
//                 value={ad.deposit}
//                 onChange={(e) =>
//                   handleAdFieldChange(index, "deposit", e.target.value)
//                 }
//               />
//             </div>
//           ))}
//       </div>

//       <div className={styles.labelWithBorder}>
//         <div className={styles.field}>
//           <label className={styles.label}>
//             <span>*</span> Remarks:
//           </label>
//           <textarea
//             className={styles.textarea}
//             placeholder="Please enter remarks"
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           ></textarea>
//         </div>
//       </div>

//       <div className={styles.buttonWrapper}>
//         <button
//           className={styles.submitButton}
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Creating Ads..." : "Create Ads"}
//         </button>
//       </div>

//       {responseMessage && (
//         <div className={styles.responseMessage}>{responseMessage}</div>
//       )}

//       <div className={styles.walletInfo}>
//         <p>Total Cost: ${totalCost.toFixed(2)}</p>
//         <p>Wallet Balance: ${wallet.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default FacebookCreateAd;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./FacebookCreateAd.module.css";
// import Auth from "../Services/Auth";
// import { useNavigate } from "react-router-dom";

// const FacebookCreateAd = () => {
//   const navigate = useNavigate();
//   const [pageNum, setPageNum] = useState(2);
//   const [urls, setUrls] = useState(["", ""]);
//   const [adType, setAdType] = useState("domain");
//   const [unlimitedDomain, setUnlimitedDomain] = useState("");
//   const [addNumber, setAddNumber] = useState(1);
//   const [domains, setDomains] = useState([""]);
//   const [appUrl, setAppUrl] = useState("");
//   const [appId, setAppId] = useState("");
//   const [licenseType, setLicenseType] = useState("");
//   const [licenseInput, setLicenseInput] = useState("");
//   const [adsData, setAdsData] = useState([{ accountName: "", deposit: "" }]);
//   const [remarks, setRemarks] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");
//   const [wallet, setWallet] = useState(0);
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [paymentMode, setPaymentMode] = useState("monthly");

//   const token = Auth.getToken();

//   // Handle page number change
//   const handlePageNumChange = (e) => {
//     const num = parseInt(e.target.value, 10);
//     setPageNum(num);
//     setUrls(Array(num).fill(""));
//   };

//   // Handle add number change
//   const handleAddNumberChange = (e) => {
//     const num = parseInt(e.target.value, 10);
//     setAddNumber(num);
//     setDomains(Array(num).fill(""));
//   };

//   // Handle domain change
//   const handleDomainChange = (e, index) => {
//     const newDomains = [...domains];
//     newDomains[index] = e.target.value;
//     setDomains(newDomains);
//   };

//   // Handle ad field change
//   const handleAdFieldChange = (index, field, value) => {
//     const updatedAdsData = [...adsData];
//     if (!updatedAdsData[index]) {
//       updatedAdsData[index] = { accountName: "", deposit: "" };
//     }
//     updatedAdsData[index][field] = value;
//     setAdsData(updatedAdsData);

//     // Calculate total deposit
//     const totalDeposit = updatedAdsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);
//     setTotalDeposit(totalDeposit);

//     // Calculate total cost (including any additional fees)
//     const totalCost = totalDeposit; // Add additional fees here if needed
//     setTotalCost(totalCost);
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     setLoading(true);

//     const requestData = {
//       licenseMode: licenseType === "new" ? "new license" : "old license",
//       licenseName: licenseInput,
//       pageNum,
//       pageUrls: urls,
//       domainOption: unlimitedDomain === "yes" ? "unlimited" : "limited",
//       domainNum: domains.length,
//       domains,
//       appUrl: adType === "app" ? appUrl : "",
//       appId: adType === "app" ? appId : "",
//       ads: adsData.map((ad) => ({
//         accountName: ad.accountName,
//         deposit: parseFloat(ad.deposit) || 0,
//       })),
//       remarks,
//       paymentMode,
//     };

//     try {
//       const response = await axios.post(
//         "https://admediaagency.online/kimi/create-facebook-ads",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data) {
//         setResponseMessage(response.data.message);
//         setWallet(parseFloat(response.data.wallet));
//         setTotalCost(parseFloat(response.data.totalCost));
//       }
//     } catch (error) {
//       console.error("Error creating ads:", error);
//       setResponseMessage("Failed to create ads. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle adding funds to wallet
//   const handleAddAmount = () => {
//     navigate("/facebook/add-money");
//   };

//   // Fetch wallet balance on component mount
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
//         setWallet(data?.users?.wallet);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchWalletAmount();
//   }, []);

//   return (
//     <div className={styles.container}>
//       {/* License Section */}
//       <div className={styles.labelWithBorder1}>
//         <div className={styles.field}>
//           <label className={styles.label}>
//             <span>*</span> The License name:
//           </label>
//           <select
//             className={styles.select2}
//             value={licenseType}
//             onChange={(e) => setLicenseType(e.target.value)}
//           >
//             <option value="">Select license mode</option>
//             <option value="new">New license</option>
//             <option value="old">Old license</option>
//           </select>
//         </div>
//         {licenseType && (
//           <div className={styles.licenseInputContainer}>
//             <input
//               type="text"
//               className={styles.input2}
//               value={licenseInput}
//               onChange={(e) => setLicenseInput(e.target.value)}
//               placeholder={
//                 licenseType === "new"
//                   ? "Please enter license"
//                   : "Please select license name"
//               }
//             />
//           </div>
//         )}
//       </div>

//       {/* Page URLs Section */}
//       <div className={styles.labelWithBorder}>
//         <div className={styles.field}>
//           <label className={styles.label}>
//             <span>*</span> Page Num:
//           </label>
//           <input
//             type="number"
//             min="1"
//             value={pageNum}
//             className={styles.input}
//             onChange={handlePageNumChange}
//           />
//         </div>
//         {urls.map((url, index) => (
//           <div key={index} className={styles.field}>
//             <label className={styles.label}>
//               <span>*</span> {index + 1}. Page URL:
//             </label>
//             <input
//               type="text"
//               placeholder="Please enter Page URL"
//               className={styles.input}
//               value={url}
//               onChange={(e) =>
//                 setUrls(urls.map((u, i) => (i === index ? e.target.value : u)) )
//                } />
//           </div>
//         ))}
//       </div>

//       {/* Ad Type Section */}
//       <div className={styles.labelWithBorder}>
//         <div className={styles.radioGroup}>
//           <label className={styles.label}>
//             <span>*</span> Ad Type:
//           </label>
//           <div>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="adType"
//                 value="domain"
//                 checked={adType === "domain"}
//                 onChange={() => setAdType("domain")}
//               />
//               Domain
//             </label>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="adType"
//                 value="app"
//                 checked={adType === "app"}
//                 onChange={() => setAdType("app")}
//               />
//               App
//             </label>
//           </div>
//         </div>

//         {adType === "domain" && (
//           <>
//             <div className={styles.field}>
//               <label className={styles.label}>
//                 <span>*</span> Is it unlimited domain?
//               </label>
//               <select
//                 className={styles.select}
//                 value={unlimitedDomain}
//                 onChange={(e) => setUnlimitedDomain(e.target.value)}
//               >
//                 <option value="">Please select</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//               </select>
//             </div>
//             {unlimitedDomain === "no" && (
//               <>
//                 <div className={styles.field}>
//                   <label className={styles.label}>
//                     <span>*</span> Domain Num:
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={addNumber}
//                     className={styles.input}
//                     onChange={handleAddNumberChange}
//                   />
//                 </div>
//                 {domains.map((domain, index) => (
//                   <div key={index} className={styles.field}>
//                     <label className={styles.label}>
//                       <span>*</span> Domain {index + 1}:
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter domain"
//                       className={styles.input}
//                       value={domain}
//                       onChange={(e) => handleDomainChange(e, index)}
//                     />
//                   </div>
//                 ))}
//               </>
//             )}
//           </>
//         )}

//         {adType === "app" && (
//           <>
//             <div className={styles.field}>
//               <label className={styles.label}>
//                 <span>*</span> App URL:
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter app URL"
//                 className={styles.input}
//                 value={appUrl}
//                 onChange={(e) => setAppUrl(e.target.value)}
//               />
//             </div>
//             <div className={styles.field}>
//               <label className={styles.label}>
//                 <span>*</span> App ID:
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter app ID"
//                 className={styles.input}
//                 value={appId}
//                 onChange={(e) => setAppId(e.target.value)}
//               />
//             </div>
//           </>
//         )}
//       </div>

//       {/* Payment Mode Section */}
//       <div className={styles.labelWithBorder}>
//         <div className={styles.radioGroup}>
//           <label className={styles.label}>
//             <span>*</span> Payment Mode:
//           </label>
//           <div>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="paymentMode"
//                 value="monthly"
//                 checked={paymentMode === "monthly"}
//                 onChange={() => setPaymentMode("monthly")}
//               />
//               Monthly VIP
//             </label>
//             <label className={styles.radioLabel}>
//               <input
//                 type="radio"
//                 name="paymentMode"
//                 value="oneByOne"
//                 checked={paymentMode === "oneByOne"}
//                 onChange={() => setPaymentMode("oneByOne")}
//               />
//               Pay One-by-One
//             </label>
//           </div>
//         </div>
//         {paymentMode === "oneByOne" &&
//           adsData.map((ad, index) => (
//             <div key={index} className={styles.field}>
//               <label className={styles.label}>
//                 <span>*</span> Account Name:
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter account name"
//                 className={styles.input}
//                 value={ad.accountName}
//                 onChange={(e) =>
//                   handleAdFieldChange(index, "accountName", e.target.value)
//                 }
//               />
//               <label className={styles.label}>
//                 <span>*</span> Deposit:
//               </label>
//               <input
//                 type="number"
//                 placeholder="Enter deposit amount"
//                 className={styles.input}
//                 value={ad.deposit}
//                 onChange={(e) =>
//                   handleAdFieldChange(index, "deposit", e.target.value)
//                 }
//               />
//             </div>
//           ))}
//       </div>

//       {/* Remarks Section */}
//       <div className={styles.labelWithBorder}>
//         <div className={styles.field}>
//           <label className={styles.label}>
//             <span>*</span> Remarks:
//           </label>
//           <textarea
//             className={styles.textarea}
//             placeholder="Please enter remarks"
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//           ></textarea>
//         </div>
//       </div>

//       {/* Wallet and Cost Information */}
//       <div className={styles.walletInfo}>
//         <p>Total Deposit: ${totalDeposit.toFixed(2)}</p>
//         <p>Total Cost: ${totalCost.toFixed(2)}</p>
//         <p>Wallet Balance: ${wallet.toFixed(2)}</p>
//       </div>

//       {/* Insufficient Wallet Balance */}
//       {wallet < totalCost && (
//         <div className={styles.addAmountSection}>
//           <h3>Your wallet balance is insufficient</h3>
//           <button className={styles.button} onClick={handleAddAmount}>
//             Add Amount
//           </button>
//         </div>
//       )}

//       {/* Response Message */}
//       {responseMessage && (
//         <div className={styles.responseMessage}>{responseMessage}</div>
//       )}

//       {/* Submit Button */}
//       <div className={styles.buttonWrapper}>
//         <button
//           className={styles.submitButton}
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Creating Ads..." : "Create Ads"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FacebookCreateAd;







import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./FacebookCreateAd.module.css";
import Auth from "../Services/Auth";
import { useNavigate } from "react-router-dom";

const FacebookCreateAd = () => {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(2);
  const [urls, setUrls] = useState(["", ""]);
  const [adType, setAdType] = useState("domain");
  const [unlimitedDomain, setUnlimitedDomain] = useState("");
  const [addNumber, setAddNumber] = useState(1);
  const [domains, setDomains] = useState([""]);
  const [appUrl, setAppUrl] = useState("");
  const [appId, setAppId] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [licenseInput, setLicenseInput] = useState("");
  const [adsData, setAdsData] = useState([{ accountName: "", deposit: "" }]);
  const [remarks, setRemarks] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [wallet, setWallet] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [accountOpeningFee, setAccountOpeningFee] = useState(30); // Fixed account opening fee
  const [topUpFee, setTopUpFee] = useState(0); // 15% of total deposit
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("monthly");

  const token = Auth.getToken();

  // Handle page number change
  const handlePageNumChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setPageNum(num);
    setUrls(Array(num).fill(""));
  };

  // Handle add number change
  const handleAddNumberChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setAddNumber(num);
    setDomains(Array(num).fill(""));
  };

  // Handle domain change
  const handleDomainChange = (e, index) => {
    const newDomains = [...domains];
    newDomains[index] = e.target.value;
    setDomains(newDomains);
  };

  // Handle ad field change
  const handleAdFieldChange = (index, field, value) => {
    const updatedAdsData = [...adsData];
    if (!updatedAdsData[index]) {
      updatedAdsData[index] = { accountName: "", deposit: "" };
    }
    updatedAdsData[index][field] = value;
    setAdsData(updatedAdsData);

    // Calculate total deposit
    const totalDeposit = updatedAdsData.reduce((sum, ad) => sum + parseFloat(ad.deposit || 0), 0);
    setTotalDeposit(totalDeposit);

    // Calculate top-up fee (15% of total deposit)
    const topUpFee = totalDeposit * 0.15;
    setTopUpFee(topUpFee);

    // Calculate total cost (sum of total deposit, account opening fee, and top-up fee)
    const totalCost = totalDeposit + accountOpeningFee + topUpFee;
    setTotalCost(totalCost);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    const requestData = {
      licenseMode: licenseType === "new" ? "new license" : "old license",
      licenseName: licenseInput,
      pageNum,
      pageUrls: urls,
      domainOption: unlimitedDomain === "yes" ? "unlimited" : "limited",
      domainNum: domains.length,
      domains,
      appUrl: adType === "app" ? appUrl : "",
      appId: adType === "app" ? appId : "",
      ads: adsData.map((ad) => ({
        accountName: ad.accountName,
        deposit: parseFloat(ad.deposit) || 0,
      })),
      remarks,
      paymentMode,
    };

    try {
      const response = await axios.post(
        "https://admediaagency.online/kimi/create-facebook-ads",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setResponseMessage(response.data.message);

        // Update wallet and total cost from the API response
        const { accountOpeningFee, totalDeposit, topUpFee, totalCost, wallet } = response.data.data;
        setAccountOpeningFee(parseFloat(accountOpeningFee));
        setTotalDeposit(parseFloat(totalDeposit));
        setTopUpFee(parseFloat(topUpFee));
        setTotalCost(parseFloat(totalCost));
        setWallet(parseFloat(wallet));
      }
    } catch (error) {
      console.error("Error creating ads:", error);
      setResponseMessage("Failed to create ads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle adding funds to wallet
  const handleAddAmount = () => {
    navigate("/facebook/add-money");
  };

  // Fetch wallet balance on component mount
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
        setWallet(data?.users?.wallet);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWalletAmount();
  }, []);

  return (
    <div className={styles.container}>
      {/* License Section */}
      <div className={styles.labelWithBorder1}>
        <div className={styles.field}>
          <label className={styles.label}>
            <span>*</span> The License name:
          </label>
          <select
            className={styles.select2}
            value={licenseType}
            onChange={(e) => setLicenseType(e.target.value)}
          >
            <option value="">Select license mode</option>
            <option value="new">New license</option>
            <option value="old">Old license</option>
          </select>
        </div>
        {licenseType && (
          <div className={styles.licenseInputContainer}>
            <input
              type="text"
              className={styles.input2}
              value={licenseInput}
              onChange={(e) => setLicenseInput(e.target.value)}
              placeholder={
                licenseType === "new"
                  ? "Please enter license"
                  : "Please select license name"
              }
            />
          </div>
        )}
      </div>

      {/* Page URLs Section */}
      <div className={styles.labelWithBorder}>
        <div className={styles.field}>
          <label className={styles.label}>
            <span>*</span> Page Num:
          </label>
          <input
            type="number"
            min="1"
            value={pageNum}
            className={styles.input}
            onChange={handlePageNumChange}
          />
        </div>
        {urls.map((url, index) => (
          <div key={index} className={styles.field}>
            <label className={styles.label}>
              <span>*</span> {index + 1}. Page URL:
            </label>
            <input
              type="text"
              placeholder="Please enter Page URL"
              className={styles.input}
              value={url}
              onChange={(e) =>
                setUrls(urls.map((u, i) => (i === index ? e.target.value : u)))
              }
            />
          </div>
        ))}
      </div>

      {/* Ad Type Section */}
      <div className={styles.labelWithBorder}>
        <div className={styles.radioGroup}>
          <label className={styles.label}>
            <span>*</span> Ad Type:
          </label>
          <div>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="adType"
                value="domain"
                checked={adType === "domain"}
                onChange={() => setAdType("domain")}
              />
              Domain
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="adType"
                value="app"
                checked={adType === "app"}
                onChange={() => setAdType("app")}
              />
              App
            </label>
          </div>
        </div>

        {adType === "domain" && (
          <>
            <div className={styles.field}>
              <label className={styles.label}>
                <span>*</span> Is it unlimited domain?
              </label>
              <select
                className={styles.select}
                value={unlimitedDomain}
                onChange={(e) => setUnlimitedDomain(e.target.value)}
              >
                <option value="">Please select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {unlimitedDomain === "no" && (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>
                    <span>*</span> Domain Num:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={addNumber}
                    className={styles.input}
                    onChange={handleAddNumberChange}
                  />
                </div>
                {domains.map((domain, index) => (
                  <div key={index} className={styles.field}>
                    <label className={styles.label}>
                      <span>*</span> Domain {index + 1}:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter domain"
                      className={styles.input}
                      value={domain}
                      onChange={(e) => handleDomainChange(e, index)}
                    />
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {adType === "app" && (
          <>
            <div className={styles.field}>
              <label className={styles.label}>
                <span>*</span> App URL:
              </label>
              <input
                type="text"
                placeholder="Enter app URL"
                className={styles.input}
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                <span>*</span> App ID:
              </label>
              <input
                type="text"
                placeholder="Enter app ID"
                className={styles.input}
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {/* Payment Mode Section */}
      <div className={styles.labelWithBorder}>
        <div className={styles.radioGroup}>
          <label className={styles.label}>
            <span>*</span> Payment Mode:
          </label>
          <div>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentMode"
                value="monthly"
                checked={paymentMode === "monthly"}
                onChange={() => setPaymentMode("monthly")}
              />
              Monthly VIP
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentMode"
                value="oneByOne"
                checked={paymentMode === "oneByOne"}
                onChange={() => setPaymentMode("oneByOne")}
              />
              Pay One-by-One
            </label>
          </div>
        </div>
        {paymentMode === "oneByOne" &&
          adsData.map((ad, index) => (
            <div key={index} className={styles.field}>
              <label className={styles.label}>
                <span>*</span> Account Name:
              </label>
              <input
                type="text"
                placeholder="Enter account name"
                className={styles.input}
                value={ad.accountName}
                onChange={(e) =>
                  handleAdFieldChange(index, "accountName", e.target.value)
                }
              />
              <label className={styles.label}>
                <span>*</span> Deposit:
              </label>
              <input
                type="number"
                placeholder="Enter deposit amount"
                className={styles.input}
                value={ad.deposit}
                onChange={(e) =>
                  handleAdFieldChange(index, "deposit", e.target.value)
                }
              />
            </div>
          ))}
      </div>

      {/* Remarks Section */}
      <div className={styles.labelWithBorder}>
        <div className={styles.field}>
          <label className={styles.label}>
            <span>*</span> Remarks:
          </label>
          <textarea
            className={styles.textarea}
            placeholder="Please enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Wallet and Cost Information */}
      <div className={styles.walletInfo}>
        <p>Total Deposit: ${totalDeposit.toFixed(2)}</p>
        <p>Account Opening Fee: ${accountOpeningFee.toFixed(2)}</p>
        <p>Top-Up Fee: ${topUpFee.toFixed(2)}</p>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
        <p>Wallet Balance: ${wallet.toFixed(2)}</p>
      </div>

      {/* Insufficient Wallet Balance */}
      {wallet < totalCost && (
        <div className={styles.addAmountSection}>
          <h3>Your wallet balance is insufficient</h3>
          <button className={styles.button} onClick={handleAddAmount}>
            Add Amount
          </button>
        </div>
      )}

      {/* Response Message */}
      {responseMessage && (
        <div className={styles.responseMessage}>{responseMessage}</div>
      )}

      {/* Submit Button */}
      <div className={styles.buttonWrapper}>
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating Ads..." : "Create Ads"}
        </button>
      </div>
    </div>
  );
};

export default FacebookCreateAd;
