




import React from 'react';
import styles from './ContactHeader.module.css';
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaSkype, FaTelegram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const ContactHeader = () => {
  return (
    <div className={styles.mainContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.headerText}>Get in touch for more information</h1>
        <p className={styles.headerPara}>
          You can reach us anytime via <a href="mailto:info@kimiagency.com" className={styles.emailLink}>info@kimiagency.com</a>
        </p>
      </div>

      {/* Social Media Icons */}
      <div className={styles.socialIcons}>
        <span>Communicate us on:</span>
        <FaSkype className={styles.icon} />
        <FaTelegram className={styles.icon} />
        <FaWhatsapp className={styles.icon} />
        <FaFacebook className={styles.icon} />
      </div>

      {/* Contact Cards */}
      <div className={styles.contactCards}>
        <div className={styles.card}>
          <FaEnvelope className={styles.cardIcon} />
          <h3>Email us</h3>
          <p>
            We're on top of things and aim to respond to all inquiries within 24 hours.
          </p>
          <a href="mailto:info@kimiagency.com" className={styles.cardLink}>info@kimiagency.com</a>
        </div>
        <div className={styles.card}>
          <FaPhoneAlt className={styles.cardIcon} />
          <h3>Call us</h3>
          <p>
            Let's work together towards a common goal - if you have a problem, please get in touch!
          </p>
          <a href="tel:+85295275084" className={styles.cardLink}>+852 9527 5084</a>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
