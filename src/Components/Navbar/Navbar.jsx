


import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { assets } from "../../assets/assets.jsx";
import { Link } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';  

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    business: false,
    policy: false,
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={assets.logo} alt="AdMedia Agency Logo" className={styles.kimilogo} />
      </div>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        {menuOpen ? '✖' : '☰'}
      </div>
      <nav className={`${styles.navLinksContainer} ${menuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <hr className={styles.hrLine} />
          <li
            className={styles.dropdown}
            onClick={() => toggleDropdown('business')}
          >
            Business
            <span className={styles.arrow}>
              {dropdownOpen.business ? <BsChevronUp /> : <BsChevronDown />}
            </span>
            {dropdownOpen.business && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/meta-ads">Meta</Link>
                </li>
                <li>
                  <Link to="/bing-ads">Bing</Link>
                </li>
                <li>
                  <Link to="/google-ads">Google</Link>
                </li>
              </ul>
            )}
          </li>
          <hr className={styles.hrLine} />
          <li>
            <Link to="/contact-us">Contact</Link>
          </li>
          <hr className={styles.hrLine} />
          <li
            className={styles.dropdown}
            onClick={() => toggleDropdown('policy')}
          >
            Policy
            <span className={styles.arrow}>
              {dropdownOpen.policy ? <BsChevronUp /> : <BsChevronDown />}
            </span>
            {dropdownOpen.policy && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/termof-services">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/refund-policy">Refund Policy</Link>
                </li>
              </ul>
            )}
          </li>
          <hr className={styles.hrLine} />
        </ul>
      </nav>
      <div className={styles.actions}>
        <Link to="/login" className={styles.loginBtn}> Login </Link>
        <Link to="/register" className={styles.registerBtn}> Register </Link>
      </div>
    </header>
  );
};

export default Navbar;
