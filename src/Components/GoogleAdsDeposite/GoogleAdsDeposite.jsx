<<<<<<< HEAD





// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './GoogleAdsDeposite.module.css';
// import Auth from '../Services/Auth';

// const GoogleAdsDeposite = () => {
//   const [rows, setRows] = useState([{ id: '', money: '' }]);
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletAmount, setWalletAmount] = useState(0);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//     if (field === 'money') updateTotals(updatedRows);
//   };

//   const updateTotals = (rows) => {
//     const total = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
//     setTotalDeposit(total);
//   };

//   const addRow = () => {
//     setRows([...rows, { id: '', money: '' }]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) {
//       const updatedRows = rows.filter((_, i) => i !== index);
//       setRows(updatedRows);
//       updateTotals(updatedRows);
//     } else {
//       alert('At least one row is required!');
//     }
//   };

//   const handleCharge = async () => {
//     setLoading(true);

//     const isValid = rows.every(row => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0);
//     if (!isValid) {
//       setResponseMessage('Please ensure both adGoogleAccount and money are provided.');
//       setLoading(false);
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       setResponseMessage('User not authenticated.');
//       setLoading(false);
//       return;
//     }

//     const requestData = {
//       adGoogleAccount: rows[0].id.trim(),
//       money: parseFloat(rows[0].money.trim()) || 0,  
//       adType: 'Google',
//     };

//     console.log('Request Data:', JSON.stringify(requestData, null, 2));

//     try {
//       const response = await axios.post(
//         'https://admediaagency.online/kimi/create-google-adDeposit',
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response?.data) {
//         console.log('Response:', response.data);
//         setResponseMessage(response.data.message);
//         setWalletAmount(parseFloat(response.data.wallet) || 0);
//         setTotalDeposit(parseFloat(response.data.totalDeposit) || 0);
//         setTotalCost(parseFloat(response.data.totalCost) || 0);
//       }
//     } catch (error) {
//       console.error('Error processing deposit:', error.response?.data || error.message);
//       setResponseMessage(error.response?.data?.message || 'Failed to process deposit. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         {rows.map((row, index) => (
//           <div key={index} className={styles.row}>
//             <label>Ad Account</label>
//             <input
//               type="text"
//               placeholder="Enter ads ID"
//               value={row.id}
//               onChange={(e) => handleInputChange(index, 'id', e.target.value)}
//               className={styles.input}
//             />
//             <label>Money</label>
//             <input
//               type="text"
//               placeholder="Enter charge money"
//               value={row.money}
//               onChange={(e) => handleInputChange(index, 'money', e.target.value)}
//               className={styles.input}
//             />
//             <button
//               className={styles.delete}
//               onClick={() => removeRow(index)}
//               disabled={rows.length === 1}
//             >
//               🗑
//             </button>
//           </div>
//         ))}
//         <button className={styles.addButton} onClick={addRow}>
//           Add Ads Deposit
//         </button>
//       </div>
//       <div className={styles.summary}>
//         <p>Total Deposit Of Ads: <strong>{totalDeposit.toFixed(2)} USD</strong></p>
//         <p>Total Cost: <strong>{totalCost.toFixed(2)} USD</strong></p>
//         <p>Wallet Balance: <strong>{walletAmount.toFixed(2)} USD</strong></p>
//       </div>
//       {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}
//       <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
//         {loading ? 'Processing...' : 'Charge'}
//       </button>
//     </div>
//   );
// };

// export default GoogleAdsDeposite;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './GoogleAdsDeposite.module.css';
// import Auth from '../Services/Auth';

// const GoogleAdsDeposite = () => {
//   const [rows, setRows] = useState([{ id: '', money: '' }]);
//   const [adsIds, setAdsIds] = useState([]); // Store Google Ads IDs
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletAmount, setWalletAmount] = useState(0);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch Google Ads history when the component mounts
//   useEffect(() => {
//     fetchWalletBalance();
//     fetchGoogleAdsHistory();
//   }, []);

