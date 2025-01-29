



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "./GoogleRefund.module.css";

// const GoogleRefund = () => {
//   const [refundData, setRefundData] = useState([]); // State for storing refund details
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const [adAccount, setAdAccount] = useState(""); // State for Ad Account input
//   const [amount, setAmount] = useState(""); // State for Amount input
//   const navigate = useNavigate();

//   // Fetch refund details
//   useEffect(() => {
//     const fetchRefundData = async () => {
//       const token = localStorage.getItem("userToken"); // Retrieve token from localStorage

//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://admediaagency.online/kimi/refund-Details", {
//           headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
//         });

//         console.log("Refund API Response:", response.data); // Log the full API response

//         if (response.data.message === "Refund details fetched successfully" && Array.isArray(response.data.refundsDetails)) {
//           setRefundData(response.data.refundsDetails);
//         } else {
//           setError("Failed to fetch refund details.");
//         }
//       } catch (err) {
//         console.error("Error fetching refund data:", err.message);
//         setError("An error occurred while fetching refund data.");
//       }
//     };

//     fetchRefundData();
//   }, []);

//   const handleModalClose = () => {
//     setShowModal(false);
//     setAdAccount("");
//     setAmount("");
//   };

//   const handleModalOpen = () => {
//     setShowModal(true);
//   };

//   const handleRefundSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!adAccount || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("userToken");

//       const response = await axios.post("http://admediaagency.online/kimi/apply-refund", {
//         adAccount,
//         amount,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Refund Application Response:", response.data);

//       if (response.data.message === "Refund applied successfully") {
//         setShowModal(false);
//         setAdAccount("");
//         setAmount("");
//         setError(null); // Clear error if refund is applied successfully
//       } else {
//         setError("Failed to apply refund.");
//       }
//     } catch (err) {
//       console.error("Error applying refund:", err.message);
//       setError("An error occurred while applying the refund.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} onClick={handleModalOpen}>
//         Apply Refund
//       </button>
//       <div className={styles.tableContainer}>
//         {error && <p className={styles.error}>{error}</p>}

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Apply ID</th>
//               <th>Ads ID</th>
//               <th>Amount Applied</th>
//               <th>Remaining Money</th>
//               <th>Apply State</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {refundData.length > 0 ? (
//               refundData.map((refund, index) => (
//                 <tr key={index}>
//                   <td>{refund.applyId || "N/A"}</td>
//                   <td>{refund.adsId || "N/A"}</td>
//                   <td>{refund.amount || "N/A"}</td>
//                   <td>{refund.remainMoney || "N/A"}</td>
//                   <td>{refund.applyState || "N/A"}</td>
//                   <td>{new Date(refund.createdAt).toLocaleString() || "N/A"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No refund details available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for applying refund */}
//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>Apply Refund</h2>
//             <form onSubmit={handleRefundSubmit}>
//               <div className={styles.inputContainer}>
//                 <label>Ad Account</label>
//                 <input
//                   type="text"
//                   value={adAccount}
//                   onChange={(e) => setAdAccount(e.target.value)}
//                   placeholder="Enter Ad Account"
//                   required
//                 />
//               </div>
//               <div className={styles.inputContainer}>
//                 <label>Amount</label>
//                 <input
//                   type="number"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   placeholder="Enter Amount"
//                   required
//                 />
//               </div>
//               <div className={styles.buttonContainer}>
//                 <button type="submit" className={styles.button}>Submit</button>
//                 <button type="button" onClick={handleModalClose} className={styles.closeButton}>Close</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoogleRefund;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "./GoogleRefund.module.css";

// const GoogleRefund = () => {
//   const [refundData, setRefundData] = useState([]); // State for storing refund details
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const [adAccount, setAdAccount] = useState(""); // State for Ad Account input
//   const [amount, setAmount] = useState(""); // State for Amount input
//   const navigate = useNavigate();

//   // Fetch refund details
//   useEffect(() => {
//     const fetchRefundData = async () => {
//       const token = localStorage.getItem("userToken"); // Retrieve token from localStorage

//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://admediaagency.online/kimi/refund-Details", {
//           headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
//         });

//         console.log("Refund API Response:", response.data); // Log the full API response

//         if (response.data.message === "Refund details fetched successfully" && Array.isArray(response.data.refundsDetails)) {
//           setRefundData(response.data.refundsDetails);
//         } else {
//           setError("Failed to fetch refund details.");
//         }
//       } catch (err) {
//         console.error("Error fetching refund data:", err.message);
//         setError("An error occurred while fetching refund data.");
//       }
//     };

