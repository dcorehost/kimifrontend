
// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import styles from "./ApprovFacebookAd.module.css";
// import Httpservices from "../Services/Httpservices";
// import Auth from "../Services/Auth";

// const ApprovFacebookAd = () => {
//   const [adsData, setAdsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchAdsData();
//   }, []);

//   const fetchAdsData = async () => {
//     const token = Auth.getToken();
//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await Httpservices.get("/get-pending-facebook-ads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);

//       if (response.status === 200 && response.data.ads) {
//         setAdsData(response.data.ads);
//       } else {
//         setError("No pending ads found.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.response || err.message);
//       setError(err.response?.data?.message || "Failed to fetch ads.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (isoString) => {
//     return isoString ? new Date(isoString).toLocaleString() : "N/A";
//   };

//   const handleUpdateState = async (id, action) => {
//     if (!id) {
//       setError("Error: Missing Ad ID.");
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       setError("User is not authenticated.");
//       return;
//     }

//     try {
//       console.log(`Updating Ad ID: ${id}, Action: ${action}`);

//       const response = await Httpservices.put(
//         `/approve-facebookAd?id=${id}&action=${action}`,
//         {}, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Update Response:", response.data);

//       if (response.status === 200 && response.data.googleAd) {
//         setAdsData((prevAds) =>
//           prevAds.map((ad) =>
//             ad._id === id ? { ...ad, state: response.data.googleAd.state } : ad
//           )
//         );

//         toast.success(`Ad ${action}d successfully!`);
//       } else {
//         setError(response.data.message || "Failed to update ad status.");
//       }
//     } catch (error) {
//       console.error(`Error updating status for ${id}:`, error.response || error.message);
//       setError(error.response?.data?.message || "Error updating ad status.");

//       toast.error("Failed to update ad status.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <ToastContainer position="top-right" autoClose={3000} /> 
      
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : adsData.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Ad ID</th>
//               <th>Ad Number</th>
//               <th>Gmail</th>
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
//             {adsData.map((ad) => (
//               <tr key={ad._id}>
//                 <td>{ad._id}</td>
//                 <td>{ad.adNum}</td>
//                 <td>
//                   {ad.adsDetails?.length > 0 ? ad.adsDetails.map((detail) => detail.gmail).join(", ") : "N/A"}
//                 </td>
//                 <td>{ad.state}</td>
//                 <td>${ad.totalCost}</td>
//                 <td>${ad.accountOpenFee}</td>
//                 <td>{ad.userId}</td>
//                 <td>${ad.totalDeposit}</td>
//                 <td>{formatDate(ad.createdAt)}</td>
//                 <td>{formatDate(ad.updatedAt)}</td>
//                 <td className={styles.operate}>
//                   <button
//                     className={styles.approveBtn}
//                     onClick={() => handleUpdateState(ad._id, "approve")}
//                     disabled={ad.state === "Completed"}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className={styles.disapproveBtn}
//                     onClick={() => handleUpdateState(ad._id, "disapprove")}
//                     disabled={ad.state === "Disapproved"}
//                   >
//                     Disapprove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No pending ads available</p>
//       )}
//     </div>
//   );
// };

// export default ApprovFacebookAd;



// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import styles from "./ApprovFacebookAd.module.css";
// import Httpservices from "../Services/Httpservices";
// import Auth from "../Services/Auth";

// const ApprovFacebookAd = () => {
//   const [adsData, setAdsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchAdsData();
//   }, []);

//   const fetchAdsData = async () => {
//     const token = Auth.getToken();
//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await Httpservices.get("/get-pending-facebook-ads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);

//       if (response.status === 200 && response.data.ads) {
//         setAdsData(response.data.ads);
//       } else {
//         setError("No pending ads found.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.response || err.message);
//       setError(err.response?.data?.message || "Failed to fetch ads.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (isoString) => {
//     return isoString ? new Date(isoString).toLocaleString() : "N/A";
//   };

