import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MetaApplyNewAdAccount.module.css";

const MetaApplyNewadAccount = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/next-page");
  };

  const data = [
    {
      applyId: "APP001",
      adsId: "AD001",
      chargeMoney: "$100",
      totalCost: "$500",
      state: "Completed",
      createTime: "2025-01-09",
      
    },
    {
      applyId: "APP002",
      adsId: "AD002",
      chargeMoney: "$50",
      totalCost: "$200",
      state: "Pending",
      createTime: "2025-01-08",
    },
  ];

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleNextPage}>
        Create record here
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>apply ID</th>
              <th>license name</th>
              <th>ads number</th>
              <th>state</th>
              <th>total cost</th>
              <th>apply time</th>
              <th>operate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.applyId}</td>
                <td>{row.adsId}</td>
                <td>{row.chargeMoney}</td>
                <td>{row.totalCost}</td>
                <td>{row.state}</td>
                <td>{row.createTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetaApplyNewadAccount;
