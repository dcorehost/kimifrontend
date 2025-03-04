

import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaEnvelope } from "react-icons/fa"; 
import { FaHeadset } from "react-icons/fa6";

import styles from "./ReadyToStart.module.css";

const ReadyToStart = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ready to start</h1>
      
      <Link to="/contact-us" className={styles.button}>
        Contact Us
      </Link>

      <div className={styles.info}>
        <p className={styles.call}>
          <FaHeadset className={styles.icon} /> <strong>Call on:</strong> +852 9527 5084
        </p>

        <p className={styles.time}>
          <FaClock className={styles.icon} /> <strong>Time:</strong> 9:00 - 18:00 (+8 timezone)
        </p>
        
        <p className={styles.email}>
          <FaEnvelope className={styles.icon} /> <strong>Email:</strong> info@admediaagency.online
        </p>
      </div>
    </div>
  );
};

export default ReadyToStart;
