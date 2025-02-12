import styles from "./AddmoneyTable.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpServices from "../Services/Httpservices.jsx";
import Auth from "../Services/Auth.js";

const AddMoneyTable = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalData, setModalData] = useState({
    payway: "USDT",
    chargeMoney: "",
    transactionId: "",
    image: null,
  });

  // Fetch transaction data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await httpServices.get("/get-transaction-details");
        setTransactions(response.data.transactions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddMoney = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const authData = Auth.getAuthData();

      if (!authData || !authData.token) {
        alert("Please login to proceed!");
        return;
      }

      const token = authData.token;
      const formData = new FormData();
      formData.append("userId", authData.userId);
      formData.append("applyId", "dcorehost4193815995807");
      formData.append("chargeMoney", parseFloat(modalData.chargeMoney));
      formData.append("transactionId", modalData.transactionId);
      formData.append("state", "Pending");
      formData.append("payway", modalData.payway);
      if (modalData.image) {
        formData.append("photo", modalData.image);
      }

      const response = await httpServices.post("/add-money", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Money added successfully!");
        setIsModalOpen(false);
      } else {
        alert(`Failed to add money. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding money:", error);
      alert("An error occurred while adding money.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModalData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleAddMoney}>
        Add Money Here
      </button>

      <div className={styles.tableContainer}>
        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apply ID</th>
                <th>Charge Money</th>
                <th>Transaction ID</th>
                <th>State</th>
                <th>Image</th>
                <th>Payway</th>
                <th>Create Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((row, index) => (
                <tr key={index}>
                  <td>{row.applyId}</td>
                  <td>${row.chargeMoney}</td>
                  <td>{row.transactionId}</td>
                  <td>{row.state}</td>
                  <td>
                    <img
                      src={row.image}
                      alt="Transaction"
                      className={styles.image}
                    />
                  </td>
                  <td>{row.payway}</td>
                  <td>{new Date(row.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Popup for Add Money */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirm Add Money Details</h2>
            <div className={styles.modalBody}>
              <label htmlFor="payway">Payway:</label>
              <select
                id="payway"
                name="payway"
                value={modalData.payway}
                onChange={handleChange}
                className={styles.inputField}
              >
                <option value="USDT">USDT</option>
                <option value="Pay Link">Pay Link</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="PayPal">PayPal</option>
              </select>

              {/* Show network details only if USDT is selected */}
              {modalData.payway === "USDT" && (
                <div className={styles.networkDetails}>
                  <p>
                    <strong>Network Name:</strong> TRC20
                  </p>
                  <p>
                    <strong>Network Address:</strong>{" "}
                    TXw1JKXqHhT1b7xUSbH1K7qF3RJpCJ2Zx7
                  </p>
                </div>
              )}

              <label htmlFor="chargeMoney">Charge Money:</label>
              <input
                type="number"
                id="chargeMoney"
                name="chargeMoney"
                value={modalData.chargeMoney}
                onChange={handleChange}
                placeholder="Enter Amount"
                className={styles.inputField}
              />

              <label htmlFor="transactionId">Transaction ID:</label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                value={modalData.transactionId}
                onChange={handleChange}
                placeholder="Enter Transaction ID"
                className={styles.inputField}
              />

              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="photo"
                name="image"
                onChange={handleImageUpload}
                className={styles.inputField}
              />
              {modalData.image && <p>Uploaded Image: {modalData.image.name}</p>}
            </div>

            <div className={styles.modalActions}>
              <button className={styles.modalButton} onClick={handleCloseModal}>
                Cancel
              </button>
              <button className={styles.modalButton} onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMoneyTable;
