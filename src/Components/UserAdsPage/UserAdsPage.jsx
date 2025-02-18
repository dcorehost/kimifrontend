import React, { useState, useEffect } from 'react';
import Httpservices from '../Services/Httpservices';
import styles from './UserAdsPage.module.css';

const UserAdsPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Httpservices.get('/get-user-for-admin');
        setUserData(response.data.users);
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
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error} <button onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className={styles.container}>
      <h1>User Ads Information</h1>

      {/* User Information Table */}
      <table className={styles.mainTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr 
              key={user._id} 
              onClick={() => toggleUserAds(user._id)} 
              style={{ cursor: 'pointer' }}
              aria-expanded={expandedUser === user._id}
            >
              <td>{user.username}</td>
              <td>{user.contact?.emailId || 'N/A'}</td>
              <td>{user.contact?.contact1 || 'N/A'}</td>
              <td>{user.address?.country || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditionally Render Ads for Selected User */}
      {expandedUser && (() => {
        const selectedUser = userData.find(user => user._id === expandedUser);
        if (!selectedUser) return null;

        return (
          <div className={styles.adsSection}>
           {selectedUser.googleAds?.length > 0 && (
  <>
    <h2>Google Ads</h2>
    <table className={styles.adsTable}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Ad Number</th>
          <th>Ad Details</th>
          <th>State</th>
          <th>Total Cost</th>
          <th>Apply ID</th>
          <th>Account Open Fee</th>
          <th>Total Deposit</th>
          <th>Ads ID</th>
        </tr>
      </thead>
      <tbody>
        {selectedUser.googleAds.map((ad, index) => (
          <tr key={`google-${selectedUser._id}-${index}`}>
            <td>{selectedUser.username}</td>
            <td>{ad.adNum}</td>
            <td>
              <ul>
                {ad.adsDetails.map((detail, idx) => (
                  <li key={idx}>
                    <p><strong>Email:</strong> {detail.gmail}</p>
                    <p><strong>Deposit:</strong> ${detail.deposit}</p>
                  </li>
                ))}
              </ul>
            </td>
            <td>{ad.state}</td>
            <td>${ad.totalCost}</td>
            <td>{ad.applyId}</td>
            <td>${ad.accountOpenFee}</td>
            <td>${ad.totalDeposit}</td>
            <td>{ad.adsId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}

            {selectedUser.facebookAds?.length > 0 && (
              <>
                <h2>Facebook Ads</h2>
                <table className={styles.adsTable}>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>License Mode</th>
                      <th>License Name</th>
                      <th>Remarks</th>
                      <th>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUser.facebookAds.map((ad, index) => (
                      <tr key={`facebook-${selectedUser._id}-${index}`}>
                        <td>{selectedUser.username}</td>
                        <td>{ad.licenseMode}</td>
                        <td>{ad.licenseName}</td>
                        <td>{ad.remarks}</td>
                        <td>${ad.totalCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

{selectedUser.bingAds?.length > 0 && (
  <>
    <h2>Bing Ads</h2>
    <table className={styles.adsTable}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Ad Number</th>
          <th>Ad Details</th>
          <th>State</th>
          <th>Total Cost</th>
          <th>Apply ID</th>
          <th>Total Deposit</th>
          <th>Ads ID</th>
          <th>total cost</th>
        </tr>
      </thead>
      <tbody>
        {selectedUser.bingAds.map((ad, index) => (
          <tr key={`bing-${selectedUser._id}-${index}`}>
            <td>{selectedUser.username}</td>
            <td>{ad.adNum}</td>
            <td>
              <ul>
                {ad.adsDetails.map((detail, idx) => (
                  <li key={idx}>
                    <p><strong>Domain:</strong> {detail.domain}</p>
                    <p><strong>Outlook Email:</strong> {detail.outlookMail}</p>
                    <p><strong>Deposit:</strong> ${detail.deposit}</p>
                  </li>
                ))}
              </ul>
            </td>
            <td>{ad.state}</td>
            <td>${ad.totalCost}</td>
            <td>{ad.applyId}</td>
            <td>${ad.totalDeposit}</td>
            <td>{ad.adsId}</td>
            <td>{ad.totalCost}</td>
          </tr>
        ))}
        {selectedUser.adsDeposit?.length > 0 && (
  <>
    <h2>Ads Deposit</h2>
    <table className={styles.adsDepositTable}>
      <thead>
        <tr>
          <th>Ads ID</th>
          <th>Apply ID</th>
          <th>Deposit (Money)</th>
          <th>State</th>
          <th>Total Cost</th>
          <th>Ad Type</th>
        </tr>
      </thead>
      <tbody>
        {selectedUser.adsDeposit.map((ad, index) => (
          <tr key={`adsDeposit-${selectedUser._id}-${index}`}>
            <td>{ad.adsId}</td>
            <td>{ad.applyId}</td>
            <td>${ad.money}</td>
            <td>{ad.state}</td>
            <td>${ad.totalCost}</td>
            <td>{ad.adType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}

      </tbody>
    </table>
  </>
)}

          </div>
        );
      })()}
    </div>
  );
};

export default UserAdsPage;
