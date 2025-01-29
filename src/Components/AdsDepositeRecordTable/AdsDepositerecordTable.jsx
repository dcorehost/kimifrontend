
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "./AdsDpositeRecordTable.module.css";

// const AdsDepositeRecordTable = () => {
//   const [depositsData, setDepositsData] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleNextPage = () => {
//     navigate("/next-page");  // Replace with the actual path to export Excel or next action.
//   };

//   // Fetch deposit records from the API
//   useEffect(() => {
//     const fetchDepositsData = async () => {
//       const token = localStorage.getItem("userToken"); // Retrieve token from localStorage

//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://admediaagency.online/kimi/get-Google-adDeposit?adType=Google", {
//           headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
//         });

//         console.log("API Response:", response.data); // Log the full API response

//         if (response.data.message === "Deposits details fetched successfully" && Array.isArray(response.data.deposits)) {
//           const deposits = response.data.deposits.map((deposit) => ({
//             applyId: deposit.applyId,
//             adsId: deposit.adGoogleAccount.length > 0
//               ? deposit.adGoogleAccount.map(account => account._id).join(", ")  // Extract _id from adGoogleAccount and join if there are multiple accounts
//               : "N/A",  // If adGoogleAccount is empty, set as "N/A"
//             chargeMoney: `$${deposit.money}`,
//             totalCost: `$${deposit.totalCost}`,
//             state: deposit.state,
//             createTime: new Date(deposit.createdAt).toLocaleString(),
//           }));
//           setDepositsData(deposits);
//         } else {
//           setError("Failed to fetch deposit data.");
//         }
//       } catch (err) {
//         console.error("Error fetching deposit data:", err.message);
//         setError("An error occurred while fetching deposit data.");
//       }
//     };

//     fetchDepositsData();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} onClick={handleNextPage}>
//         Export Excel
//       </button>
//       <div className={styles.tableContainer}>
//         {error ? (
//           <p className={styles.error}>{error}</p>
//         ) : (
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>Apply ID</th>
//                 <th>Ads ID</th>
//                 <th>Charge Money</th>
//                 <th>Total Cost</th>
//                 <th>State</th>
//                 <th>Create Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {depositsData.length > 0 ? (
//                 depositsData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{row.applyId}</td>
//                     <td>{row.adsId}</td>
//                     <td>{row.chargeMoney}</td>
//                     <td>{row.totalCost}</td>
//                     <td>{row.state}</td>
//                     <td>{row.createTime}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6">No deposit data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdsDepositeRecordTable;









// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "./AdsDpositeRecordTable.module.css";

// const AdsDepositeRecordTable = () => {
//   const [depositsData, setDepositsData] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleNextPage = () => {
//     navigate("/next-page");  // Replace with the actual path to export Excel or next action.
//   };

//   // Fetch deposit records from the API
//   useEffect(() => {
//     const fetchDepositsData = async () => {
//       const token = localStorage.getItem("userToken"); // Retrieve token from localStorage

//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://admediaagency.online/kimi/get-Google-adDeposit?adType=Google", {
//           headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
//         });

//         console.log("API Response:", response.data); // Log the full API response

//         if (response.data.message === "Deposits details fetched successfully" && Array.isArray(response.data.deposits)) {
//           const deposits = response.data.deposits.map((deposit) => {
//             const adGoogleAccount = deposit.adGoogleAccount; // Handle cases where adGoogleAccount might be null

//             return {
//               applyId: deposit.applyId,
//               adsId: adGoogleAccount ? adGoogleAccount._id : "N/A",  // If adGoogleAccount is null, set "N/A"
//               chargeMoney: `$${deposit.money}`,
//               totalCost: `$${deposit.totalCost}`,
//               state: deposit.state,
//               createTime: new Date(deposit.createdAt).toLocaleString(),
//             };
//           });
//           setDepositsData(deposits);
//         } else {
//           setError("Failed to fetch deposit data.");
//         }
//       } catch (err) {
//         console.error("Error fetching deposit data:", err.message);
//         setError("An error occurred while fetching deposit data.");
//       }
//     };

//     fetchDepositsData();
//   }, []);

//   // Function to handle the export of data to Excel
//   const handleExport = async () => {
//     const token = localStorage.getItem("userToken");

//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://admediaagency.online/kimi/export-googlead-deposit",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.message === "Data successfully exported") {
//         const filePath = response.data.filePath;  // Path to the exported file
//         const fileUrl = `http://admediaagency.online/${filePath}`;  // Full URL to access the file

//         // Create a link element and programmatically click to download the file
//         const link = document.createElement("a");
//         link.href = fileUrl;
//         link.download = "googleDepositList.xlsx";  // Default file name
//         link.click();
//       } else {
//         setError("Failed to export data.");
//       }
//     } catch (err) {
//       console.error("Error exporting data:", err.message);
//       setError("An error occurred while exporting data.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} onClick={handleExport}>
//         Export Excel
//       </button>
//       <div className={styles.tableContainer}>
//         {error ? (
//           <p className={styles.error}>{error}</p>
//         ) : (
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>Apply ID</th>
//                 <th>Ads ID</th>
//                 <th>Charge Money</th>
//                 <th>Total Cost</th>
//                 <th>State</th>
//                 <th>Create Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {depositsData.length > 0 ? (
//                 depositsData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{row.applyId}</td>
//                     <td>{row.adsId}</td>
//                     <td>{row.chargeMoney}</td>
//                     <td>{row.totalCost}</td>
//                     <td>{row.state}</td>
//                     <td>{row.createTime}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6">No deposit data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdsDepositeRecordTable;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import styles from "./AdsDpositeRecordTable.module.css";

