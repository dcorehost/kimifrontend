



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';




const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Kimi Agency</div>
      <nav>
        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>Business</li>
          <li>Contact us</li>
          <li>Policy</li>
        </ul>
      </nav>
      <div className={styles.actions}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.registerBtn}>Register</button>
      </div>
    </header>
  );
};

export default Navbar;