//     fetchRefundData();
//   }, []);

//   const handleModalClose = () => {
//     setShowModal(false);
//     setAdAccount("");
//     setAmount("");
//   };

//   const handleModalOpen = () => {
//     setShowModal(true);
//   };

//   const handleRefundSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!adAccount || !amount) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("userToken");

//       // Prepare data to be sent in the POST request
//       const requestData = {
//         adsId: adAccount, // Assuming 'adAccount' is the Ads ID
//         amount: parseFloat(amount), // Convert amount to a number
//       };

//       // Send the data via POST request
//       const response = await axios.post("http://admediaagency.online/kimi/apply-refund", requestData, {
//         headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
//       });

//       console.log("Refund Application Response:", response.data);

//       if (response.data.message === "Refund applied successfully") {
//         // Handle successful refund application
//         setShowModal(false);
//         setAdAccount("");
//         setAmount("");
//         setError(null); // Clear error if refund is applied successfully
//       } else {
//         setError("Failed to apply refund.");
//       }
//     } catch (err) {
//       console.error("Error applying refund:", err.message);
//       setError("An error occurred while applying the refund.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} onClick={handleModalOpen}>
//         Apply Refund
//       </button>
//       <div className={styles.tableContainer}>
//         {error && <p className={styles.error}>{error}</p>}

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Apply ID</th>
//               <th>Ads ID</th>
//               <th>Amount Applied</th>
//               <th>Remaining Money</th>
//               <th>Apply State</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {refundData.length > 0 ? (
//               refundData.map((refund, index) => (
//                 <tr key={index}>
//                   <td>{refund.applyId || "N/A"}</td>
//                   <td>{refund.adsId || "N/A"}</td>
//                   <td>{refund.amount || "N/A"}</td>
//                   <td>{refund.remainMoney || "N/A"}</td>
//                   <td>{refund.applyState || "N/A"}</td>
//                   <td>{new Date(refund.createdAt).toLocaleString() || "N/A"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No refund details available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for applying refund */}
//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>Apply Refund</h2>
//             <form onSubmit={handleRefundSubmit}>
//               <div className={styles.inputContainer}>
//                 <label>Ad Account</label>
//                 <input
//                   type="text"
//                   value={adAccount}
//                   onChange={(e) => setAdAccount(e.target.value)}
//                   placeholder="Enter Ad Account"
//                   required
//                 />
//               </div>
//               <div className={styles.inputContainer}>
//                 <label>Amount</label>
//                 <input
//                   type="number"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   placeholder="Enter Amount"
//                   required
//                 />
//               </div>
//               <div className={styles.buttonContainer}>
//                 <button type="submit" className={styles.button}>Submit</button>
//                 <button type="button" onClick={handleModalClose} className={styles.closeButton}>Close</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoogleRefund;


// //working code 
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "./GoogleRefund.module.css";

// const GoogleRefund = () => {
//   const [refundData, setRefundData] = useState([]);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [adAccount, setAdAccount] = useState("");
//   const [amount, setAmount] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRefundData = async () => {
//       const token = localStorage.getItem("userToken");

//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://admediaagency.online/kimi/refund-Details", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("Refund API Response:", response.data);

//         if (response.data.message === "Refund details fetched successfully" && Array.isArray(response.data.refundsDetails)) {
//           setRefundData(response.data.refundsDetails);
//         } else {
//           setError("Failed to fetch refund details.");
//         }
//       } catch (err) {
//         console.error("Error fetching refund data:", err.message);
//         setError("An error occurred while fetching refund data.");
//       }
//     };

//     fetchRefundData();
//   }, []);

//   const handleModalClose = () => {
//     setShowModal(false);
//     setAdAccount("");
//     setAmount("");
//   };

//   const handleModalOpen = () => {
//     setShowModal(true);
//   };

//   const handleRefundSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); // Clear previous errors

//     if (!adAccount || !amount) {
//       setError("Please fill in both fields.");
//       return;
//     }

//     const token = localStorage.getItem("userToken");

//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       return;
//     }

//     const requestData = {
//       adsId: adAccount.trim(),
//       amount: parseFloat(amount),
//     };

//     console.log("Submitting Refund Request:", requestData);

//     try {
//       const response = await axios.post(
//         "http://admediaagency.online/kimi/apply-refund",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Refund Application Response:", response.data);