// const AdsDepositeRecordTable = () => {
//   const [depositsData, setDepositsData] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleNextPage = () => {
//     navigate("/next-page");  // Replace with the actual path to export Excel or next action.
//   };

//   // Fetch deposit records from the API
//   useEffect(() => {
//     const fetchDepositsData = async () => {
//       const token = localStorage.getItem("userToken"); // Retrieve token from localStorage

//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://admediaagency.online/kimi/get-Google-adDeposit?adType=Google", {
//           headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
//         });

//         console.log("API Response:", response.data); // Log the full API response

//         if (response.data.message === "Deposits details fetched successfully" && Array.isArray(response.data.deposits)) {
//           const deposits = response.data.deposits.map((deposit) => {
//             const adGoogleAccount = deposit.adGoogleAccount; // Handle cases where adGoogleAccount might be null

//             return {
//               applyId: deposit.applyId,
//               adsId: adGoogleAccount ? adGoogleAccount._id : "N/A",  // If adGoogleAccount is null, set "N/A"
//               chargeMoney: `$${deposit.money}`,
//               totalCost: `$${deposit.totalCost}`,
//               state: deposit.state,
//               createTime: new Date(deposit.createdAt).toLocaleString(),
//             };
//           });
//           setDepositsData(deposits);
//         } else {
//           setError("Failed to fetch deposit data.");
//         }
//       } catch (err) {
//         console.error("Error fetching deposit data:", err.message);
//         setError("An error occurred while fetching deposit data.");
//       }
//     };

//     fetchDepositsData();
//   }, []);

//   // Function to handle the export of data to Excel
//   const handleExport = async () => {
//     const token = localStorage.getItem("userToken");

//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://admediaagency.online/kimi/export-googlead-deposit",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.message === "Data successfully exported") {
//         const filePath = response.data.filePath;  // Path to the exported file
//         const fileUrl = `http://admediaagency.online/${filePath}`;  // Full URL to access the file

//         // Create a link element and programmatically click to download the file
//         const link = document.createElement("a");
//         link.href = fileUrl;
//         link.download = filePath;  // Default file name from the API response
//         link.click();
//       } else {
//         setError("Failed to export data.");
//       }
//     } catch (err) {
//       console.error("Error exporting data:", err.message);
//       setError("An error occurred while exporting data.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} onClick={handleExport}>
//         Export Excel
//       </button>
//       <div className={styles.tableContainer}>
//         {error ? (
//           <p className={styles.error}>{error}</p>
//         ) : (
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>Apply ID</th>
//                 <th>Ads ID</th>
//                 <th>Charge Money</th>
//                 <th>Total Cost</th>
//                 <th>State</th>
//                 <th>Create Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {depositsData.length > 0 ? (
//                 depositsData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{row.applyId}</td>
//                     <td>{row.adsId}</td>
//                     <td>{row.chargeMoney}</td>
//                     <td>{row.totalCost}</td>
//                     <td>{row.state}</td>
//                     <td>{row.createTime}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6">No deposit data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdsDepositeRecordTable;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AdsDpositeRecordTable.module.css";

const AdsDepositeRecordTable = () => {
  const [depositsData, setDepositsData] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // Fetch deposit records from the API
  useEffect(() => {
    const fetchDepositsData = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://admediaagency.online/kimi/get-Google-adDeposit?adType=Google", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        if (response.data.message === "Deposits details fetched successfully" && Array.isArray(response.data.deposits)) {
          const deposits = response.data.deposits.map((deposit) => {
            const adGoogleAccount = deposit.adGoogleAccount;

            return {
              applyId: deposit.applyId,
              adsId: adGoogleAccount ? adGoogleAccount._id : "N/A",
              chargeMoney: `$${deposit.money}`,
              totalCost: `$${deposit.totalCost}`,
              state: deposit.state,
              createTime: new Date(deposit.createdAt).toLocaleString(),
            };
          });
          setDepositsData(deposits);
        } else {
          setError("Failed to fetch deposit data.");
        }
      } catch (err) {
        console.error("Error fetching deposit data:", err.message);
        setError("An error occurred while fetching deposit data.");
      }
    };

    fetchDepositsData();
  }, []);

  // Function to handle the export of data to Excel
  const handleExport = async () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    try {
      console.log("Fetching export file...");

      const response = await axios.get("http://admediaagency.online/kimi/export-googlead-deposit", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // ✅ This is CRUCIAL for downloading files
      });

      // Create a downloadable URL from the response
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "googleDepositList.xlsx"); // ✅ Ensures the file downloads properly
      document.body.appendChild(link);
      link.click();
      link.remove();

      // ✅ Show success message
      setSuccessMessage("Excel file has been downloaded.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Export API failed:", err.response ? err.response.data : err.message);
      setError("An error occurred while exporting data.");
    }
  };

  return (
    <div className={styles.container}>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} onClick={handleExport}>
        Export Excel
      </button>

      <div className={styles.tableContainer}>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Apply ID</th>
                <th>Ads ID</th>
                <th>Charge Money</th>
                <th>Total Cost</th>
                <th>State</th>
                <th>Create Time</th>
              </tr>
            </thead>
            <tbody>
              {depositsData.length > 0 ? (
                depositsData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.applyId}</td>
                    <td>{row.adsId}</td>
                    <td>{row.chargeMoney}</td>
                    <td>{row.totalCost}</td>
                    <td>{row.state}</td>
                    <td>{row.createTime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No deposit data available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdsDepositeRecordTable;