//   const handleUpdateState = async (id, action) => {
//     if (!id) {
//       setError("Error: Missing Ad ID.");
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       setError("User is not authenticated.");
//       return;
//     }

//     try {
//       console.log(`Updating Ad ID: ${id}, Action: ${action}`);

//       const response = await Httpservices.put(
//         `/approve-facebookAd?id=${id}&action=${action}`,
//         {}, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Update Response:", response.data);

//       if (response.status === 200 && response.data.googleAd) {
//         setAdsData((prevAds) =>
//           prevAds.map((ad) =>
//             ad._id === id ? { ...ad, state: response.data.googleAd.state } : ad
//           )
//         );

//         toast.success(`Ad ${action}d successfully!`);
//       } else {
//         setError(response.data.message || "Failed to update ad status.");
//       }
//     } catch (error) {
//       console.error(`Error updating status for ${id}:`, error.response || error.message);
//       setError(error.response?.data?.message || "Error updating ad status.");

//       toast.error("Failed to update ad status.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <ToastContainer position="top-right" autoClose={3000} /> 
      
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : adsData.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Ad ID</th>
//               <th>License Mode</th>
//               <th>License Name</th>
//               <th>Pages</th>
//               <th>Page URLs</th>
//               <th>Domain Option</th>
//               <th>Domains</th>
//               <th>App URL</th>
//               <th>App ID</th>
//               <th>Ads (Accounts & Deposits)</th>
//               <th>Remarks</th>
//               <th>Apply ID</th>
//               <th>Status</th>
//               <th>Total Cost</th>
//               <th>User ID</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//               <th>Operate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adsData.map((ad) => (
//               <tr key={ad._id}>
//                 <td>{ad._id}</td>
//                 <td>{ad.licenseMode}</td>
//                 <td>{ad.licenseName}</td>
//                 <td>{ad.pageNum}</td>
//                 <td>{ad.pageUrls?.length > 0 ? ad.pageUrls.join(", ") : "N/A"}</td>
//                 <td>{ad.domainOption}</td>
//                 <td>{ad.domains?.length > 0 ? ad.domains.join(", ") : "N/A"}</td>
//                 <td><a href={ad.appUrl} target="_blank" rel="noopener noreferrer">{ad.appUrl}</a></td>
//                 <td>{ad.appId}</td>
//                 <td>
//                   {ad.ads?.length > 0 ? (
//                     <ul>
//                       {ad.ads.map((adItem, index) => (
//                         <li key={index}>
//                           {adItem.accountName} - ${adItem.deposit}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : "N/A"}
//                 </td>
//                 <td>{ad.remarks}</td>
//                 <td>{ad.applyId}</td>
//                 <td>{ad.state}</td>
//                 <td>${ad.totalCost}</td>
//                 <td>{ad.userId}</td>
//                 <td>{formatDate(ad.createdAt)}</td>
//                 <td>{formatDate(ad.updatedAt)}</td>
//                 <td className={styles.operate}>
//                   <button
//                     className={styles.approveBtn}
//                     onClick={() => handleUpdateState(ad._id, "approve")}
//                     disabled={ad.state === "Completed"}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className={styles.disapproveBtn}
//                     onClick={() => handleUpdateState(ad._id, "disapprove")}
//                     disabled={ad.state === "Disapproved"}
//                   >
//                     Disapprove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No pending ads available</p>
//       )}
//     </div>
//   );
// };

// export default ApprovFacebookAd;


// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import styles from "./ApprovFacebookAd.module.css";
// import Httpservices from "../Services/Httpservices";
// import Auth from "../Services/Auth";

// const ApprovFacebookAd = () => {
//   const [adsData, setAdsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchAdsData();
//   }, []);

//   const fetchAdsData = async () => {
//     const token = Auth.getToken();
//     if (!token) {
//       setError("User is not authenticated. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await Httpservices.get("/get-pending-facebook-ads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);