//   // Fetch Wallet Balance
//   const fetchWalletBalance = async () => {
//     try {
//       const token = Auth.getToken();
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       const response = await axios.get('https://admediaagency.online/kimi/get-wallet-of-user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setWalletAmount(response.data.users.wallet || 0);
//     } catch (error) {
//       console.error('Error fetching wallet balance:', error);
//       setResponseMessage('Failed to fetch wallet balance.');
//     }
//   };

//   // Fetch Google Ads History (Ads ID)
//   const fetchGoogleAdsHistory = async () => {
//     try {
//       const token = Auth.getToken();
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       const response = await axios.get('https://admediaagency.online/kimi/get-google-ads-history', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Assuming the API returns an array of ad IDs
//       setAdsIds(response.data.ads.map(ad => ad.adNum));
//     } catch (error) {
//       console.error('Error fetching Google Ads history:', error);
//       setResponseMessage('Failed to fetch Google Ads history.');
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//     if (field === 'money') updateTotals(updatedRows);
//   };

//   const updateTotals = (rows) => {
//     const total = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
//     setTotalDeposit(total);
//     setTotalCost(total * 1.35); // Example calculation for cost
//   };

//   const addRow = () => {
//     setRows([...rows, { id: '', money: '' }]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) {
//       const updatedRows = rows.filter((_, i) => i !== index);
//       setRows(updatedRows);
//       updateTotals(updatedRows);
//     } else {
//       alert('At least one row is required!');
//     }
//   };

//   const handleCharge = async () => {
//     setLoading(true);

//     const isValid = rows.every(row => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0);
//     if (!isValid) {
//       setResponseMessage('Please ensure both adGoogleAccount and money are provided.');
//       setLoading(false);
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       setResponseMessage('User not authenticated.');
//       setLoading(false);
//       return;
//     }

//     const requestData = rows.map(row => ({
//       adGoogleAccount: row.id.trim(),
//       money: parseFloat(row.money.trim()) || 0,
//       adType: 'Google',
//     }));

//     console.log('Request Data:', JSON.stringify(requestData, null, 2));

//     try {
//       const responses = await Promise.all(
//         requestData.map(data =>
//           axios.post('https://admediaagency.online/kimi/create-google-adDeposit', data, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           })
//         )
//       );

//       let newWalletAmount = walletAmount;
//       responses.forEach(response => {
//         if (response.data) {
//           newWalletAmount = parseFloat(response.data.wallet) || newWalletAmount;
//         }
//       });

//       setWalletAmount(newWalletAmount);
//       setResponseMessage('Deposit added successfully!');
//     } catch (error) {
//       console.error('Error processing deposit:', error.response?.data || error.message);
//       setResponseMessage(error.response?.data?.message || 'Failed to process deposit. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         {rows.map((row, index) => (
//           <div key={index} className={styles.row}>
//             <label>Ad Account</label>
//             <select
//               value={row.id}
//               onChange={(e) => handleInputChange(index, 'id', e.target.value)}
//               className={styles.input}
//             >
//               <option value="">Select Google Ads ID</option>
//               {adsIds.map((adId) => (
//                 <option key={adId} value={adId}>
//                   {adId}
//                 </option>
//               ))}
//             </select>

//             <label>Money</label>
//             <input
//               type="text"
//               placeholder="Enter charge money"
//               value={row.money}
//               onChange={(e) => handleInputChange(index, 'money', e.target.value)}
//               className={styles.input}
//             />
//             <button
//               className={styles.delete}
//               onClick={() => removeRow(index)}
//               disabled={rows.length === 1}
//             >
//               🗑
//             </button>
//           </div>
//         ))}
//         <button className={styles.addButton} onClick={addRow}>
//           Add Ads Deposit
//         </button>
//       </div>

//       <div className={styles.summary}>
//         <p>Total Deposit Of Ads: <strong>{totalDeposit.toFixed(2)} USD</strong></p>
//         <p>Total Cost: <strong>{totalCost.toFixed(2)} USD</strong></p>
//         <p>Wallet Balance: <strong>{walletAmount.toFixed(2)} USD</strong></p>
//       </div>

//       {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}

//       <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
//         {loading ? 'Processing...' : 'Charge'}
//       </button>
//     </div>
//   );
// };

// export default GoogleAdsDeposite;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './GoogleAdsDeposite.module.css';
// import Auth from '../Services/Auth'; // Importing Auth for token

// const GoogleAdsDeposite = () => {
//   const [adsIds, setAdsIds] = useState([]);  // State to store Ads IDs
//   const [selectedAdId, setSelectedAdId] = useState('');  // State to store selected Ads ID
//   const [rows, setRows] = useState([{ id: '', money: '' }]); // Rows to hold the data (Ads ID and money)
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletAmount, setWalletAmount] = useState(0);
//   const [loading, setLoading] = useState(false);  // Loading state for API call
//   const [responseMessage, setResponseMessage] = useState('');

//   // Fetch Google Ads IDs on component mount
//   useEffect(() => {
//     fetchGoogleAdsIds();
//     fetchWalletBalance();
//   }, []);

//   const fetchGoogleAdsIds = async () => {
//     setLoading(true);
//     try {
//       const token = Auth.getToken();  // Get the authentication token from Auth service
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       // Make the API request with the authentication token
//       const response = await axios.get('https://admediaagency.online/kimi/get-ads-id?adType=Google', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data && response.data.adsIds) {
//         setAdsIds(response.data.adsIds); // Update state with Ads IDs
//       } else {
//         setResponseMessage('No Ads IDs found.');
//       }
//     } catch (error) {
//       console.error('Error fetching Google Ads IDs:', error);
//       setResponseMessage('Failed to fetch Ads IDs.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWalletBalance = async () => {
//     try {
//       const token = Auth.getToken();
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       const response = await axios.get('https://admediaagency.online/kimi/get-wallet-of-user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setWalletAmount(response.data.users.wallet || 0);
//     } catch (error) {
//       console.error('Error fetching wallet balance:', error);
//       setResponseMessage('Failed to fetch wallet balance.');
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//     if (field === 'money') updateTotals(updatedRows);
//   };

//   const updateTotals = (rows) => {
//     const total = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
//     setTotalDeposit(total);
//     setTotalCost(total * 1.35); // Example calculation for cost (if needed)
//   };

//   const addRow = () => {
//     setRows([...rows, { id: '', money: '' }]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) {
//       const updatedRows = rows.filter((_, i) => i !== index);
//       setRows(updatedRows);
//       updateTotals(updatedRows);
//     } else {
//       alert('At least one row is required!');
//     }
//   };

//   const handleCharge = async () => {
//     setLoading(true);

//     const isValid = rows.every(row => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0);
//     if (!isValid) {
//       setResponseMessage('Please ensure both Google Ads ID and money are provided.');
//       setLoading(false);
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       setResponseMessage('User not authenticated.');
//       setLoading(false);
//       return;
//     }

//     const requestData = rows.map(row => ({
//       adGoogleAccount: row.id.trim(),
//       money: parseFloat(row.money.trim()) || 0,
//       adType: 'Google',
//     }));

//     try {
//       const responses = await Promise.all(
//         requestData.map(data =>
//           axios.post('https://admediaagency.online/kimi/create-google-adDeposit', data, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           })
//         )
//       );

//       let newWalletAmount = walletAmount;
//       responses.forEach(response => {
//         if (response.data) {
//           newWalletAmount = parseFloat(response.data.wallet) || newWalletAmount;
//         }
//       });

//       setWalletAmount(newWalletAmount);
//       setResponseMessage('Deposit added successfully!');
//     } catch (error) {
//       console.error('Error processing deposit:', error.response?.data || error.message);
//       setResponseMessage(error.response?.data?.message || 'Failed to process deposit. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         {rows.map((row, index) => (
//           <div key={index} className={styles.row}>
//             <label>Ad Account</label>
//             <select
//               value={row.id}
//               onChange={(e) => handleInputChange(index, 'id', e.target.value)} // Ensure 'id' gets updated here
//               className={styles.input}
//             >
//               <option value="">Select Google Ads ID</option>
//               {adsIds.length > 0 ? (
//                 adsIds.map((adId) => (
//                   <option key={adId} value={adId}>
//                     {adId}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">No Ads IDs Available</option>
//               )}
//             </select>

//             <label>Money</label>
//             <input
//               type="text"
//               placeholder="Enter charge money"
//               value={row.money}
//               onChange={(e) => handleInputChange(index, 'money', e.target.value)}
//               className={styles.input}
//             />
//             <button
//               className={styles.delete}
//               onClick={() => removeRow(index)}
//               disabled={rows.length === 1}
//             >
//               🗑
//             </button>
//           </div>
//         ))}
//         <button className={styles.addButton} onClick={addRow}>
//           Add Ads Deposit
//         </button>
//       </div>

//       <div className={styles.summary}>
//         <p>Total Deposit Of Ads: <strong>{totalDeposit.toFixed(2)} USD</strong></p>
//         <p>Total Cost: <strong>{totalCost.toFixed(2)} USD</strong></p>
//         <p>Wallet Balance: <strong>{walletAmount.toFixed(2)} USD</strong></p>
//       </div>

//       {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}

//       <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
//         {loading ? 'Processing...' : 'Charge'}
//       </button>
//     </div>
//   );
// };

// export default GoogleAdsDeposite;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './GoogleAdsDeposite.module.css';
// import Auth from '../Services/Auth'; // Importing Auth for token

// const GoogleAdsDeposite = () => {
//   const [adsIds, setAdsIds] = useState([]);  // State to store Ads IDs
//   const [rows, setRows] = useState([{ id: '', money: '' }]); // Rows to hold the data (Ads ID and money)
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletAmount, setWalletAmount] = useState(0);
//   const [loading, setLoading] = useState(false);  // Loading state for API call
//   const [responseMessage, setResponseMessage] = useState('');

//   // Fetch Google Ads IDs and wallet balance on component mount
//   useEffect(() => {
//     fetchGoogleAdsIds();
//     fetchWalletBalance();
//   }, []);

//   const fetchGoogleAdsIds = async () => {
//     setLoading(true);
//     try {
//       const token = Auth.getToken();  // Get the authentication token from Auth service
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       // Make the API request with the authentication token
//       const response = await axios.get('https://admediaagency.online/kimi/get-ads-id?adType=Google', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data && response.data.adsIds) {
//         setAdsIds(response.data.adsIds); // Update state with Ads IDs
//       } else {
//         setResponseMessage('No Ads IDs found.');
//       }
//     } catch (error) {
//       console.error('Error fetching Google Ads IDs:', error);
//       setResponseMessage('Failed to fetch Ads IDs.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWalletBalance = async () => {
//     try {
//       const token = Auth.getToken();
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       const response = await axios.get('https://admediaagency.online/kimi/get-wallet-of-user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setWalletAmount(response.data.users.wallet || 0);
//     } catch (error) {
//       console.error('Error fetching wallet balance:', error);
//       setResponseMessage('Failed to fetch wallet balance.');
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//     if (field === 'money') updateTotals(updatedRows);
//   };

//   const updateTotals = (rows) => {
//     const total = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
//     setTotalDeposit(total);
//     setTotalCost(total * 1.35); // Example calculation for cost (if needed)
//   };

//   const addRow = () => {
//     setRows([...rows, { id: '', money: '' }]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) {
//       const updatedRows = rows.filter((_, i) => i !== index);
//       setRows(updatedRows);
//       updateTotals(updatedRows);
//     } else {
//       alert('At least one row is required!');
//     }
//   };

//   const handleCharge = async () => {
//     setLoading(true);

//     const isValid = rows.every(row => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0);
//     if (!isValid) {
//       setResponseMessage('Please ensure both Google Ads ID and money are provided.');
//       setLoading(false);
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       setResponseMessage('User not authenticated.');
//       setLoading(false);
//       return;
//     }

//     const requestData = rows.map(row => ({
//       adGoogleAccount: row.id.trim(),
//       money: parseFloat(row.money.trim()) || 0,
//       adType: 'Google',
//     }));

//     try {
//       const responses = await Promise.all(
//         requestData.map(data =>
//           axios.post('https://admediaagency.online/kimi/create-google-adDeposit', data, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           })
//         )
//       );

//       let newWalletAmount = walletAmount;
//       responses.forEach(response => {
//         if (response.data) {
//           newWalletAmount = parseFloat(response.data.wallet) || newWalletAmount;
//         }
//       });

//       setWalletAmount(newWalletAmount);
//       setResponseMessage('Deposit added successfully!');
//     } catch (error) {
//       console.error('Error processing deposit:', error.response?.data || error.message);
//       setResponseMessage(error.response?.data?.message || 'Failed to process deposit. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         {rows.map((row, index) => (
//           <div key={index} className={styles.row}>
//             <label>Ad Account</label>
//             <select
//               value={row.id}
//               onChange={(e) => handleInputChange(index, 'id', e.target.value)} // Ensure 'id' gets updated here
//               className={styles.input}
//             >
//               <option value="">Select Google Ads ID</option>
//               {adsIds.length > 0 ? (
//                 adsIds.map((adId) => (
//                   <option key={adId} value={adId}>
//                     {adId}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">No Ads IDs Available</option>
//               )}
//             </select>

//             <label>Money</label>
//             <input
//               type="text"
//               placeholder="Enter charge money"
//               value={row.money}
//               onChange={(e) => handleInputChange(index, 'money', e.target.value)}
//               className={styles.input}
//             />
//             <button
//               className={styles.delete}
//               onClick={() => removeRow(index)}
//               disabled={rows.length === 1}
//             >
//               🗑
//             </button>
//           </div>
//         ))}
//         <button className={styles.addButton} onClick={addRow}>
//           Add Ads Deposit
//         </button>
//       </div>

//       <div className={styles.summary}>
//         <p>Total Deposit Of Ads: <strong>{totalDeposit.toFixed(2)} USD</strong></p>
//         <p>Total Cost: <strong>{totalCost.toFixed(2)} USD</strong></p>
//         <p>Wallet Balance: <strong>{walletAmount.toFixed(2)} USD</strong></p>
//       </div>

//       {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}

//       <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
//         {loading ? 'Processing...' : 'Charge'}
//       </button>
//     </div>
//   );
// };

// export default GoogleAdsDeposite;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './GoogleAdsDeposite.module.css';
// import Auth from '../Services/Auth'; // Importing Auth for token

// const GoogleAdsDeposite = () => {
//   const [adsIds, setAdsIds] = useState([]);  // State to store Ads IDs
//   const [rows, setRows] = useState([{ id: '', money: '' }]); // Rows to hold the data (Ads ID and money)
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletAmount, setWalletAmount] = useState(0);
//   const [loading, setLoading] = useState(false);  // Loading state for API call
//   const [responseMessage, setResponseMessage] = useState('');

//   // Fetch Google Ads IDs and wallet balance on component mount
//   useEffect(() => {
//     fetchGoogleAdsIds();
//     fetchWalletBalance();
//   }, []);

//   const fetchGoogleAdsIds = async () => {
//     setLoading(true);
//     try {
//       const token = Auth.getToken();  // Get the authentication token from Auth service
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       // Make the API request with the authentication token
//       const response = await axios.get('https://admediaagency.online/kimi/get-ads-id?adType=Google', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data && response.data.adsIds) {
//         setAdsIds(response.data.adsIds); // Update state with Ads IDs
//       } else {
//         setResponseMessage('No Ads IDs found.');
//       }
//     } catch (error) {
//       console.error('Error fetching Google Ads IDs:', error);
//       setResponseMessage('Failed to fetch Ads IDs.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWalletBalance = async () => {
//     try {
//       const token = Auth.getToken();
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       const response = await axios.get('https://admediaagency.online/kimi/get-wallet-of-user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setWalletAmount(response.data.users.wallet || 0);
//     } catch (error) {
//       console.error('Error fetching wallet balance:', error);
//       setResponseMessage('Failed to fetch wallet balance.');
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//     if (field === 'money') updateTotals(updatedRows);
//   };

//   const updateTotals = (rows) => {
//     const total = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
//     setTotalDeposit(total);
//     setTotalCost(total * 1.35); // Example calculation for cost (if needed)
//   };

//   const addRow = () => {
//     setRows([...rows, { id: '', money: '' }]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) {
//       const updatedRows = rows.filter((_, i) => i !== index);
//       setRows(updatedRows);
//       updateTotals(updatedRows);
//     } else {
//       alert('At least one row is required!');
//     }
//   };

//   const handleCharge = async () => {
//     setLoading(true);

//     const isValid = rows.every(row => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0);
//     if (!isValid) {
//       setResponseMessage('Please ensure both Google Ads ID and money are provided.');
//       setLoading(false);
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       setResponseMessage('User not authenticated.');
//       setLoading(false);
//       return;
//     }

//     // Prepare request data
//     const requestData = rows.map(row => ({
//       adGoogleAccount: row.id.trim(),
//       money: parseFloat(row.money.trim()) || 0,
//       adType: 'Google',
//     }));

//     console.log('Request Data:', requestData); // Log the data before sending

//     try {
//       const responses = await Promise.all(
//         requestData.map(data =>
//           axios.post('https://admediaagency.online/kimi/create-google-adDeposit', data, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           })
//         )
//       );

//       let newWalletAmount = walletAmount;
//       responses.forEach(response => {
//         if (response.data) {
//           newWalletAmount = parseFloat(response.data.wallet) || newWalletAmount;
//         }
//       });

//       setWalletAmount(newWalletAmount);
//       setResponseMessage('Deposit added successfully!');
//     } catch (error) {
//       console.error('Error processing deposit:', error.response?.data || error.message);

//       // Check the error response for more details
//       if (error.response && error.response.data && error.response.data.message) {
//         setResponseMessage(error.response.data.message);
//       } else {
//         setResponseMessage('Failed to process deposit. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         {rows.map((row, index) => (
//           <div key={index} className={styles.row}>
//             <label>Ad Account</label>
//             <select
//               value={row.id}
//               onChange={(e) => handleInputChange(index, 'id', e.target.value)} // Ensure 'id' gets updated here
//               className={styles.input}
//             >
//               <option value="">Select Google Ads ID</option>
//               {adsIds.length > 0 ? (
//                 adsIds.map((adId) => (
//                   <option key={adId} value={adId}>
//                     {adId}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">No Ads IDs Available</option>
//               )}
//             </select>

//             <label>Money</label>
//             <input
//               type="text"
//               placeholder="Enter charge money"
//               value={row.money}
//               onChange={(e) => handleInputChange(index, 'money', e.target.value)}
//               className={styles.input}
//             />
//             <button
//               className={styles.delete}
//               onClick={() => removeRow(index)}
//               disabled={rows.length === 1}
//             >
//               🗑
//             </button>
//           </div>
//         ))}
//         <button className={styles.addButton} onClick={addRow}>
//           Add Ads Deposit
//         </button>
//       </div>

//       <div className={styles.summary}>
//         <p>Total Deposit Of Ads: <strong>{totalDeposit.toFixed(2)} USD</strong></p>
//         <p>Total Cost: <strong>{totalCost.toFixed(2)} USD</strong></p>
//         <p>Wallet Balance: <strong>{walletAmount.toFixed(2)} USD</strong></p>
//       </div>

//       {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}

//       <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
//         {loading ? 'Processing...' : 'Charge'}
//       </button>
//     </div>
//   );
// };

// export default GoogleAdsDeposite;

//      // working
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './GoogleAdsDeposite.module.css';
// import Auth from '../Services/Auth'; // Importing Auth for token

// const GoogleAdsDeposite = () => {
//   const [adsIds, setAdsIds] = useState([]); // State to store Ads IDs
//   const [rows, setRows] = useState([{ id: '', money: '' }]); // Rows to hold the data (Ads ID and money)
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);
//   const [walletAmount, setWalletAmount] = useState(0);
//   const [loading, setLoading] = useState(false); // Loading state for API call
//   const [responseMessage, setResponseMessage] = useState('');

//   // Fetch Google Ads IDs and wallet balance on component mount
//   useEffect(() => {
//     fetchGoogleAdsIds();
//     fetchWalletBalance();
//   }, []);

//   const fetchGoogleAdsIds = async () => {
//     setLoading(true);
//     try {
//       const token = Auth.getToken(); // Get the authentication token from Auth service
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       // Make the API request with the authentication token
//       const response = await axios.get('https://admediaagency.online/kimi/get-ads-id?adType=Google', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data && response.data.adsIds) {
//         setAdsIds(response.data.adsIds); // Update state with Ads IDs
//       } else {
//         setResponseMessage('No Ads IDs found.');
//       }
//     } catch (error) {
//       console.error('Error fetching Google Ads IDs:', error);
//       setResponseMessage('Failed to fetch Ads IDs.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWalletBalance = async () => {
//     try {
//       const token = Auth.getToken();
//       if (!token) {
//         setResponseMessage('User not authenticated.');
//         return;
//       }

//       const response = await axios.get('https://admediaagency.online/kimi/get-wallet-of-user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setWalletAmount(response.data.users.wallet || 0);
//     } catch (error) {
//       console.error('Error fetching wallet balance:', error);
//       setResponseMessage('Failed to fetch wallet balance.');
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//     if (field === 'money') updateTotals(updatedRows);
//   };

//   const updateTotals = (rows) => {
//     const total = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
//     setTotalDeposit(total);
//     setTotalCost(total * 1.35); // Example calculation for cost (if needed)
//   };

//   const addRow = () => {
//     setRows([...rows, { id: '', money: '' }]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) {
//       const updatedRows = rows.filter((_, i) => i !== index);
//       setRows(updatedRows);
//       updateTotals(updatedRows);
//     } else {
//       alert('At least one row is required!');
//     }
//   };

//   const handleCharge = async () => {
//     setLoading(true);

//     // Validate inputs
//     const isValid = rows.every(
//       (row) => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0
//     );
//     if (!isValid) {
//       setResponseMessage('Please ensure both Google Ads ID and money are provided.');
//       setLoading(false);
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       setResponseMessage('User not authenticated.');
//       setLoading(false);
//       return;
//     }

//     // Prepare request data
//     const requestData = rows.map((row) => ({
//       adGoogleAccount: row.id.trim(),
//       money: parseFloat(row.money.trim()) || 0,
//       adType: 'Google',
//     }));

//     console.log('Request Payload:', requestData); // Debugging: Log the payload

//     try {
//       const response = await axios.post(
//         'https://admediaagency.online/kimi/create-google-adDeposit',
//         requestData, // Send the entire array of deposits
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data) {
//         setWalletAmount(response.data.wallet || walletAmount);
//         setResponseMessage('Deposit added successfully!');
//       }
//     } catch (error) {
//       console.error('Error processing deposit:', error.response?.data || error.message);
//       setResponseMessage(
//         error.response?.data?.message || 'Failed to process deposit. Please check the data and try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.form}>
//         {rows.map((row, index) => (
//           <div key={index} className={styles.row}>
//             <label>Ad Account</label>
//             <select
//               value={row.id}
//               onChange={(e) => handleInputChange(index, 'id', e.target.value)}
//               className={styles.input}
//             >
//               <option value="">Select Google Ads ID</option>
//               {adsIds.length > 0 ? (
//                 adsIds.map((adId) => (
//                   <option key={adId} value={adId}>
//                     {adId}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">No Ads IDs Available</option>
//               )}
//             </select>

//             <label>Money</label>
//             <input
//               type="text"
//               placeholder="Enter charge money"
//               value={row.money}
//               onChange={(e) => handleInputChange(index, 'money', e.target.value)}
//               className={styles.input}
//             />
//             <button
//               className={styles.delete}
//               onClick={() => removeRow(index)}
//               disabled={rows.length === 1}
//             >
//               🗑
//             </button>
//           </div>
//         ))}
//         <button className={styles.addButton} onClick={addRow}>
//           Add Ads Deposit
//         </button>
//       </div>

//       <div className={styles.summary}>
//         <p>Total Deposit Of Ads: <strong>{totalDeposit.toFixed(2)} USD</strong></p>
//         <p>Total Cost: <strong>{totalCost.toFixed(2)} USD</strong></p>
//         <p>Wallet Balance: <strong>{walletAmount.toFixed(2)} USD</strong></p>
//       </div>

//       {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}

//       <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
//         {loading ? 'Processing...' : 'Charge'}
//       </button>
//     </div>
//   );
// };

// export default GoogleAdsDeposite;




=======
>>>>>>> 2421bee99bad1b0e54a69be6b0b06a0077358b8a
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './GoogleAdsDeposite.module.css';
import Auth from '../Services/Auth'; // Importing Auth for token

const GoogleAdsDeposite = () => {
  const [adsIds, setAdsIds] = useState([]); // State to store Ads IDs
  const [rows, setRows] = useState([{ id: '', money: '' }]); // Rows to hold the data (Ads ID and money)
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [responseMessage, setResponseMessage] = useState('');
<<<<<<< HEAD

  // Fetch Google Ads IDs and wallet balance on component mount
  useEffect(() => {
    fetchGoogleAdsIds();
    fetchWalletBalance();
  }, []);

  const fetchGoogleAdsIds = async () => {
    setLoading(true);
    try {
      const token = Auth.getToken(); // Get the authentication token from Auth service
=======
  const [loading, setLoading] = useState(false);
  const [adsIds, setAdsIds] = useState([]);

  useEffect(() => {
    fetchAdsIds();
    fetchWalletBalance();
  }, []);

  const fetchAdsIds = async () => {
    try {
      const token = Auth.getToken();
>>>>>>> 2421bee99bad1b0e54a69be6b0b06a0077358b8a
      if (!token) {
        setResponseMessage('User not authenticated.');
        return;
      }

<<<<<<< HEAD
      // Make the API request with the authentication token
      const response = await axios.get('https://admediaagency.online/kimi/get-ads-id?adType=Google', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.adsIds) {
        setAdsIds(response.data.adsIds); // Update state with Ads IDs
      } else {
        setResponseMessage('No Ads IDs found.');
      }
    } catch (error) {
      console.error('Error fetching Google Ads IDs:', error);
      setResponseMessage('Failed to fetch Ads IDs.');
    } finally {
      setLoading(false);
=======
      const response = await axios.get('https://admediaagency.online/kimi/get-ads-id', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          adType: 'Google' // You can replace this with a dynamic value if needed
        },
      });

      setAdsIds(response.data.adsIds);
    } catch (error) {
      console.error('Error fetching ads IDs:', error);
      setResponseMessage('Failed to fetch ads IDs.');
>>>>>>> 2421bee99bad1b0e54a69be6b0b06a0077358b8a
    }
  };

  const fetchWalletBalance = async () => {
    try {
      const token = Auth.getToken();
      if (!token) {
        setResponseMessage('User not authenticated.');
        return;
      }

      const response = await axios.get('https://admediaagency.online/kimi/get-wallet-of-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
<<<<<<< HEAD

=======
>>>>>>> 2421bee99bad1b0e54a69be6b0b06a0077358b8a
      setWalletAmount(response.data.users.wallet || 0);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      setResponseMessage('Failed to fetch wallet balance.');
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    if (field === 'money') updateTotals(updatedRows);
  };

  const updateTotals = (rows) => {
    const total = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
    setTotalDeposit(total);
<<<<<<< HEAD
    setTotalCost(total * 1.35); // Example calculation for cost (if needed)
=======
    setTotalCost(total * 1.35); 
>>>>>>> 2421bee99bad1b0e54a69be6b0b06a0077358b8a
  };

  const addRow = () => {
    setRows([...rows, { id: '', money: '' }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
      updateTotals(updatedRows);
    } else {
      alert('At least one row is required!');
    }
  };

  const handleCharge = async () => {
    setLoading(true);
    setResponseMessage('');

    // Validate inputs
    const isValid = rows.every(
      (row) => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0
    );
    if (!isValid) {
<<<<<<< HEAD
      setResponseMessage('Please ensure both Google Ads ID and money are provided.');
=======
      setResponseMessage('Please ensure both adsId and money are provided.');
      setLoading(false);
      return;
    }

    if (totalDeposit > walletAmount) {
      setResponseMessage('Insufficient wallet balance. Please recharge.');
>>>>>>> 2421bee99bad1b0e54a69be6b0b06a0077358b8a
      setLoading(false);
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      setResponseMessage('User not authenticated.');
      setLoading(false);
      return;
    }

<<<<<<< HEAD
    // Prepare request data
    const requestData = rows.map((row) => ({
      adGoogleAccount: row.id.trim(),
      money: parseFloat(row.money.trim()) || 0,
      adType: 'Google', // Ensure this matches exactly what the backend expects
    }));
=======
    const requestData = {
      adsId: rows[0].id.trim(), 
      money: parseFloat(rows[0].money.trim()) || 0,
      adType: 'Google',
    };
>>>>>>> 2421bee99bad1b0e54a69be6b0b06a0077358b8a

    // Debugging: Log the payload to ensure the data is correct
    console.log('Request Payload:', requestData); // Debugging the request payload

    try {
      const response = await axios.post(
        'https://admediaagency.online/kimi/create-google-adDeposit',
        requestData, // Send the entire array of deposits
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        setWalletAmount(response.data.wallet || walletAmount);
        setResponseMessage('Deposit added successfully!');
      }
    } catch (error) {
      console.error('Error processing deposit:', error.response?.data || error.message);
      setResponseMessage(
        error.response?.data?.message || 'Failed to process deposit. Please check the data and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {rows.map((row, index) => (
          <div key={index} className={styles.row}>
            <label>Ad Account</label>
            <select
              value={row.id}
              onChange={(e) => handleInputChange(index, 'id', e.target.value)}
              className={styles.input}
            >
<<<<<<< HEAD
              <option value="">Select Google Ads ID</option>
              {adsIds.length > 0 ? (
                adsIds.map((adId) => (
                  <option key={adId} value={adId}>
                    {adId}
                  </option>
                ))
              ) : (
                <option value="">No Ads IDs Available</option>
              )}
            </select>

=======
              <option value="">Select Ads ID</option>
              {adsIds.map((adsId, idx) => (
                <option key={idx} value={adsId}>{adsId}</option>
              ))}
            </select>
>>>>>>> 2421bee99bad1b0e54a69be6b0b06a0077358b8a
            <label>Money</label>
            <input
              type="text"
              placeholder="Enter charge money"
              value={row.money}
              onChange={(e) => handleInputChange(index, 'money', e.target.value)}
              className={styles.input}
            />
            <button
              className={styles.delete}
              onClick={() => removeRow(index)}
              disabled={rows.length === 1}
            >
              🗑
            </button>
          </div>
        ))}
        <button className={styles.addButton} onClick={addRow}>
          Add Ads Deposit
        </button>
      </div>

      <div className={styles.summary}>
        <p>Total Deposit Of Ads: <strong>{totalDeposit.toFixed(2)} USD</strong></p>
        <p>Total Cost: <strong>{totalCost.toFixed(2)} USD</strong></p>
        <p>Wallet Balance: <strong>{walletAmount.toFixed(2)} USD</strong></p>
      </div>

      {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}

      <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
        {loading ? 'Processing...' : 'Charge'}
      </button>
    </div>
  );
};

export default GoogleAdsDeposite;