//       if (response.data.message === "Refund applied successfully.") {
//         setShowModal(false);
//         setAdAccount("");
//         setAmount("");
//         setRefundData([...refundData, response.data.refund]); // Update UI with new refund entry
//       } else {
//         setError(response.data.message || "Failed to apply refund.");
//       }
//     } catch (err) {
//       console.error("Error applying refund:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "An error occurred while applying the refund.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} onClick={handleModalOpen}>
//         Apply Refund
//       </button>
//       <div className={styles.tableContainer}>
//         {error && <p className={styles.error}>{error}</p>}

//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Apply ID</th>
//               <th>Ads ID</th>
//               <th>Amount Applied</th>
//               <th>Remaining Money</th>
//               <th>Apply State</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {refundData.length > 0 ? (
//               refundData.map((refund, index) => (
//                 <tr key={index}>
//                   <td>{refund.applyId || "N/A"}</td>
//                   <td>{refund.adsId || "N/A"}</td>
//                   <td>{refund.amount || "N/A"}</td>
//                   <td>{refund.remainMoney || "N/A"}</td>
//                   <td>{refund.applyState || "N/A"}</td>
//                   <td>{new Date(refund.createdAt).toLocaleString() || "N/A"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No refund details available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>Apply Refund</h2>
//             <form onSubmit={handleRefundSubmit}>
//               <div className={styles.inputContainer}>
//                 <label>Ad Account</label>
//                 <input
//                   type="text"
//                   value={adAccount}
//                   onChange={(e) => setAdAccount(e.target.value)}
//                   placeholder="Enter Ad Account ID"
//                   required
//                 />
//               </div>
//               <div className={styles.inputContainer}>
//                 <label>Amount</label>
//                 <input
//                   type="number"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   placeholder="Enter Amount"
//                   required
//                 />
//               </div>
//               <div className={styles.buttonContainer}>
//                 <button type="submit" className={styles.button}>Submit</button>
//                 <button type="button" onClick={handleModalClose} className={styles.closeButton}>Close</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoogleRefund;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./GoogleRefund.module.css";

const GoogleRefund = () => {
  const [refundData, setRefundData] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adAccount, setAdAccount] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefundData = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://admediaagency.online/kimi/refund-Details", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.message === "Refund details fetched successfully" && Array.isArray(response.data.refundsDetails)) {
          setRefundData(response.data.refundsDetails);
        } else {
          setError("Failed to fetch refund details.");
        }
      } catch (err) {
        setError("An error occurred while fetching refund data.");
      }
    };

    fetchRefundData();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setAdAccount("");
    setAmount("");
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!adAccount || !amount) {
      setError("Please fill in both fields.");
      return;
    }

    const token = localStorage.getItem("userToken");

    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    const requestData = {
      adsId: adAccount.trim(),
      amount: parseFloat(amount),
    };

    try {
      const response = await axios.post(
        "http://admediaagency.online/kimi/apply-refund",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Refund applied successfully.") {
        setShowModal(false);
        setSuccessMessage("Refund applied successfully!");
        setAdAccount("");
        setAmount("");
        setRefundData([...refundData, response.data.refund]);

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(response.data.message || "Failed to apply refund.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while applying the refund.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Success Notification */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {/* Error Notification */}
      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} onClick={handleModalOpen}>
        Apply Refund
      </button>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads ID</th>
              <th>Amount Applied</th>
              <th>Remaining Money</th>
              <th>Apply State</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {refundData.length > 0 ? (
              refundData.map((refund, index) => (
                <tr key={index}>
                  <td>{refund.applyId || "N/A"}</td>
                  <td>{refund.adsId || "N/A"}</td>
                  <td>{refund.amount || "N/A"}</td>
                  <td>{refund.remainMoney || "N/A"}</td>
                  <td>{refund.applyState || "N/A"}</td>
                  <td>{new Date(refund.createdAt).toLocaleString() || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No refund details available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Refund Application */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Apply Refund</h2>
            <form onSubmit={handleRefundSubmit}>
              <div className={styles.inputContainer}>
                <label>Ad Account</label>
                <input
                  type="text"
                  value={adAccount}
                  onChange={(e) => setAdAccount(e.target.value)}
                  placeholder="Enter Ad Account ID"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <label>Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  required
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}>Submit</button>
                <button type="button" onClick={handleModalClose} className={styles.closeButton}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleRefund;
