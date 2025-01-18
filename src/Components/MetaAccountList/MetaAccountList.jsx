import React from "react";
import styles from "./MetaAccountList.module.css";

const MetaAccountList = () => {
  return (
    <div className={styles.container}>
      {/* Notification Section */}
      <div className={styles.notificationSection}>
        <h3 className={styles.sectionTitle}>Notification</h3>
        <div className={styles.notificationCards}>
          {["Pending Application", "Pending Deposit", "Pending Modify", "Pending Share", "Pending Refund"].map(
            (title, index) => (
              <div key={index} className={styles.card}>
                <p className={styles.cardTitle}>{title}</p>
                <p className={styles.cardCount}>0</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Ad Account List Section */}
      <div className={styles.adAccountSection}>
        <h3 className={styles.sectionTitle}>Ad Account List</h3>
        <div className={styles.actionButtons}>
          <button className={`${styles.button} ${styles.createAdButton}`}>
            direct create ad
          </button>
          <button className={`${styles.button} ${styles.vipButton}`}>
            vip package
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>License</th>
                <th>Ads Account ID</th>
                <th>Ads Account Name</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className={styles.noData}>
                  <img
                    src="/path/to/no-data-image.png"
                    alt="No Data"
                    className={styles.noDataImage}
                  />
                  <p>No Data</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MetaAccountList;
