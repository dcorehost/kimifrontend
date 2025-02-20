
// import React, { useState, useEffect } from 'react';
// import Httpservices from '../Services/Httpservices';
// import Auth from '../Services/Auth';
// import styles from './ActiveUser.module.css';

// const ActiveUser = () => {
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedUser, setExpandedUser] = useState(null);
//   const [selectedAd, setSelectedAd] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = Auth.getToken();
//       if (!token) {
//         setError('Unauthorized: Please log in.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await Httpservices.get('https://admediaagency.online/kimi/active-users', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserData(response.data.activeUsers);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//         setError('Failed to fetch user data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const toggleUserAds = (userId) => {
//     setExpandedUser((prevUserId) => (prevUserId === userId ? null : userId));
//     setSelectedAd(null);
//   };

//   const openAdDetails = (ad) => setSelectedAd(ad);
//   const closeAdDetails = () => setSelectedAd(null);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error} <button onClick={() => window.location.reload()}>Retry</button></div>;

//   return (
//     <div className={styles.container}>
//       <h1>All Active Users Information</h1>
//       {!selectedAd && (
//         <table className={styles.mainTable}>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Country</th>
//               <th>Pincode</th>
//               <th>Wallet Balance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userData.map((user) => (
//               <tr 
//                 key={user._id} 
//                 onClick={() => toggleUserAds(user._id)} 
//                 style={{ cursor: 'pointer' }}
//               >
//                 <td>{user.username}</td>
//                 <td>{user.contact?.emailId || 'N/A'}</td>
//                 <td>{user.contact?.contact1 || 'N/A'}</td>
//                 <td>{user.address?.country || 'N/A'}</td>
//                 <td>{user.address?.pincode || 'N/A'}</td>
//                 <td>${user.wallet.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ActiveUser;


import React, { useState, useEffect } from 'react';
import Httpservices from '../Services/Httpservices';
import Auth from '../Services/Auth'; 
import styles from './ActiveUser.module.css';

