

// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import styles from "./ApprovedRefund.module.css";
// import Httpservices from "../Services/Httpservices";
// import Auth from "../Services/Auth";

// const ApprovedRefund = () => {
//   const [refunds, setRefunds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchRefundData();
//   }, []);

//   const fetchRefundData = async () => {
//     const token = Auth.getToken();
//     if (!token) {
//       toast.error("User is not authenticated. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await Httpservices.get("/approved-refund-Details-for-admin", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("API Response:", response.data);

//       if (response.status === 200 && response.data.refundsDetails) {
//         setRefunds(response.data.refundsDetails);
//       } else {
//         toast.error("No refund details available.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.response || err.message);
//       toast.error(err.response?.data?.message || "Failed to fetch refund data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (isoString) => {
//     return isoString ? new Date(isoString).toLocaleString() : "N/A";
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Approved Refund</h2>
//       <ToastContainer position="top-right" autoClose={3000} />

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className={styles.error}>{error}</p>
//       ) : refunds.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Apply ID</th>
//               <th>Ad Google Account</th>
//               <th>Amount</th>
//               <th>Remaining Money</th>
//               <th>Apply State</th>
//               <th>Ad Type</th>
//               <th>Refund Reason</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {refunds.map((refund) => (
//               <tr key={refund.applyId}>
//                 <td>{refund.applyId}</td>
//                 <td>{refund.adGoogleAccount || "N/A"}</td>
//                 <td>${refund.amount}</td>
//                 <td>${refund.remainMoney}</td>
//                 {/* <td>{refund.applyState}</td> */}
//                   <td>
//                                         <span className={`${styles.state} ${styles[refund.applyState.toLowerCase()]}`}>
//                                          {refund.applyState || "N/A"}
//                                          </span>
//                                        </td>
                
//                 <td>{refund.adType}</td>
//                 <td>{refund.refundReason || "N/A"}</td>
//                 <td>{formatDate(refund.createdAt)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No refund details available</p>
//       )}
//     </div>
//   );
// };

// export default ApprovedRefund;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./ApprovedRefund.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const ApprovedRefund = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRefundData();
  }, []);

  const fetchRefundData = async () => {
    const token = Auth.getToken();
    if (!token) {
      toast.error("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get("/approved-refund-Details-for-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.refundsDetails) {
        setRefunds(response.data.refundsDetails);
      } else {
        toast.error("No refund details available.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      toast.error(err.response?.data?.message || "Failed to fetch refund data.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    return isoString ? new Date(isoString).toLocaleString() : "N/A";
  };

  return (
    <div className={styles.container}>
      <h2>Approved Refund</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : refunds.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Ad Type</th>
              <th>Ad ID</th>
              <th>Account Name </th>
              <th>Deposit </th>
              <th>Remarks</th>
              <th>Amount</th>
              <th>Remaining Money</th>
              <th>Apply State</th>
              <th>Refund Reason</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund) => {
              const username = refund.userId?.username || "N/A";
              const emailId = refund.userId?.contact?.emailId || "N/A";
              const adType = refund.adType || "N/A";

              // Handle different ad accounts (Google, Facebook, Bing)
              const accountId =
                refund.adGoogleAccount?._id ||
                refund.adFacebookAccount?._id ||
                "N/A";

              const adsId =
                refund.adGoogleAccount?.adsId ||
                refund.adFacebookAccount?.adsId ||
                "N/A";

              // Facebook-specific details
              const fbAds =
                refund.adFacebookAccount?.ads?.map((ad) => ad.accountName).join(", ") ||
                "N/A";
              const fbDeposit =
                refund.adFacebookAccount?.ads?.map((ad) => ad.deposit).join(", ") ||
                "N/A";
              const remarks = refund.adFacebookAccount?.remarks || "N/A";

              return (
                <tr key={refund.applyId}>
                  <td>{refund.applyId}</td>
                  <td>{username}</td>
                  <td>{emailId}</td>
                  <td>{adType}</td>
                  <td>{adsId}</td>
                  <td>{fbAds}</td>
                  <td>{fbDeposit}</td>
                  <td>{remarks}</td>
                  <td>${refund.amount}</td>
                  <td>${refund.remainMoney}</td>
                  <td>
                    <span className={`${styles.state} ${styles[refund.applyState.toLowerCase()]}`}>
                      {refund.applyState || "N/A"}
                    </span>
                  </td>
                  <td>{refund.refundReason || "N/A"}</td>
                  <td>{formatDate(refund.createdAt)}</td>
                  <td>{formatDate(refund.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No refund details available</p>
      )}
    </div>
  );
};

export default ApprovedRefund;
