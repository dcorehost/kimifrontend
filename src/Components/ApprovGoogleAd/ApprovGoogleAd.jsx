// import React, { useState } from "react";
// import styles from "./ApprovGoogleAd.module.css";

// const ApprovGoogleAd = () => {
//   // State to manage the table data
//   const [adsData, setAdsData] = useState([
//     {
//       applyId: "dcorehost9564895108614",
//       state: "Completed",
//       totalCost: 145,
//       accountOpenFee: 30,
//       userId: "67a35b40e68ea4e60671e2e2",
//       totalDeposit: 100,
//       createdAt: "2025-02-06T05:44:54.872Z",
//       updatedAt: "2025-02-06T05:48:11.835Z",
//     },
//     {
//       applyId: "dcorehost234234234234234",
//       state: "Pending",
//       totalCost: 200,
//       accountOpenFee: 40,
//       userId: "67a35b40e68ea4e60671e2e3",
//       totalDeposit: 150,
//       createdAt: "2025-02-05T12:30:00.000Z",
//       updatedAt: "2025-02-05T12:45:00.000Z",
//     },
//   ]);

//   // Format date
//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   // Function to update state for Approve/Disapprove
//   const handleUpdateState = (index, newState) => {
//     const updatedAds = [...adsData];
//     updatedAds[index].state = newState;
//     setAdsData(updatedAds);
//   };

//   // Function to delete an entry
//   const handleDelete = (index) => {
//     const updatedAds = adsData.filter((_, i) => i !== index);
//     setAdsData(updatedAds);
//   };

//   return (
//     <div className={styles.container}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Apply ID</th>
//             <th>Status</th>
//             <th>Total Cost</th>
//             <th>Account Open Fee</th>
//             <th>User ID</th>
//             <th>Total Deposit</th>
//             <th>Create Time</th>
//             <th>Updated Time</th>
//             <th>Operate</th>
//           </tr>
//         </thead>
//         <tbody>
//           {adsData.map((ad, index) => (
//             <tr key={index}>
//               <td>{ad.applyId}</td>
//               <td>{ad.state}</td>
//               <td>${ad.totalCost}</td>
//               <td>${ad.accountOpenFee}</td>
//               <td>{ad.userId}</td>
//               <td>${ad.totalDeposit}</td>
//               <td>{formatDate(ad.createdAt)}</td>
//               <td>{formatDate(ad.updatedAt)}</td>
//               <td className={styles.operate}>
//                 <button
//                   className={styles.approveBtn}
//                   onClick={() => handleUpdateState(index, "Approved")}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className={styles.disapproveBtn}
//                   onClick={() => handleUpdateState(index, "Disapproved")}
//                 >
//                   Disapprove
//                 </button>
//                 <button
//                   className={styles.deleteBtn}
//                   onClick={() => handleDelete(index)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ApprovGoogleAd;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./ApprovGoogleAd.module.css";

// const ApprovGoogleAd = () => {
//   const [adsData, setAdsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAdsData = async () => {
//       const token = localStorage.getItem("userToken");

