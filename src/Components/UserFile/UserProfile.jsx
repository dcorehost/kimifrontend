import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "john_doe",
    realname: "John Doe",
    email: "john@example.com",
    mobile: "123-456-7890",
    password: "",
  });

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdlM2Q2OWU2ZGFkZDYwNjRkM2IzN2IiLCJwaG9uZSI6NDMyODcsImVtYWlsIjoiZGVlcGlrYWF3d3ExQGdtYWlsLmNvbSIsInR5cGVPZlVzZXIiOiJVc2VyIiwiaWF0IjoxNzM2MzM0Mjg2LCJleHAiOjE3Mzg5MjYyODZ9.GwyheOODZqAy4wEpc8HW3R9ockiVR2S9kahrFuYomXY"; // Replace with the actual token

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);

    if (value && confirmPassword && value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);

    if (newPassword && value !== newPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSave = async () => {
    try {
      // const response = await fetch("http://13.127.161.242:8001/kimi/update-profile", {
      const response = await fetch("http://admediaagency.online/kimi/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          realname: userData.realname,
          mobile: userData.mobile,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Profile updated successfully!");
        setUserData((prevData) => ({
          ...prevData,
          ...data.user,
        }));
      } else {
        const errorData = await response.json();
        alert(`Error updating profile: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // const response = await fetch("http://13.127.161.242:8001/kimi/update-password", {
      const response = await fetch("http://admediaagency.online/kimi/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: newPassword,
          confirmPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        alert(`Error updating password: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error updating password: ${error.message}`);
    }
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
  };

  return (
    <div className={styles.container}>
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
            disabled
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
            disabled
          />
        </div>
        <section className={styles.emailInfo}>
          <p>
            You can manage verified email addresses in your {" "}
            <a
              href="#"
              className={styles.settingsLink}
              onClick={handleNavigateToSettings}
            >
              settings
            </a>
            .
          </p>
        </section>
        <div className={styles.infoItem}>
          <label>Mobile</label>
          <input
            type="number"
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
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
          />
        </div>
        <div className={styles.infoItem}>
          <label>Confirm Password</label>
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
