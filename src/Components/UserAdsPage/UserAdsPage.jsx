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

      {expandedUser && (() => {
        const selectedUser = userData.find(user => user._id === expandedUser);
        if (!selectedUser) return null;

        return (
          <div className={styles.adsSection}>
            {/* Google Ads Section */}
            <h2>Google Ads</h2>
            <table className={styles.adsTable}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Ads ID</th>
                  <th>Apply ID</th>
                  <th>Ad Number</th>
                  <th>Ad Details</th>
                  <th>State</th>
                  <th>Account Open Fee</th>
                  <th>Total Deposit</th>
                  <th>Total Cost</th>

                </tr>
              </thead>
              <tbody>
                {selectedUser.googleAds?.length > 0 ? (
                  selectedUser.googleAds.map((ad, index) => (
                    <tr key={`google-${selectedUser._id}-${index}`}>
                      <td>{selectedUser.username}</td>
                      <td>{ad.adsId}</td>
                      <td>{ad.applyId}</td>
                      <td>{ad.adNum}</td>
                      <td>{ad.adsDetails.map(detail => `${detail.gmail} ($${detail.deposit})`).join(', ')}</td>
                      <td>{ad.state}</td>
                      <td>${ad.accountOpenFee}</td>
                      <td>${ad.totalDeposit}</td>
                      <td>${ad.totalCost}</td>

                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="9">No Google Ads available</td></tr>
                )}
              </tbody>
            </table>

            {/* Facebook Ads Section */}
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
                {selectedUser.facebookAds?.length > 0 ? (
                  selectedUser.facebookAds.map((ad, index) => (
                    <tr key={`facebook-${selectedUser._id}-${index}`}>
                      <td>{selectedUser.username}</td>
                      <td>{ad.licenseMode}</td>
                      <td>{ad.licenseName}</td>
                      <td>{ad.remarks}</td>
                      <td>${ad.totalCost}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No Facebook Ads available</td></tr>
                )}
              </tbody>
            </table>

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
                </tr>
              </thead>
              <tbody>
                {selectedUser.bingAds?.length > 0 ? (
                  selectedUser.bingAds.map((ad, index) => (
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>No Bing Ads Available</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Refund Table */}
            <h2>Refunds</h2>
            <table className={styles.refundTable}>
              <thead>
                <tr>
                  <th>Apply ID</th>
                  <th>Bank Account</th>
                  <th>Amount</th>
                  <th>Remaining Balance</th>
                  <th>State</th>
                  <th>ad Type</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.refundBankers?.length > 0 ? (
                  selectedUser.refundBankers.map((refund, index) => (
                    <tr key={`refund-${selectedUser._id}-${index}`}>
                      <td>{refund.applyId}</td>
                      <td>{refund.adBingAccount}</td>
                      <td>${refund.amount}</td>
                      <td>${refund.remainMoney}</td>
                      <td>{refund.applyState}</td>
                      <td>{refund.adType}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6">No Refunds available</td></tr>
                )}
              </tbody>
            </table>

            <h2>Ads Deposit</h2>
            <table className={styles.adsDepositTable}>
              <thead>
                <tr>
                  <th>Ads ID</th>
                  <th>Apply ID</th>
                  <th>Money</th>
                  <th>State</th>
                  <th>Total Cost</th>
                  <th>Ad Type</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.adsDeposits?.length > 0 ? (
                  selectedUser.adsDeposits.map((deposit, index) => (
                    <tr key={`deposit-${selectedUser._id}-${index}`}>
                      <td>{deposit.adsId}</td>
                      <td>{deposit.applyId}</td>
                      <td>${deposit.money}</td>
                      <td>{deposit.state}</td>
                      <td>${deposit.totalCost}</td>
                      <td>{deposit.adType}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No Ads Deposits Available</td>
                  </tr>
                )}
              </tbody>
            </table>
    
            <h2>Transactions</h2>
            <table className={styles.transactionsTable}>
              <thead>
                <tr>
                  <th>Apply ID</th>
                  <th>Charge Money</th>
                  <th>Transaction ID</th>
                  <th>State</th>
                  <th>Image</th>
                  <th>Payway</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser.transactions?.length > 0 ? selectedUser.transactions.map((txn, index) => (
                  <tr key={`txn-${selectedUser._id}-${index}`}>
                    <td>{txn.applyId}</td>
                    <td>${txn.chargeMoney}</td>
                    <td>{txn.transactionId}</td>
                    <td>{txn.state}</td>
                    <td><img src={txn.image} alt="Transaction" width="50" height="50" /></td>
                    <td>{txn.payway}</td>
                  </tr>
                )) : <tr><td colSpan="6">No Transactions Found</td></tr>}
              </tbody>
            </table>

          </div>
        );
      })()}
    </div>
  );
};

export default UserAdsPage;
