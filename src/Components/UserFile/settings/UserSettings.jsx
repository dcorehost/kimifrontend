import React from "react";
import styles from "./Usersetting.module.css";

const UserSetting = () => {
  return (
    <div className={styles.container}>
      <div className={styles.section2}>
        <h2>Email Verify</h2>
        <hr />
        <p>Please verify your email address</p>
        <input type="email" placeholder="Please enter email" className={styles.input} />
        <div>
        <button className={styles.button}>Send Email Verify</button>
        </div>
      </div>
      <h2>Two-factor authentication</h2>
      <hr />
      <div className={styles.section}>
        {/* <h2>Two-factor authentication</h2> */}
        <div className={styles.lockIcon}>🔒</div>
        <p className={styles.status}>Two-factor authentication is not enabled yet</p>
        <p className={styles.description}>
          Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in
        </p>
        <button className={styles.button}>Enable two-factor authentication</button>
      </div>
    </div>
  );
};

export default UserSetting;
