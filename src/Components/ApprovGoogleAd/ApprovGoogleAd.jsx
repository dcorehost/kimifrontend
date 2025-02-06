import React, { useState } from "react";
import styles from "./ApprovGoogleAd.module.css";

const ApprovGoogleAd = () => {
  // State to manage the table data
  const [adsData, setAdsData] = useState([
    {
      applyId: "dcorehost9564895108614",
      state: "Completed",
      totalCost: 145,
      accountOpenFee: 30,
      userId: "67a35b40e68ea4e60671e2e2",
      totalDeposit: 100,
      createdAt: "2025-02-06T05:44:54.872Z",
      updatedAt: "2025-02-06T05:48:11.835Z",
    },
    {
      applyId: "dcorehost234234234234234",
      state: "Pending",
      totalCost: 200,
      accountOpenFee: 40,
      userId: "67a35b40e68ea4e60671e2e3",
      totalDeposit: 150,
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
            <th>Account Open Fee</th>
            <th>User ID</th>
            <th>Total Deposit</th>
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
              <td>${ad.accountOpenFee}</td>
              <td>{ad.userId}</td>
              <td>${ad.totalDeposit}</td>
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

export default ApprovGoogleAd;