//       if (response.status === 200 && response.data.ads) {
//         setAdsData(response.data.ads);
//       } else {
//         setError("No pending ads found.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.response || err.message);
//       setError(err.response?.data?.message || "Failed to fetch ads.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (isoString) => {
//     return isoString ? new Date(isoString).toLocaleString() : "N/A";
//   };

//   const handleUpdateState = async (id, action) => {
//     if (!id) {
//       toast.error("Error: Missing Ad ID.");
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("User is not authenticated.");
//       return;
//     }

//     try {
//       console.log(`Updating Ad ID: ${id}, Action: ${action}`);

//       const response = await Httpservices.put(
//         `/approve-facebookAd?id=${id}&action=${action}`,
//         {}, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Update Response:", response.data);

//       if (response.status === 200 && response.data.googleAd) {
//         setAdsData((prevAds) =>
//           prevAds.map((ad) =>
//             ad._id === id ? { ...ad, state: response.data.googleAd.state } : ad
//           )
//         );

//         toast.success(`Ad successfully ${action}d!`);
//       } else {
//         toast.error(response.data.message || "Failed to update ad status.");
//       }
//     } catch (error) {
//       console.error(`Error updating status for ${id}:`, error.response || error.message);
//       toast.error(error.response?.data?.message || "Error updating ad status.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <ToastContainer position="top-right" autoClose={3000} /> 
      
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : adsData.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Ad ID</th>
//               <th>License Mode</th>
//               <th>License Name</th>
//               <th>Pages</th>
//               <th>Page URLs</th>
//               <th>Domain Option</th>
//               <th>Domains</th>
//               <th>App URL</th>
//               <th>App ID</th>
//               <th>Ads (Accounts & Deposits)</th>
//               <th>Remarks</th>
//               <th>Apply ID</th>
//               <th>Status</th>
//               <th>Total Cost</th>
//               <th>User ID</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//               <th>Operate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adsData.map((ad) => (
//               <tr key={ad._id}>
//                 <td>{ad._id}</td>
//                 <td>{ad.licenseMode}</td>
//                 <td>{ad.licenseName}</td>
//                 <td>{ad.pageNum}</td>
//                 <td>{ad.pageUrls?.length > 0 ? ad.pageUrls.join(", ") : "N/A"}</td>
//                 <td>{ad.domainOption}</td>
//                 <td>{ad.domains?.length > 0 ? ad.domains.join(", ") : "N/A"}</td>
//                 <td><a href={ad.appUrl} target="_blank" rel="noopener noreferrer">{ad.appUrl}</a></td>
//                 <td>{ad.appId}</td>
//                 <td>
//                   {ad.ads?.length > 0 ? (
//                     <ul>
//                       {ad.ads.map((adItem, index) => (
//                         <li key={index}>
//                           {adItem.accountName} - ${adItem.deposit}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : "N/A"}
//                 </td>
//                 <td>{ad.remarks}</td>
//                 <td>{ad.applyId}</td>
//                 <td>{ad.state}</td>
//                 <td>${ad.totalCost}</td>
//                 <td>{ad.userId}</td>
//                 <td>{formatDate(ad.createdAt)}</td>
//                 <td>{formatDate(ad.updatedAt)}</td>
//                 <td className={styles.operate}>
//                   <button
//                     className={styles.approveBtn}
//                     onClick={() => handleUpdateState(ad._id, "approve")}
//                     disabled={ad.state === "Completed"}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className={styles.disapproveBtn}
//                     onClick={() => handleUpdateState(ad._id, "disapprove")}
//                     disabled={ad.state === "Disapproved"}
//                   >
//                     Disapprove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No pending ads available</p>
//       )}
//     </div>
//   );
// };

// export default ApprovFacebookAd;


// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import styles from "./ApprovFacebookAd.module.css";
// import Httpservices from "../Services/Httpservices";
// import Auth from "../Services/Auth";

// const ApprovFacebookAd = () => {
//   const [adsData, setAdsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchAdsData();
//   }, []);

