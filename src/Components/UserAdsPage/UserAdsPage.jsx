import React, { useState, useEffect } from 'react';
import Httpservices from '../Services/Httpservices';  
import styles from './UserAdsPage.module.css';  

const UserAdsPage = () => {
  const [userData, setUserData] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Httpservices.get('/get-user-for-admin');  
        setUserData(response.data.users);  
        setLoading(false);  
      } catch (err) {
        setError('Failed to fetch data');  
        setLoading(false);
      }
    };

    fetchData();  
  }, []);  

  if (loading) return <div>Loading...</div>;  
  if (error) return <div>{error}</div>;  

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
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.contact.emailId}</td>
              <td>{user.contact.contact1}</td>
              <td>{user.address.country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Google Ads Table */}
      <h2>Google Ads</h2>
      <table className={styles.adsTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Ad Number</th>
            <th>Ad Details</th>
            <th>State</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) =>
            user.googleAds.map((ad, index) => (
              <tr key={`google-${user._id}-${index}`}>
                <td>{user.username}</td>
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
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Facebook Ads Table */}
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
          {userData.map((user) =>
            user.facebookAds.map((ad, index) => (
              <tr key={`facebook-${user._id}-${index}`}>
                <td>{user.username}</td>
                <td>{ad.licenseMode}</td>
                <td>{ad.licenseName}</td>
                <td>{ad.remarks}</td>
                <td>${ad.totalCost}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Bing Ads Table */}
      <h2>Bing Ads</h2>
      <table className={styles.adsTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Ad Number</th>
            <th>Ad Details</th>
            <th>State</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) =>
            user.bingAds.map((ad, index) => (
              <tr key={`bing-${user._id}-${index}`}>
                <td>{user.username}</td>
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserAdsPage;
