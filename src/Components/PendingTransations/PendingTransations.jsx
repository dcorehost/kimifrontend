


import React, { useEffect, useState } from "react";
import styles from "./PendingTransations.module.css";
import Httpservices from "../Services/Httpservices";
import Auth from "../Services/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingTransaction = () => {
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
      console.log("Fetching Transactions...");
      const response = await Httpservices.get("/get-transaction-details");
      console.log("Response:", response);

      if (
        response.data.message === "Transaction details fetched successfully" &&
        Array.isArray(response.data.transactions)
      ) {
        setTransactions(response.data.transactions);
      } else {
        setError("Failed to fetch transactions.");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => new Date(isoString).toLocaleString();

  const handleUpdateState = async (id, action) => {
    try {
      console.log(`Updating transaction ID: ${id} to ${action}`);
      const response = await Httpservices.put(
        `/approve-transaction?id=${id}&action=${action}`
      );
      console.log("API Response:", response);

      if (response.data.message === "Transaction is already Completed") {
        toast.error("Transaction is already completed.");
      } else {
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction._id === id
              ? { ...transaction, state: action === "approve" ? "Approved" : "Rejected" }
              : transaction
          )
        );
        toast.success(`Transaction ${action}d successfully!`);
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error(error.response?.data?.message || "Failed to update transaction.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Transactions</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : transactions.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Charge Money</th>
              <th>Transaction ID</th>
              <th>State</th>
              <th>Payment Method</th>
              <th>Created At</th>
              <th>Transaction Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.applyId}</td>
                <td>{transaction.userId?.username || "N/A"}</td>
                <td>{transaction.userId?.contact?.emailId || "N/A"}</td>
                <td>${transaction.chargeMoney}</td>
                <td>{transaction.transactionId}</td>
                <td>
                  <span className={`${styles.state} ${styles[transaction.state.toLowerCase()]}`}>
                    {transaction.state || "N/A"}
                  </span>
                </td>
                <td>{transaction.payway}</td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                  <img
                    src={transaction.image}
                    alt="Transaction"
                    className={styles.transactionImage}
                  />
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleUpdateState(transaction._id, "approve")}
                    disabled={transaction.state === "Approved"}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.disapproveBtn}
                    onClick={() => handleUpdateState(transaction._id, "reject")}
                    disabled={transaction.state === "Rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending transactions available.</p>
      )}
    </div>
  );
};

export default PendingTransaction;
