import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GmailShareLogTable.module.css";

const GmailShareLogTable = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/next-page");
  };

  const data = [
    {
      applyId: "APP001",
      adsId: "AD001",
      gmail: "user1@gmail.com",
      state: "Shared",
    },
    {
      applyId: "APP002",
      adsId: "AD002",
      gmail: "user2@gmail.com",
      state: "Pending",
    },
  ];

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleNextPage}>
        Create log here
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads ID</th>
              <th>Gmail</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.applyId}</td>
                <td>{row.adsId}</td>
                <td>{row.gmail}</td>
                <td>{row.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GmailShareLogTable;
