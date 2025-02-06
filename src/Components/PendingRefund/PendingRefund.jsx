import React, { useState } from "react";
import styles from "./PendingRefund.module.css"; // Make sure to update this with the correct module name

const PendingRefund = () => {
  // State to manage the table data for pending refunds
  const [refundsData, setRefundsData] = useState([
    {
      refundId: "refund123456",
      userId: "67a35b40e68ea4e60671e2e2",
      amount: 100.5,
      reason: "Overcharged for service",
      status: "Pending",
      createdAt: "2025-02-01T10:43:15.487Z",
      updatedAt: "2025-02-06T08:07:11.101Z",
    },
    {
      refundId: "refund234567",
      userId: "67a35b40e68ea4e60671e2e3",
      amount: 50.0,
      reason: "Canceled service",
      status: "Pending",
      createdAt: "2025-02-05T12:30:00.000Z",
      updatedAt: "2025-02-05T12:45:00.000Z",
    },
  ]);

  // New refund input state
  const [newRefund, setNewRefund] = useState({
    refundId: "",
    userId: "",
    amount: "",
    reason: "",
    status: "Pending",
    createdAt: "",
    updatedAt: "",
  });

  // Handle input changes for new refund
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRefund({ ...newRefund, [name]: value });
  };

  // Add new refund entry
  const handleAddRefund = () => {
    setRefundsData([...refundsData, { ...newRefund, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
    setNewRefund({ refundId: "", userId: "", amount: "", reason: "", status: "Pending", createdAt: "", updatedAt: "" }); // Reset the form
  };

  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className={styles.container}>
      <h1>Pending Refunds</h1>

      {/* Input fields for new refund */}
      <div className={styles.form}>
        <label>Refund ID:</label>
        <input
          type="text"
          name="refundId"
          value={newRefund.refundId}
          onChange={handleInputChange}
        />
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={newRefund.userId}
          onChange={handleInputChange}
        />
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={newRefund.amount}
          onChange={handleInputChange}
        />
        <label>Reason:</label>
        <input
          type="text"
          name="reason"
          value={newRefund.reason}
          onChange={handleInputChange}
        />
        <button className={styles.addBtn} onClick={handleAddRefund}>
          Add Refund
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Refund ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Create Time</th>
            <th>Updated Time</th>
            <th>Operate</th>
          </tr>
        </thead>
        <tbody>
          {refundsData.map((refund, index) => (
            <tr key={index}>
              <td>{refund.refundId}</td>
              <td>{refund.userId}</td>
              <td>${refund.amount}</td>
              <td>{refund.reason}</td>
              <td>{refund.status}</td>
              <td>{formatDate(refund.createdAt)}</td>
              <td>{formatDate(refund.updatedAt)}</td>
              <td className={styles.operate}>
                <button
                  className={styles.approveBtn}
                  onClick={() => {
                    const updatedRefunds = [...refundsData];
                    updatedRefunds[index].status = "Approved";
                    updatedRefunds[index].updatedAt = new Date().toISOString();
                    setRefundsData(updatedRefunds);
                  }}
                >
                  Approve
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => {
                    const updatedRefunds = [...refundsData];
                    updatedRefunds[index].status = "Rejected";
                    updatedRefunds[index].updatedAt = new Date().toISOString();
                    setRefundsData(updatedRefunds);
                  }}
                >
                  Reject
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    const updatedRefunds = refundsData.filter((_, i) => i !== index);
                    setRefundsData(updatedRefunds);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRefund;
