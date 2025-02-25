

import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom"; 
import { FaSkype, FaTelegram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { assets } from "../../assets/assets.jsx"; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.section}>
        <div className={styles.logo}>
          <img src={assets.admedialogo} alt="AdMedia Agency Logo" className={styles.kimilogo} />
        </div>
        <p>
          AdMedia Agency provides cross-border platform Meta, Google,
          cooperate with authorized dealers.
        </p>
      </div>
      <div className={styles.section}>
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link to="/#">Terms of Service</Link>
          </li>
          <li>
            <Link to="/#">Refund Policy</Link>
          </li>
          <li>
            <Link to="/#">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Business</h3>
        <ul>
          <li>
            <Link to="/meta-ads">Meta</Link>
          </li>
          <li>
            <Link to="/bing-ads">Google</Link>
          </li>
          <li>
            <Link to="/google-ads">Bing</Link>
          </li>
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Communicate On</h3>
        <div className={styles.icons}>
          <Link to="/#">
            <FaSkype title="Skype" />
          </Link>
          <Link to="/#">
            <FaTelegram title="Telegram" />
          </Link>
          <Link to="/#">
            <FaWhatsapp title="WhatsApp" />
          </Link>
          <Link to="/#">
            <FaFacebook title="Meta" />
          </Link>
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; 2024 AdMedia Agency. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;



