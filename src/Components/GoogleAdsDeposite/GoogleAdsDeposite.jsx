import React, { useState } from 'react';
import styles from './GoogleAdsDeposite.module.css';

const GoogleAdsDeposite = () => {
  const [rows, setRows] = useState([{ id: '', money: '' }]);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value; // No validation for money field
    setRows(updatedRows);
    if (field === 'money') updateTotals(updatedRows);
  };

  const updateTotals = (rows) => {
    const total = rows.reduce((sum, row) => sum + parseFloat(row.money || 0), 0);
    setTotalDeposit(total);
  };

  const addRow = () => {
    setRows([...rows, { id: '', money: '' }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) { // Ensure at least one row remains
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
      updateTotals(updatedRows);
    } else {
      alert('At least one row is required!');
    }
  };

  const handleCharge = () => {
    setTotalCost(totalDeposit); // Example: Total cost equals total deposit
    alert('Charged successfully!');
  };

  return (
    <div className={styles.container}>
      {/* <h1>Google Ads Deposit</h1> */}
      <div className={styles.form}>
        {rows.map((row, index) => (
          <div key={index} className={styles.row}>
            {/* Ads ID Input */}
            <lable>Ad Account</lable>
            <input
              type="text"
              placeholder="Enter ads ID"
              value={row.id}
              onChange={(e) => handleInputChange(index, 'id', e.target.value)}
              className={styles.input}
            />
            {/* Money Input */}
            <lable>Money</lable>
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
              disabled={rows.length === 1} // Disable delete button if only one row exists
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
      </div>
      <button className={styles.chargeButton} onClick={handleCharge}>
        Charge
      </button>
    </div>
  );
};

export default GoogleAdsDeposite;
