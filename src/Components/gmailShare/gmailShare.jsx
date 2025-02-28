import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./GmailShareLog.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";

const GmailShareLog = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGmailShareLog();
  }, []);

  const fetchGmailShareLog = async () => {
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get(
        "https://admediaagency.online/kimi/get-gmail-share-log",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 && response.data.length > 0) {
        setUsersData(response.data);
      } else {
        setError("No users have shared their Gmail.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gmail Share Log</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : usersData.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.emailId}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users with shared Gmail found.</p>
      )}
    </div>
  );
};

export default GmailShareLog;