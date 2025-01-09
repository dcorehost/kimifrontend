import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RefundTable.module.css";

const RefundTable = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/next-page");
  };

  const data = [
    {
      applyId: "APP001",
      adsId: "AD001",
      applyMoney: "$500",
      remainMoney: "$300",
      refundWithFee: "$100",
      applyState: "Approved",
      createTime: "2025-01-09",
    },
    {
      applyId: "APP002",
      adsId: "AD002",
      applyMoney: "$200",
      remainMoney: "$100",
      refundWithFee: "$50",
      applyState: "Pending",
      createTime: "2025-01-08",
    },
  ];

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleNextPage}>
        Create refund here
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads ID</th>
              <th>Apply Money</th>
              <th>Remain Money</th>
              <th>Refund with Fee</th>
              <th>Apply State</th>
              <th>Create Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.applyId}</td>
                <td>{row.adsId}</td>
                <td>{row.applyMoney}</td>
                <td>{row.remainMoney}</td>
                <td>{row.refundWithFee}</td>
                <td>{row.applyState}</td>
                <td>{row.createTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundTable;
