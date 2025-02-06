import React, { useState } from "react";
import styles from "./ApprovBingAd.module.css"; // Changed the module name to reflect ApprovFacebookAd

const ApprovBingAd = () => {
  // State to manage the table data for Facebook ads, including the totalDeposit field
  const [adsData, setAdsData] = useState([
    {
      applyId: "dcorehost8803080381266",
      state: "Completed",
      totalCost: 405,
      userId: "67a35b40e68ea4e60671e2e2",
      totalDeposit: 150, // Added totalDeposit field
      createdAt: "2025-02-01T10:44:27.744Z",
      updatedAt: "2025-02-06T07:03:12.413Z",
    },
    {
      applyId: "dcorehost234234234234234",
      state: "Pending",
      totalCost: 250,
      userId: "67a35b40e68ea4e60671e2e3",
      totalDeposit: 100, // Added totalDeposit field
      createdAt: "2025-02-05T12:30:00.000Z",
      updatedAt: "2025-02-05T12:45:00.000Z",
    },
  ]);

  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Function to update state for Approve/Disapprove
  const handleUpdateState = (index, newState) => {
    const updatedAds = [...adsData];
    updatedAds[index].state = newState;
    setAdsData(updatedAds);
  };

  // Function to delete an entry
  const handleDelete = (index) => {
    const updatedAds = adsData.filter((_, i) => i !== index);
    setAdsData(updatedAds);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Apply ID</th>
            <th>Status</th>
            <th>Total Cost</th>
            <th>Total Deposit</th> {/* Added Total Deposit column */}
            <th>User ID</th>
            <th>Create Time</th>
            <th>Updated Time</th>
            <th>Operate</th>
          </tr>
        </thead>
        <tbody>
          {adsData.map((ad, index) => (
            <tr key={index}>
              <td>{ad.applyId}</td>
              <td>{ad.state}</td>
              <td>${ad.totalCost}</td>
              <td>${ad.totalDeposit}</td> {/* Displayed Total Deposit */}
              <td>{ad.userId}</td>
              <td>{formatDate(ad.createdAt)}</td>
              <td>{formatDate(ad.updatedAt)}</td>
              <td className={styles.operate}>
                <button
                  className={styles.approveBtn}
                  onClick={() => handleUpdateState(index, "Approved")}
                >
                  Approve
                </button>
                <button
                  className={styles.disapproveBtn}
                  onClick={() => handleUpdateState(index, "Disapproved")}
                >
                  Disapprove
                </button>
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

export default ApprovBingAd;