//       if (!token) {
//         setError("User is not authenticated. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "https://admediaagency.online/kimi/get-pending-google-ads", // ✅ Confirm this endpoint
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response.data.message === "approved google ads fetched successfully" && Array.isArray(response.data.ads)) {
//           setAdsData(response.data.ads);
//         } else {
//           setError("Failed to fetch approved ads data.");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err.response || err.message);
//         setError("An error occurred while fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdsData();
//   }, []);

//   // Format date
//   const formatDate = (isoString) => new Date(isoString).toLocaleString();

//   // Handle Approve/Disapprove
//   const handleUpdateState = async (id, action) => {
//     try {
//       await axios.put(
//         `https://admediaagency.online/kimi/approve-googleAd?id=${id}&action=${action}`,
//         {},
//         { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
//       );

//       // Update state only if API call is successful
//       setAdsData((prevAds) =>
//         prevAds.map((ad) =>
//           ad.applyId === id ? { ...ad, state: action === "approve" ? "Approved" : "Disapproved" } : ad
//         )
//       );
//     } catch (error) {
//       console.error(`Error updating status for ${id}:`, error.response || error.message);
//       setError("Failed to update status.");
//     }
//   };

//   // Handle Delete (if needed)
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `https://admediaagency.online/kimi/delete-ad/${id}`,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
//       );

//       setAdsData((prevAds) => prevAds.filter((ad) => ad.applyId !== id));
//     } catch (error) {
//       console.error(`Error deleting ad ${id}:`, error.response || error.message);
//       setError("Failed to delete the ad.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Apply ID</th>
//               <th>Status</th>
//               <th>Total Cost</th>
//               <th>Account Open Fee</th>
//               <th>User ID</th>
//               <th>Total Deposit</th>
//               <th>Create Time</th>
//               <th>Updated Time</th>
//               <th>Operate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adsData.length > 0 ? (
//               adsData.map((ad) => (
//                 <tr key={ad.applyId}>
//                   <td>{ad.applyId}</td>
//                   <td>{ad.state}</td>
//                   <td>${ad.totalCost}</td>
//                   <td>${ad.accountOpenFee}</td>
//                   <td>{ad.userId}</td>
//                   <td>${ad.totalDeposit}</td>
//                   <td>{formatDate(ad.createdAt)}</td>
//                   <td>{formatDate(ad.updatedAt)}</td>
//                   <td className={styles.operate}>
//                     <button
//                       className={styles.approveBtn}
//                       onClick={() => handleUpdateState(ad.applyId, "approve")}
//                       disabled={ad.state === "Approved"}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className={styles.disapproveBtn}
//                       onClick={() => handleUpdateState(ad.applyId, "disapprove")}
//                       disabled={ad.state === "Disapproved"}
//                     >
//                       Disapprove
//                     </button>
//                     <button
//                       className={styles.deleteBtn}
//                       onClick={() => handleDelete(ad.applyId)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9">No approved ads available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ApprovGoogleAd;
import React, { useEffect, useState } from "react";
import styles from "./ApprovGoogleAd.module.css";
import Httpservices from "../Services/Httpservices"; // Import Httpservices instead of axios directly
import Auth from "../Services/Auth"; // Ensure this is imported correctly

const ApprovGoogleAd = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdsData();
  }, []);

  const fetchAdsData = async () => {
    const token = Auth.getToken(); // Get token using Auth service

    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      // Temporarily removed the Authorization header for debugging
      const response = await Httpservices.get("/get-approved-google-ads"); 

      if (response.data.message === "approved google ads fetched successfully" && Array.isArray(response.data.ads)) {
        setAdsData(response.data.ads);
      } else {
        setError("Failed to fetch approved ads data.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      if (err.response) {
        // Handle 404 error specifically
        if (err.response.status === 404) {
          setError("The requested ads data could not be found. Please check the URL or try again later.");
        } else {
          setError(`Error: ${err.response.data.message || "Failed to fetch data."}`);
        }
      } else if (err.request) {
        console.error("No Response Error:", err.request);
        setError("No response received from the server.");
      } else {
        console.error("Error in setup:", err.message);
        setError("An error occurred while setting up the request.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => new Date(isoString).toLocaleString();

  const handleUpdateState = async (id, action) => {
    try {
      await Httpservices.put(`/approve-googleAd?id=${id}&action=${action}`);

      setAdsData((prevAds) =>
        prevAds.map((ad) =>
          ad.applyId === id ? { ...ad, state: action === "approve" ? "Approved" : "Disapproved" } : ad
        )
      );
    } catch (error) {
      console.error(`Error updating status for ${id}:`, error.response || error.message);
      setError("Failed to update status.");
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Status</th>
              <th>Total Cost</th>
              <th>Account Open Fee</th>
              <th>User ID</th>
              <th>Total Deposit</th>
              <th>Create Time</th>
              <th>Updated Time</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad.applyId}>
                <td>{ad.applyId}</td>
                <td>{ad.state}</td>
                <td>${ad.totalCost}</td>
                <td>${ad.accountOpenFee}</td>
                <td>{ad.userId}</td>
                <td>${ad.totalDeposit}</td>
                <td>{formatDate(ad.createdAt)}</td>
                <td>{formatDate(ad.updatedAt)}</td>
                <td className={styles.operate}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateState(ad.applyId, "approve")}
                    disabled={ad.state === "Approved"}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleUpdateState(ad.applyId, "disapprove")}
                    disabled={ad.state === "Disapproved"}
                  >
                    Disapprove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved ads available</p>
      )}
    </div>
  );
};

export default ApprovGoogleAd;
