




import React, { useState } from 'react';
import axios from 'axios';
import styles from './GoogleAdsDeposite.module.css';
import Auth from '../Services/Auth';

const GoogleAdsDeposite = () => {
  const [rows, setRows] = useState([{ id: '', money: '' }]);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    if (field === 'money') updateTotals(updatedRows);
  };

  const updateTotals = (rows) => {
    const total = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
    setTotalDeposit(total);
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

    const isValid = rows.every(row => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0);
    if (!isValid) {
      setResponseMessage('Please ensure both adGoogleAccount and money are provided.');
      setLoading(false);
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      setResponseMessage('User not authenticated.');
      setLoading(false);
      return;
    }

    // Prepare the request data
    const requestData = {
      adGoogleAccount: rows[0].id.trim(),
      money: parseFloat(rows[0].money.trim()) || 0,  // Make sure money is a number
      adType: 'Google',
    };

    // Log request data for debugging
    console.log('Request Data:', JSON.stringify(requestData, null, 2));

    try {
      const response = await axios.post(
        'http://admediaagency.online/kimi/create-google-adDeposit',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle response
      if (response?.data) {
        console.log('Response:', response.data);
        setResponseMessage(response.data.message);
        setWalletAmount(parseFloat(response.data.wallet) || 0);
        setTotalDeposit(parseFloat(response.data.totalDeposit) || 0);
        setTotalCost(parseFloat(response.data.totalCost) || 0);
      }
    } catch (error) {
      console.error('Error processing deposit:', error.response?.data || error.message);
      setResponseMessage(error.response?.data?.message || 'Failed to process deposit. Please try again.');
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
            <input
              type="text"
              placeholder="Enter ads ID"
              value={row.id}
              onChange={(e) => handleInputChange(index, 'id', e.target.value)}
              className={styles.input}
            />
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




// import React, { useState } from 'react';
// import styles from './GoogleAdsDeposite.module.css';

// const GoogleAdsDeposite = () => {
//   const [rows, setRows] = useState([{ id: '', money: '' }]);
//   const [totalDeposit, setTotalDeposit] = useState(0);
//   const [totalCost, setTotalCost] = useState(0);

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value; // No validation for money field
//     setRows(updatedRows);
//     if (field === 'money') updateTotals(updatedRows);
//   };

//   const updateTotals = (rows) => {
//     const total = rows.reduce((sum, row) => sum + parseFloat(row.money || 0), 0);
//     setTotalDeposit(total);
//   };

//   const addRow = () => {
//     setRows([...rows, { id: '', money: '' }]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) { // Ensure at least one row remains
//       const updatedRows = rows.filter((_, i) => i !== index);
//       setRows(updatedRows);
//       updateTotals(updatedRows);
//     } else {
//       alert('At least one row is required!');
//     }
//   };

//   const handleCharge = () => {
//     setTotalCost(totalDeposit); // Example: Total cost equals total deposit
//     alert('Charged successfully!');
//   };

//   return (
//     <div className={styles.container}>
//       {/* <h1>Google Ads Deposit</h1> */}
//       <div className={styles.form}>
//         {rows.map((row, index) => (
//           <div key={index} className={styles.row}>
//             {/* Ads ID Input */}
//             <lable>Ad Account</lable>
//             <input
//               type="text"
//               placeholder="Enter ads ID"
//               value={row.id}
//               onChange={(e) => handleInputChange(index, 'id', e.target.value)}
//               className={styles.input}
//             />
//             {/* Money Input */}
//             <lable>Money</lable>
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
//               disabled={rows.length === 1} // Disable delete button if only one row exists
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
//       </div>
//       <button className={styles.chargeButton} onClick={handleCharge}>
//         Charge
//       </button>
//     </div>
//   );
// };

// export default GoogleAdsDeposite;