const ActiveUser = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Auth.getToken(); 
        if (!token) {
          throw new Error('User is not authenticated.');
        }

        const response = await Httpservices.get('https://admediaagency.online/kimi/active-users', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUserData(response.data.activeUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleUserAds = (userId) => {
    setExpandedUser((prevUserId) => (prevUserId === userId ? null : userId));
    setSelectedAd(null);
  };

  const openAdDetails = (ad) => {
    setSelectedAd(ad);
  };

  const closeAdDetails = () => {
    setSelectedAd(null);
  };

  const filterByAdId = (items, adId) => items?.filter(item => item.adsId === adId) || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error} <button onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className={styles.container}>
      <h1>All Active Users Information</h1>

      {!selectedAd && (
        <table className={styles.mainTable}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Pincode</th>
              <th>Wallet Balance</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((activeUser) => (
              <tr 
                key={activeUser._id} 
                onClick={() => toggleUserAds(activeUser._id)} 
                style={{ cursor: 'pointer' }}
                aria-expanded={expandedUser === activeUser._id}
              >
                <td>{activeUser.username}</td>
                <td>{activeUser.contact?.emailId || 'N/A'}</td>
                <td>{activeUser.contact?.contact1 || 'N/A'}</td>
                <td>{activeUser.address?.country || 'N/A'}</td>
                <td>{activeUser.address?.pincode || 'N/A'}</td>
                <td>${activeUser.wallet || '0.00'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!selectedAd && expandedUser && (() => {
        const selectedUser = userData.find(activeUser => activeUser._id === expandedUser);
        if (!selectedUser) return null;

        return (
          <div className={styles.adsSection}>
            {/* Transaction Section */}
            <div>
              <h2>Transactions</h2>
              <table className={styles.adsTable}>
                <thead>
                  <tr>
                    <th>Apply ID</th>
                    <th>Charge Money</th>
                    <th>Transaction ID</th>
                    <th>State</th>
                    <th>Payway</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUser.transactions?.map((transaction, index) => (
                    <tr key={`transaction-${index}`}>
                      <td>{transaction.applyId}</td>
                      <td>${transaction.chargeMoney}</td>
                      <td>{transaction.transactionId}</td>
                      <td>{transaction.state}</td>
                      <td>{transaction.payway}</td>
                      <td>
                        {transaction.image && (
                          <img 
                            src={transaction.image} 
                            alt="Transaction Proof" 
                            style={{ width: '50px', height: '50px' }} 
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ads Sections (Google, Facebook, Bing) */}
            {['googleAds', 'facebookAds', 'bingAds'].map((platform) => (
              <div key={platform}>
                <h2>{platform.replace('Ads', '')} Ads</h2>
                <table className={styles.adsTable}>
                  <thead>
                    <tr>
                      <th>Apply ID</th>
                      <th>Ads ID</th>
                      {platform !== "facebookAds" && <th>Ad Number</th>}
                      <th>Ad Details</th>
                      {platform === "facebookAds" && <th>License Mode</th>}
                      {platform === "facebookAds" && <th>License Name</th>}
                      {platform === "facebookAds" && <th>Page URLs</th>}
                      {platform === "facebookAds" && <th>Domain Option</th>}
                      {platform === "facebookAds" && <th>Domains</th>}
                      {platform !== "facebookAds" && <th>Total Deposit</th>}
                      <th>Total Cost</th>
                      <th>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUser[platform]?.map((ad, index) => (
                      <tr 
                        key={`${platform}-${selectedUser._id}-${index}`}
                        onClick={() => openAdDetails({ ...ad, platform })}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{ad.applyId}</td>
                        <td>{ad.adsId || 'N/A'}</td>
                        {platform !== "facebookAds" && <td>{ad.adNum || 'N/A'}</td>}
                        <td>
                          {platform === "facebookAds"
                            ? ad.ads?.map((detail, i) => (
                                <div key={i}>
                                  {detail.accountName && <><strong>Account:</strong> {detail.accountName} <br /></>}
                                  {detail.deposit && <><strong>Deposit:</strong> ${detail.deposit}</>}
                                </div>
                              )) || 'N/A'
                            : ad.adsDetails?.map((detail, i) => (
                                <div key={i}>
                                  {detail.gmail && <><strong>Email:</strong> {detail.gmail} <br /></>}
                                  {detail.outlookMail && <><strong>Outlook:</strong> {detail.outlookMail} <br /></>}
                                  {detail.domain && <><strong>Domain:</strong> {detail.domain} <br /></>}
                                  {detail.deposit && <><strong>Deposit:</strong> ${detail.deposit}</>}
                                </div>
                              )) || 'N/A'}
                        </td>
                        {platform === "facebookAds" && <td>{ad.licenseMode || 'N/A'}</td>}
                        {platform === "facebookAds" && <td>{ad.licenseName || 'N/A'}</td>}
                        {platform === "facebookAds" && <td>{ad.pageUrls?.join(", ") || 'N/A'}</td>}
                        {platform === "facebookAds" && <td>{ad.domainOption || 'N/A'}</td>}
                        {platform === "facebookAds" && <td>{ad.domains?.join(", ") || 'N/A'}</td>}
                        {platform !== "facebookAds" && <td>{ad.totalDeposit || 'N/A'}</td>}
                        <td>{ad.totalCost ? `$${ad.totalCost.toFixed(2)}` : 'N/A'}</td>
                        <td>{ad.state || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        );
      })()}

      {selectedAd && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeAdDetails}>X</button>
            <h2>Ad Details for {selectedAd.adsId}</h2>
            <h3>Ad Deposits</h3>
            <table className={styles.depositTable}>
              <thead>
                <tr>
                  <th>Ads ID</th>
                  <th>Apply ID</th>
                  <th>Ad type</th>
                  <th>Deposit Amount</th>
                  <th>Total Cost</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {filterByAdId(userData.find(user => user._id === expandedUser)?.adDeposit, selectedAd.adsId).map((deposit, index) => (
                  <tr key={`deposit-${index}`}>
                    <td>{deposit.adsId}</td>
                    <td>{deposit.applyId}</td>
                    <td>{deposit.adType}</td>
                    <td>${deposit.money}</td>
                    <td>{deposit.totalCost}</td>
                    <td>{deposit.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Refunds</h3>
            <table className={styles.refundTable}>
              <thead>
                <tr>
                  <th>Ads ID</th>
                  <th>Apply ID</th>
                  <th>Ad type</th>
                  <th>Amount</th>
                  <th>Remain money</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {filterByAdId(userData.find(user => user._id === expandedUser)?.refund, selectedAd.adsId).map((refund, index) => (
                  <tr key={`refund-${index}`}>
                    <td>{refund.adsId}</td>
                    <td>{refund.applyId}</td>
                    <td>{refund.adType}</td>
                    <td>${refund.amount}</td>
                    <td>{refund.remainMoney}</td>
                    <td>{refund.applyState}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveUser;