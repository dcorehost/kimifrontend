

// import React, { useEffect, useState } from "react";
// import styles from "./ApprovedGoogleAds.module.css";
// import Httpservices from "../Services/Httpservices";
// import Auth from "../Services/Auth";

// const ApprovedGoogleAds = () => {
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
//       const response = await Httpservices.get("/get-approved-google-ads", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);

//       if (response.status === 200 && response.data.ads) {
//         setAdsData(response.data.ads);
//       } else {
//         setError("No approved ads found.");
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

//   return (
//     <div className={styles.container}>
//       <h2>Approved Google Ads</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : adsData.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>ApplyId</th>
//               <th>Ad Number</th>
//               <th>Gmail</th>
//               <th>State</th>
//               <th>Total Cost</th>
//               <th>Account Open Fee</th>
//               <th>User ID</th>
//               <th>Total Deposit</th>
//               <th>Create Time</th>
//               <th>Updated Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {adsData.map((ad) => (
//               <tr key={ad._id}>
//                 <td>{ad.applyId}</td>
//                 <td>{ad.adNum}</td>
//                 <td>{ad.adsDetails?.length > 0 ? ad.adsDetails.map((detail) => detail.gmail).join(", ") : "N/A"}</td>
//                 {/* <td>{ad.state}</td> */}

//                 <td>
//                         <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
//                          {ad.state || "N/A"}
//                          </span>
//                        </td>

//                 <td>${ad.totalCost}</td>
//                 <td>${ad.accountOpenFee}</td>
//                 <td>{ad.userId}</td>
//                 <td>${ad.totalDeposit}</td>
//                 <td>{formatDate(ad.createdAt)}</td>
//                 <td>{formatDate(ad.updatedAt)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No approved ads available</p>
//       )}
//     </div>
//   );
// };

// export default ApprovedGoogleAds;



import React, { useEffect, useState } from "react";
import styles from "./ApprovedGoogleAds.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovedGoogleAds = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdsData();
  }, []);

  const fetchAdsData = async () => {
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get("/get-approved-google-ads", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.ads) {
        setAdsData(response.data.ads);
      } else {
        setError("No approved ads found.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  return (
    <div className={styles.container}>
      <h2>Approved Google Ads</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : adsData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Ad Number</th>
              <th>Gmail</th>
              <th>State</th>
              <th>Total Cost</th>
              <th>Account Open Fee</th>
              <th>Total Deposit</th>
              {/* <th>Ad Deposits</th> */}
              {/* <th>Refunds</th> */}
              <th>Created Time</th>
              <th>Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {adsData.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.applyId}</td>
                <td>{ad.userId?.username || "N/A"}</td>
                <td>{ad.userId?.contact?.emailId || "N/A"}</td>
                <td>{ad.adNum}</td>
                <td>{
                  ad.adsDetails?.length > 0 
                    ? ad.adsDetails.map((detail) => detail.gmail).join(", ")
                    : "N/A"
                }</td>
                <td>
                  <span className={`${styles.state} ${styles[ad.state.toLowerCase()]}`}>
                    {ad.state || "N/A"}
                  </span>
                </td>
                <td>${ad.totalCost}</td>
                <td>${ad.accountOpenFee}</td>
                <td>${ad.totalDeposit}</td>
                {/* <td>{ad.adDeposit?.length > 0 ? ad.adDeposit.join(", ") : "N/A"}</td> */}
                {/* <td>{ad.refund?.length > 0 ? ad.refund.join(", ") : "N/A"}</td> */}
                <td>{formatDate(ad.createdAt)}</td>
                <td>{formatDate(ad.updatedAt)}</td>
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

export default ApprovedGoogleAds;