//   const fetchAdsData = async () => {
//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("User is not authenticated. Please log in.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await Httpservices.get("/get-pending-facebook-ads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);

//       if (response.status === 200 && response.data.ads) {
//         setAdsData(response.data.ads);
//       } else {
//         toast.error("No pending ads found.", {
//           style: { backgroundColor: "red", color: "white" },
//         });
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.response || err.message);
//       toast.error(err.response?.data?.message || "Failed to fetch ads.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (isoString) => {
//     return isoString ? new Date(isoString).toLocaleString() : "N/A";
//   };

//   const handleUpdateState = async (id, action) => {
//     if (!id) {
//       toast.error("Error: Missing Ad ID.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("User is not authenticated.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//       return;
//     }

//     try {
//       console.log(`Updating Ad ID: ${id}, Action: ${action}`);

//       const response = await Httpservices.put(
//         `/approve-facebookAd?id=${id}&action=${action}`,
//         {}, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Update Response:", response.data);

//       if (response.status === 200 && response.data.googleAd) {
//         setAdsData((prevAds) =>
//           prevAds.map((ad) =>
//             ad._id === id ? { ...ad, state: response.data.googleAd.state } : ad
//           )
//         );

//         toast.success(`Ad successfully ${action}d!`, {
//           style: { backgroundColor: "green", color: "white" },
//         });
//       } else {
//         toast.error(response.data.message || "Failed to update ad status.", {
//           style: { backgroundColor: "red", color: "white" },
//         });
//       }
//     } catch (error) {
//       console.error(`Error updating status for ${id}:`, error.response || error.message);
//       toast.error(error.response?.data?.message || "Error updating ad status.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <ToastContainer position="top-right" autoClose={3000} /> 
      
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : adsData.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Ad ID</th>
//               <th>License Mode</th>
//               <th>License Name</th>
//               <th>Pages</th>
//               <th>Page URLs</th>
//               <th>Domain Option</th>
//               <th>Domains</th>
//               <th>App URL</th>
//               <th>App ID</th>
//               <th>Ads (Accounts & Deposits)</th>
//               <th>Remarks</th>
//               <th>Apply ID</th>
//               <th>Status</th>
//               <th>Total Cost</th>
//               <th>User ID</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//               <th>Operate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adsData.map((ad) => (
//               <tr key={ad._id}>
//                 <td>{ad._id}</td>
//                 <td>{ad.licenseMode}</td>
//                 <td>{ad.licenseName}</td>
//                 <td>{ad.pageNum}</td>
//                 <td>{ad.pageUrls?.length > 0 ? ad.pageUrls.join(", ") : "N/A"}</td>
//                 <td>{ad.domainOption}</td>
//                 <td>{ad.domains?.length > 0 ? ad.domains.join(", ") : "N/A"}</td>
//                 <td><a href={ad.appUrl} target="_blank" rel="noopener noreferrer">{ad.appUrl}</a></td>
//                 <td>{ad.appId}</td>
//                 <td>
//                   {ad.ads?.length > 0 ? (
//                     <ul>
//                       {ad.ads.map((adItem, index) => (
//                         <li key={index}>
//                           {adItem.accountName} - ${adItem.deposit}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : "N/A"}
//                 </td>
//                 <td>{ad.remarks}</td>
//                 <td>{ad.applyId}</td>
//                 <td>{ad.state}</td>
//                 <td>${ad.totalCost}</td>
//                 <td>{ad.userId}</td>
//                 <td>{formatDate(ad.createdAt)}</td>
//                 <td>{formatDate(ad.updatedAt)}</td>
//                 <td className={styles.operate}>
//                   <button
//                     className={styles.approveBtn}
//                     onClick={() => handleUpdateState(ad._id, "approve")}
//                     disabled={ad.state === "Completed"}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className={styles.disapproveBtn}
//                     onClick={() => handleUpdateState(ad._id, "disapprove")}
//                     disabled={ad.state === "Disapproved"}
//                   >
//                     Disapprove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No pending ads available</p>
//       )}
//     </div>
//   );
// };

