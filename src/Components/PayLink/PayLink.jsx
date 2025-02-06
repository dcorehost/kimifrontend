
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PayLink.module.css";

const PayLink = () => {
  const [paylinks, setPaylinks] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    country: "",
    money: "",
    companyName: "",
    website: "",
    paylinkType: "Individual",  
  });

  const userToken = localStorage.getItem("userToken"); 

  useEffect(() => {
    const fetchPaylinks = async () => {
      try {
        const response = await axios.get("https://admediaagency.online/kimi/get-paylinks", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.data.message === "paylinks fetched successfully") {
          setPaylinks(response.data.paylinks);
        } else {
          setError("Failed to fetch paylinks.");
        }
      } catch (err) {
        setError("An error occurred while fetching paylinks.");
      }
    };
    fetchPaylinks();
  }, [userToken]);

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      firstName: "",
      lastName: "",
      emailId: "",
      country: "",
      money: "",
      companyName: "",
      website: "",
      paylinkType: "Individual",
    });
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaylinkSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const apiUrl = formData.paylinkType === "Company" 
      ? "https://admediaagency.online/kimi/create-paylink-company" 
      : "https://admediaagency.online/kimi/create-paylink-individual";

    const requestData = formData.paylinkType === "Company" 
      ? formData 
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.emailId,
          country: formData.country,
          money: parseFloat(formData.money),
        };

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, 
        },
      });

      if (response.data.message.includes("Paylink created successfully")) {
        setShowModal(false);
        setSuccessMessage("Paylink created successfully!");
        setPaylinks((prevData) => [...prevData, response.data.newPaylink]);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError("Failed to create paylink.");
      }
    } catch (err) {
      setError("An error occurred while creating paylink.");
    }
  };

  return (
    <div className={styles.container}>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} onClick={handleModalOpen}>Create Paylink</button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Create Paylink</h2>
            
            {/* Paylink Type Selection Buttons */}
            <div className={styles.buttonGroup}>
              <button 
                className={`${styles.typeButton} ${formData.paylinkType === "Individual" ? styles.selected : ''}`} 
                onClick={() => setFormData({ ...formData, paylinkType: "Individual" })}
              >
                Individual
              </button>
              <button 
                className={`${styles.typeButton} ${formData.paylinkType === "Company" ? styles.selected : ''}`} 
                onClick={() => setFormData({ ...formData, paylinkType: "Company" })}
              >
                Company
              </button>
            </div>

            <form onSubmit={handlePaylinkSubmit}>
              {/* Individual Fields */}
              {formData.paylinkType === "Individual" && (
                <>
                  <div className={styles.inputGroup}>
                    <div className={styles.inputContainer}>
                      <label>First Name:</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputContainer}>
                      <label>Last Name:</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <div className={styles.inputContainer}>
                      <label>Email:</label>
                      <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputContainer}>
                      <label>Country:</label>
                      <input type="text" name="country" value={formData.country} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <label>Money:</label>
                    <input type="number" name="money" value={formData.money} onChange={handleInputChange} required />
                  </div>
                </>
              )}

              {/* Company Fields */}
              {formData.paylinkType === "Company" && (
                <>
                  <div className={styles.inputGroup}>
                    <div className={styles.inputContainer}>
                      <label>First Name:</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputContainer}>
                      <label>Last Name:</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <div className={styles.inputContainer}>
                      <label>Email:</label>
                      <input type="email" name="emailId" value={formData.emailId} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputContainer}>
                      <label>Country:</label>
                      <input type="text" name="country" value={formData.country} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <label>Money:</label>
                    <input type="number" name="money" value={formData.money} onChange={handleInputChange} required />
                  </div>

                  <div className={styles.inputGroup}>
                    <div className={styles.inputContainer}>
                      <label>Company Name:</label>
                      <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.inputContainer}>
                      <label>Website:</label>
                      <input type="text" name="website" value={formData.website} onChange={handleInputChange} required />
                    </div>
                  </div>
                </>
              )}

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>Submit</button>
                <button type="button" onClick={handleModalClose} className={styles.closeButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        <h2>All Paylinks</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Amount</th>
              <th>Paylink Type</th>
            </tr>
          </thead>
          <tbody>
            {paylinks.map((link, index) => (
              <tr key={index}>
                <td>{link.firstName} {link.lastName}</td>
                <td>{link.emailId}</td>
                <td>{link.country}</td>
                <td>${link.money}</td>
                <td>{link.paylinkType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayLink;
