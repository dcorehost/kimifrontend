
import React, { useEffect, useState } from "react";
import styles from "./ApprovedTransations.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApprovedTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await Httpservices.get(
        "https://admediaagency.online/kimi/get-complete-transaction-details",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (
        response.data.message === "Transaction details fetched successfully" &&
        Array.isArray(response.data.transactions)
      ) {
        setTransactions(response.data.transactions);
      } else {
        setError("No transactions available.");
      }
    } catch (err) {
      setError("Failed to fetch transactions.");
      toast.error("Error fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) =>
    isoString ? new Date(isoString).toLocaleString() : "N/A";

  return (
    <div className={styles.container}>
      <h2>Approved Transactions</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : transactions.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Apply ID</th>
              <th>Charge Money</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Created At</th>
              <th>Transaction Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.applyId}</td>
                <td>${transaction.chargeMoney}</td>
                <td>{transaction.transactionId}</td>
                <td>{transaction.state}</td>
                <td>{transaction.payway}</td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                  <img
                    src={transaction.image}
                    alt="Transaction"
                    className={styles.transactionImage}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default ApprovedTransactions;
