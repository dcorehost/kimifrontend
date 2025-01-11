import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const navigate = useNavigate();

  // Initial user data (could be fetched from an API or passed as props)
  const [userData, setUserData] = useState({
    username: "john_doe",
    realname: "John Doe",
    email: "john@example.com",
    mobile: "123-456-7890",
    password: "",
  });

  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming new password
  const [passwordError, setPasswordError] = useState(""); // For showing error messages if passwords don't match

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    if (value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (newPassword !== value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSave = () => {
    // Handle save functionality (could be an API call to save user profile)
    alert("Profile updated successfully!");
  };

  const handlePasswordUpdate = () => {
    if (newPassword === confirmPassword) {
      // Proceed with password update (e.g., API call)
      alert("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleNavigateToSettings = () => {
    navigate("/settings"); // Redirect to settings page
  };

  return (
    <div className={styles.container}>
      {/* <button className={styles.backButton} onClick={handleNavigateToHome}>
        Back to Home
      </button> */}

      {/* <h1>User Profile</h1> */}

      <div className={styles.profileInfo}>
        <h2>Profile Information</h2>
        <div className={styles.infoItem}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
        </div>
        <div className={styles.infoItem}>
          <label>Real Name</label>
          <input
            type="text"
            name="realname"
            value={userData.realname}
            onChange={handleInputChange}
            placeholder="Enter your real name"
          />
        </div>
        <div className={styles.infoItem}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>

        {/* Manage verified email address */}
        <section className={styles.emailInfo}>
          <p>You can manage verified email addresses in your 
          <a href="#" className={styles.settingsLink} onClick={handleNavigateToSettings}>
            Go to Settings
          </a>
          </p>
        </section>

        <div className={styles.infoItem}>
          <label>Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={userData.mobile}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
          />
        </div>

        <button className={styles.saveButton} onClick={handleSave}>
          Save Profile
        </button>
      </div>

      <div className={styles.passwordUpdate}>
        <h2>Update Password</h2>
        <div className={styles.infoItem}>
          <label>  password</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
          />
        </div>
        <div className={styles.infoItem}>
          <label> password again</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
          />
        </div>
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        <button className={styles.saveButton} onClick={handlePasswordUpdate}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
