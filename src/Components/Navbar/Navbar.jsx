import React, { useState } from 'react';
import styles from './Navbar.module.css';

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
      <div className={styles.logo}>Kimi Agency</div>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        {menuOpen ? '✖' : '☰'}
      </div>
      <nav className={`${styles.navLinksContainer} ${menuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navLinks}>
          <li>Home</li>
          <hr className={styles.hrLine} />
          <li
            className={styles.dropdown}
            onClick={() => toggleDropdown('business')}
          >
            Business
            <span className={styles.arrow}>▼</span>
            {dropdownOpen.business && (
              <ul className={styles.dropdownMenu}>
                <li>Meta</li>
                <li>Bing</li>
                <li>Google</li>
              </ul>
            )}
          </li>
          <hr className={styles.hrLine} />
          <li>Contact </li>
          <hr className={styles.hrLine} />
          <li
            className={styles.dropdown}
            onClick={() => toggleDropdown('policy')}
          >
            Policy
            <span className={styles.arrow}>▼</span>
            {dropdownOpen.policy && (
              <ul className={styles.dropdownMenu}>
                <li>Privacy Policy</li>
                <li>Terms of service</li>
                <li>Refund Policy</li>
              </ul>
            )}
          </li>
          <hr className={styles.hrLine} />
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