// export default ApprovFacebookAd;



// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import styles from "./ApprovFacebookAd.module.css";
// import Httpservices from "../Services/Httpservices";
// import Auth from "../Services/Auth";

// const ApprovFacebookAd = () => {
//   const [adsData, setAdsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchAdsData();
//   }, []);

//   const fetchAdsData = async () => {
//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("User is not authenticated. Please log in.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await Httpservices.get("/get-pending-facebook-ads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);

//       if (response.status === 200 && response.data.ads) {
//         setAdsData(response.data.ads);
//       } else {
//         toast.error("No pending ads found.", {
//           style: { backgroundColor: "red", color: "white" },
//         });
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.response || err.message);
//       toast.error(err.response?.data?.message || "Failed to fetch ads.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (isoString) => {
//     return isoString ? new Date(isoString).toLocaleString() : "N/A";
//   };

//   const handleUpdateState = async (id, action) => {
//     if (!id) {
//       toast.error("Error: Missing Ad ID.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//       return;
//     }

//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("User is not authenticated.", {
//         style: { backgroundColor: "red", color: "white" },
//       });
//       return;
//     }

//     try {
//       console.log(`Updating Ad ID: ${id}, Action: ${action}`);

//       const response = await Httpservices.put(
//         `/approve-facebookAd?id=${id}&action=${action}`,
//         {}, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Update Response:", response.data);

//       if (response.status === 200 && response.data.googleAd) {
//         setAdsData((prevAds) =>
//           prevAds.map((ad) =>
//             ad._id === id ? { ...ad, state: response.data.googleAd.state } : ad
//           )
//         );

//         toast.success(`Ad successfully ${action}d!`, {
//           style: { backgroundColor: "green", color: "white" },
//         });
//       } else {
//         toast.error(response.data.message || "Failed to update ad status.", {
//           style: { backgroundColor: "red", color: "white" },
//         });
//       }
//     } catch (error) {
//       console.error(`Error updating status for ${id}:`, error.response || error.message);
//       toast.error(error.response?.data?.message || "Error updating ad status.", {
//         style: { backgroundColor: "green", color: "white" },
//       });
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <ToastContainer position="top-right" autoClose={3000} /> 
      
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : adsData.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Ad ID</th>
//               <th>License Mode</th>
//               <th>License Name</th>
//               <th>Pages</th>
//               <th>Page URLs</th>
//               <th>Domain Option</th>
//               <th>Domains</th>
//               <th>App URL</th>
//               <th>App ID</th>
//               <th>Ads (Accounts & Deposits)</th>
//               <th>Remarks</th>
//               <th>Apply ID</th>
//               <th>Status</th>
//               <th>Total Cost</th>
//               <th>User ID</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//               <th>Operate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adsData.map((ad) => (
//               <tr key={ad._id}>
//                 <td>{ad._id}</td>
//                 <td>{ad.licenseMode}</td>
//                 <td>{ad.licenseName}</td>
//                 <td>{ad.pageNum}</td>
//                 <td>{ad.pageUrls?.length > 0 ? ad.pageUrls.join(", ") : "N/A"}</td>
//                 <td>{ad.domainOption}</td>
//                 <td>{ad.domains?.length > 0 ? ad.domains.join(", ") : "N/A"}</td>
//                 <td><a href={ad.appUrl} target="_blank" rel="noopener noreferrer">{ad.appUrl}</a></td>
//                 <td>{ad.appId}</td>
//                 <td>
//                   {ad.ads?.length > 0 ? (
//                     <ul>
//                       {ad.ads.map((adItem, index) => (
//                         <li key={index}>
//                           {adItem.accountName} - ${adItem.deposit}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : "N/A"}
//                 </td>
//                 <td>{ad.remarks}</td>
//                 <td>{ad.applyId}</td>
//                 <td>{ad.state}</td>
//                 <td>${ad.totalCost}</td>
//                 <td>{ad.userId}</td>
//                 <td>{formatDate(ad.createdAt)}</td>
//                 <td>{formatDate(ad.updatedAt)}</td>
//                 <td className={styles.operate}>
//                   <button
//                     className={styles.approveBtn}
//                     onClick={() => handleUpdateState(ad._id, "approve")}
//                     disabled={ad.state === "Completed"}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className={styles.disapproveBtn}
//                     onClick={() => handleUpdateState(ad._id, "reject")}
//                     disabled={ad.state === "reject"}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No pending ads available</p>
//       )}
//     </div>
//   );
// };

