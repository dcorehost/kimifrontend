import React, { useState } from "react";
import styles from "./ApprovedRefund.module.css"; // Ensure correct CSS module is used

const ApprovedRefund = () => {
  // State for storing approved refunds
  const [approvedRefunds, setApprovedRefunds] = useState([
    {
      refundId: "approved123456",
      userId: "67a35b40e68ea4e60671e2e2",
      amount: 100.5,
      reason: "Overcharged for service",
      approvedBy: "Admin123",
      createdAt: "2025-02-01T10:43:15.487Z",
      updatedAt: "2025-02-06T08:07:11.101Z",
    },
    {
      refundId: "approved234567",
      userId: "67a35b40e68ea4e60671e2e3",
      amount: 50.0,
      reason: "Canceled service",
      approvedBy: "Admin456",
      createdAt: "2025-02-05T12:30:00.000Z",
      updatedAt: "2025-02-05T12:45:00.000Z",
    },
  ]);

  // Function to format the date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Function to remove an approved refund
  const handleDelete = (index) => {
    const updatedRefunds = approvedRefunds.filter((_, i) => i !== index);
    setApprovedRefunds(updatedRefunds);
  };

  return (
    <div className={styles.container}>
      <h1>Approved Refunds</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Refund ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Approved By</th>
            <th>Create Time</th>
            <th>Updated Time</th>
            <th>Operate</th>
          </tr>
        </thead>
        <tbody>
          {approvedRefunds.map((refund, index) => (
            <tr key={index}>
              <td>{refund.refundId}</td>
              <td>{refund.userId}</td>
              <td>${refund.amount}</td>
              <td>{refund.reason}</td>
              <td>{refund.approvedBy}</td>
              <td>{formatDate(refund.createdAt)}</td>
              <td>{formatDate(refund.updatedAt)}</td>
              <td className={styles.operate}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(index)}
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

export default ApprovedRefund;
