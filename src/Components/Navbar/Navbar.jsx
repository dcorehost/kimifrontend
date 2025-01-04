import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({isOpen}) => {

  return (
    <nav className={`${styles.navbar} ${isOpen? styles.open : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <h1 className={styles.logo}>
          <Link to="/" style={{ color: '#C0C0C0', textDecoration: 'none' }}>Dcore</Link>
        </h1>


        {/* Buttons */}
        <div className={styles.buttons}>
          {/* <Link to="/Signup">
            <button className={styles.signup}>SignUp</button>
          </Link> */}
          <Link to="/SignIn">
            <button className={styles.login}>Log In</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
