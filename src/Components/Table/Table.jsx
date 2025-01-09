import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css";

const Table = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/next-page");
  };

  const data = [
    {
      adsId: "AD001",
      createTime: "2025-01-09",
    },
    {
      adsId: "AD002",
      createTime: "2025-01-08",
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
              <th>Ads ID</th>
              <th>Create Time</th>
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.adsId}</td>
                <td>{row.createTime}</td>
                <td></td> {/* Empty "Operate" column */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
