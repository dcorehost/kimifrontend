import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ApplyGoogleAdsTable.module.css";

const ApplyGoogleAdsTable = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/google/accountManage/accountList");
  };

  const data = [
    {
      applyId: "APP001",
      adsNumber: "AD001",
      state: "Active",
      totalCost: "$500",
      applyTime: "2025-01-09",
    },
    {
      applyId: "APP002",
      adsNumber: "AD002",
      state: "Inactive",
      totalCost: "$200",
      applyTime: "2025-01-08",
    },
  ];

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleNextPage}>
        Create ad here
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Apply ID</th>
              <th>Ads Number</th>
              <th>State</th>
              <th>Total Cost</th>
              <th>Apply Time</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.applyId}</td>
                <td>{row.adsNumber}</td>
                <td>{row.state}</td>
                <td>{row.totalCost}</td>
                <td>{row.applyTime}</td>
                <td></td> {/* Empty "Operate" column */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplyGoogleAdsTable;
