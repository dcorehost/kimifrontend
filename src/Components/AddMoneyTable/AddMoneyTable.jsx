


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpServices from "../Services/Httpservices.jsx";
import Auth from "../Services/Auth.js";
import styles from "./AddMoneyTable.module.css";

const AddMoneyTable = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    payway: "USDT",
    chargeMoney: "",
    transactionId: "",
    image: null, // image will hold the actual file
  });

  const handleNextPage = () => {
    navigate("/next-page");
  };

  const handleAddMoney = () => {
    setIsModalOpen(true); // Open the modal when the Add Money Here button is clicked
  };

  const handleExportExcel = () => {
    alert("Export to Excel clicked");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleConfirm = async () => {
    try {
      const authData = Auth.getAuthData(); // Get the AuthData from Auth service

      if (!authData || !authData.token) {
        alert("Please login to proceed!");
        return;
      }

      const token = authData.token; // Get the token from the AuthData object

      // Prepare the data to send to the API
      const formData = new FormData();
      formData.append("userId", authData.userId); // User ID from Auth service
      formData.append("applyId", "dcorehost4193815995807"); // Generate or fetch dynamically as needed
      formData.append("chargeMoney", parseFloat(modalData.chargeMoney)); // Ensure it's a valid number
      formData.append("transactionId", modalData.transactionId);
      formData.append("state", "Pending"); // Static state, could be dynamic
      formData.append("payway", modalData.payway);
      
      if (modalData.image) {
        formData.append("image", modalData.image); // Append the image file here
      } else {
        alert("Please upload an image.");
        return;
      }

      // Log FormData contents for debugging
      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Make the API POST request
      const response = await httpServices.post(
        "http://13.127.161.242:8001/kimi/add-money",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );

      if (response.status === 200) {
        alert("Money added successfully!");
        setIsModalOpen(false); // Close the modal on success
      } else {
        // Handle the case where the response is not OK
        alert(`Failed to add money. Status: ${response.status}`);
        console.log('Response:', response.data);
      }
    } catch (error) {
      console.error("Error adding money:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response Error:", error.response.data);
        alert(`An error occurred: ${error.response.data.message || 'Internal Server Error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request
        console.error("Request Error:", error.message);
        alert("An error occurred while setting up the request.");
      }
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
      // Validate file type if necessary (for example, only images)
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      setModalData((prevData) => ({
        ...prevData,
        image: file, // Save the file object instead of the file name
      }));
    }
  };

  const data = [
    {
      applyId: "APP001",
      chargeMoney: "$100",
      transactionId: "TXN001",
      state: "Pending",
      image: "image1.png",
      payway: "Credit Card",
      createTime: "2025-01-01",
    },
    {
      applyId: "APP002",
      chargeMoney: "$200",
      transactionId: "TXN002",
      state: "Approved",
      image: "image2.png",
      payway: "PayPal",
      createTime: "2025-01-02",
    },
    {
      applyId: "APP003",
      chargeMoney: "$150",
      transactionId: "TXN003",
      state: "Reject",
      image: "image3.png",
      payway: "Bank Transfer",
      createTime: "2025-01-03",
    },
  ];

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleAddMoney}>
        Add Money Here
      </button>

      <a
        href="#"
        className={`${styles.button} ${styles.exportButton}`}
        onClick={handleExportExcel}
      >
        Export Excel
      </a>

      <div className={styles.tableContainer}>
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
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.applyId}</td>
                <td>{row.chargeMoney}</td>
                <td>{row.transactionId}</td>
                <td>{row.state}</td>
                <td>
                  <img src={row.image} alt="image" className={styles.image} />
                </td>
                <td>{row.payway}</td>
                <td>{row.createTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
              <br />
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
              <br />
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
              <br />
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageUpload}
                className={styles.inputField}
              />
              {modalData.image && (
                <p>Uploaded Image: {modalData.image.name}</p>
              )}
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





