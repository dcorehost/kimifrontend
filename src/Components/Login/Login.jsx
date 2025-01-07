import React, { useState } from 'react';
import styles from './Login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { assets } from "../../assets/assets.jsx"; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className={styles.MainContainer}>
    <div className={styles.Content}>
       <div className={styles.backImg}></div>
    </div>
    {/*login form code start */}
    <div className={styles.LoginForm}>
  <div className={styles.container}>
    <div className={styles.logo}>
      <img src={assets.logo} alt="Kimi Agency Logo" className={styles.kimilogo} />
    </div>
    <h2 className={styles.title}>Hello!</h2>
    <p className={styles.title}>WELCOME KIMI AGENCY</p>
    <form onSubmit={handleLogin} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          id="rememberMe"
          className={styles.checkbox}
        />
        <label htmlFor="rememberMe" style={{ marginLeft: '10px' }}>
          Remember Me
        </label>
      </div>
      <button type="submit" className={styles.button}>Login</button>
      <div className={styles.issue}>
        {/* Replace this text with dynamic error messages if needed */}
        Login issues? <a href="/support" className={styles.link}>Contact Support</a>
      </div>
    </form>
  </div>
</div>



    </div>
  );
};

export default Login;
