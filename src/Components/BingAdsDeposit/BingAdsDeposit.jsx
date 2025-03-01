
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BingAdsDeposit.module.css';
import Auth from '../Services/Auth';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const BingAdsDeposit = () => {
  const [rows, setRows] = useState([{ id: '', money: '' }]);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [topUpFee, setTopUpFee] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
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
        toast.error('User not authenticated.');
        return;
      }

      const response = await axios.get('https://admediaagency.online/kimi/get-ads-id', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          adType: 'Bing',
        },
      });

      setAdsIds(response.data.adsIds);
    } catch (error) {
      toast.error('Failed to fetch ads IDs.');
    }
  };

  const fetchWalletBalance = async () => {
    try {
      const token = Auth.getToken();
      if (!token) {
        toast.error('User not authenticated.');
        return;
      }

      const response = await axios.get('https://admediaagency.online/kimi/get-wallet-of-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWalletAmount(response.data.users.wallet || 0);
    } catch (error) {
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
    const totalDeposit = rows.reduce((sum, row) => sum + (parseFloat(row.money) || 0), 0);
    const topUpFee = totalDeposit * 0.15; // ✅ 15% of deposit
    const totalCost = totalDeposit + topUpFee; // ✅ Total Cost = Deposit + Top-Up Fee

    setTotalDeposit(totalDeposit);
    setTopUpFee(topUpFee); // ✅ Update top-up fee state
    setTotalCost(totalCost);
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
      toast.warning('At least one row is required!');
    }
  };

  const handleCharge = async () => {
    setLoading(true);

    const isValid = rows.every(
      (row) =>
        row.id.trim() && !isNaN(parseFloat(row.money.trim())) && parseFloat(row.money.trim()) > 0
    );
    if (!isValid) {
      toast.error('Please ensure both adsId and money are provided.');
      setLoading(false);
      return;
    }

    if (totalCost > walletAmount) {
      toast.error('Insufficient wallet balance. Please recharge.');
      setLoading(false);
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      toast.error('User not authenticated.');
      setLoading(false);
      return;
    }

    const requestData = {
      adsId: rows[0].id.trim(),
      money: parseFloat(rows[0].money.trim()) || 0,
      adType: 'Bing',
    };

    try {
      const response = await axios.post(
        'https://admediaagency.online/kimi/create-bing-adDeposit',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response?.data) {
        toast.success(response.data.message);
        setWalletAmount(parseFloat(response.data.wallet) || 0);
        setTotalDeposit(parseFloat(response.data.totalDeposit) || 0);
        setTopUpFee(parseFloat(response.data.totalCost) - parseFloat(response.data.totalDeposit)); // ✅ Extract top-up fee
        setTotalCost(parseFloat(response.data.totalCost) || 0);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process deposit. Please try again.');
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
        <p>Total Deposit Of Ads: <strong>{totalDeposit.toFixed(2)} USD</strong></p>
        <p>Top-Up Fee (15%): <strong>{topUpFee.toFixed(2)} USD</strong></p> {/* ✅ NEW LINE */}
        <p>Total Cost: <strong>{totalCost.toFixed(2)} USD</strong></p>
        <p>Wallet Balance: <strong>{walletAmount.toFixed(2)} USD</strong></p>
      </div>
      <button className={styles.chargeButton} onClick={handleCharge} disabled={loading}>
        {loading ? 'Processing...' : 'Charge'}
      </button>
    </div>
  );
};

export default BingAdsDeposit;
