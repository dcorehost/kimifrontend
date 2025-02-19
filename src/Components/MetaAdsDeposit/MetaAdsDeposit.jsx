import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MetaAdsDeposit.module.css';
import Auth from '../Services/Auth';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const MetaAdsDeposit = () => {
  const [rows, setRows] = useState([{ id: '', money: '' }]);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [adsIds, setAdsIds] = useState([]);

  useEffect(() => {
    fetchAdsIds();
    fetchWalletBalance();
  }, []);

  const fetchAdsIds = async () => {
    try {
      const token = Auth.getToken();
      if (!token) {
        setResponseMessage('User not authenticated.');
        return;
      }

      const response = await axios.get('https://admediaagency.online/kimi/get-ads-id', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          adType: 'Facebook' 
        },
      });

      setAdsIds(response.data.adsIds);
    } catch (error) {
      console.error('Error fetching ads IDs:', error);
      setResponseMessage('Failed to fetch ads IDs.');
      toast.error('Failed to fetch ads IDs.');
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
      setWalletAmount(response.data.users.wallet || 0);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      setResponseMessage('Failed to fetch wallet balance.');
      toast.error('Failed to fetch wallet balance.');
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
    setTotalCost(total * 1.35); 
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

    const isValid = rows.every(row => row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0);
    if (!isValid) {
      setResponseMessage('Please ensure both adsId and money are provided.');
      setLoading(false);
      toast.error('Please ensure both adsId and money are provided.');
      return;
    }

    if (totalDeposit > walletAmount) {
      setResponseMessage('Insufficient wallet balance. Please recharge.');
      setLoading(false);
      toast.error('Insufficient wallet balance. Please recharge.');
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      setResponseMessage('User not authenticated.');
      setLoading(false);
      toast.error('User not authenticated.');
      return;
    }

    const requests = rows.map(row => ({
      adsId: row.id.trim(),
      money: parseFloat(row.money.trim()) || 0,
      adType: 'Facebook',
    }));

    try {
      const responses = await Promise.all(
        requests.map((requestData) =>
          axios.post(
            'https://admediaagency.online/kimi/create-facebook-adDeposit',
            requestData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          )
        )
      );

      let totalDeposit = 0;
      let totalCost = 0;
      let walletAmount = 0;

      responses.forEach(response => {
        if (response.data) {
          totalDeposit += parseFloat(response.data.totalDeposit) || 0;
          totalCost += parseFloat(response.data.totalCost) || 0;
          walletAmount = parseFloat(response.data.wallet) || 0; 
        }
      });

      setTotalDeposit(totalDeposit);
      setTotalCost(totalCost);
      setWalletAmount(walletAmount);
      setResponseMessage('Deposit added successfully!');
      toast.success('Deposit added successfully!');
    } catch (error) {
      console.error('Error processing deposit:', error.response?.data || error.message);
      setResponseMessage(error.response?.data?.message || 'Failed to process deposit. Please try again.');
      toast.error('Failed to process deposit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer /> 
      <div className={styles.form}>
        {rows.map((row, index) => (
          <div key={index} className={styles.row}>
            <label>Ad Account</label>
            <select
              value={row.id}
              onChange={(e) => handleInputChange(index, 'id', e.target.value)}
              className={styles.input}
            >
              <option value="">Select Ads ID</option>
              {adsIds.map((adsId, idx) => (
                <option key={idx} value={adsId}>{adsId}</option>
              ))}
            </select>
            <label>Money</label>
            <input
              type="text"
              placeholder="Enter deposit amount"
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
        <p>Total Deposit Of Ads: <strong>${totalDeposit.toFixed(2)}</strong></p>
        <p>Total Cost: <strong>${totalCost.toFixed(2)}</strong></p>
        <p>Wallet Balance: <strong>${walletAmount.toFixed(2)}</strong></p>
      </div>
      {responseMessage && <div className={styles.responseMessage}><p>{responseMessage}</p></div>}
      <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
        {loading ? 'Processing...' : 'Charge'}
      </button>
    </div>
  );
};

export default MetaAdsDeposit;