// export default ApprovFacebookAd;



import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import styles from "./ApprovFacebookAd.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovFacebookAd = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdsData();
  }, []);

  const fetchAdsData = async () => {
    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get("/get-pending-facebook-ads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.ads) {
        setAdsData(response.data.ads);
      } else {
        toast.error("No pending ads found.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      toast.error(err.response?.data?.message || "Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  const handleUpdateState = async (id, action) => {
    if (!id) {
      toast.error("Error: Missing Ad ID.");
      return;
    }

    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      console.log(`Updating Ad ID: ${id}, Action: ${action}`);

      const response = await Httpservices.put(
        `/approve-facebookAd?id=${id}&action=${action}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Response:", response.data);

      if (response.status === 200 && response.data.googleAd) {
        setAdsData((prevAds) =>
          prevAds.map((ad) =>
            ad._id === id ? { ...ad, state: response.data.googleAd.state } : ad
          )
        );

        toast.success(`Ad successfully ${action}d!`);
      } else {
        toast.error(response.data.message || "Failed to update ad status.");
      }
    } catch (error) {
      console.error(`Error updating status for ${id}:`, error.response || error.message);
      toast.error(error.response?.data?.message || "Error updating ad status.");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} /> 

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ad ID</th>
              <th>License Mode</th>
              <th>License Name</th>
              <th>Pages</th>
              <th>Page URLs</th>
              <th>Domain Option</th>
              <th>Domains</th>
              <th>App URL</th>
              <th>App ID</th>
              <th>Ads (Accounts & Deposits)</th>
              <th>Remarks</th>
              <th>Apply ID</th>
              <th>Status</th>
              <th>Total Cost</th>
              <th>User ID</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad._id}</td>
                <td>{ad.licenseMode}</td>
                <td>{ad.licenseName}</td>
                <td>{ad.pageNum}</td>
                <td>{ad.pageUrls?.length > 0 ? ad.pageUrls.join(", ") : "N/A"}</td>
                <td>{ad.domainOption}</td>
                <td>{ad.domains?.length > 0 ? ad.domains.join(", ") : "N/A"}</td>
                <td><a href={ad.appUrl} target="_blank" rel="noopener noreferrer">{ad.appUrl}</a></td>
                <td>{ad.appId}</td>
                <td>
                  {ad.ads?.length > 0 ? (
                    <ul>
                      {ad.ads.map((adItem, index) => (
                        <li key={index}>
                          {adItem.accountName} - ${adItem.deposit}
                        </li>
                      ))}
                    </ul>
                  ) : "N/A"}
                </td>
                <td>{ad.remarks}</td>
                <td>{ad.applyId}</td>
                <td>{ad.state}</td>
                <td>${ad.totalCost}</td>
                <td>{ad.userId}</td>
                <td>{formatDate(ad.createdAt)}</td>
                <td>{formatDate(ad.updatedAt)}</td>
                <td className={styles.operate}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateState(ad._id, "approve")}
                    disabled={ad.state === "Completed"}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleUpdateState(ad._id, "reject")}
                    disabled={ad.state === "reject"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending ads available</p>
      )}
    </div>
  );
};

export default ApprovFacebookAd;
