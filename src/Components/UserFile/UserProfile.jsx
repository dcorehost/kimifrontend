
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";
import Auth from "../Services/Auth";

const UserProfile = () => {
  const navigate = useNavigate();
  const token = Auth.getToken();

  // State for user data
  const [userData, setUserData] = useState({
    username: "",
    emailId: "",
    mobile: "",
    typeOfUser: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const authData = Auth.getAuthData();
    console.log("Auth Data Retrieved:", authData);  // ✅ Check if authData is being retrieved

    if (authData) {
      setUserData({
        username: authData.username || "",
        emailId: authData.emailId || "",       
        mobile: authData.mobile || "",
        // typeOfUser: authData.typeOfUser || "",
      });
      console.log("User Data After Setting:", {  // ✅ Checking what gets set
        username: authData.username || "",
        emailId: authData.emailId || "",
        mobile: authData.mobile || "",
        // typeOfUser: authData.typeOfUser || "",
    });

    } else {
      console.error("Auth data not found or incomplete.");
    }
  }, []);

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
    setPasswordError(value && confirmPassword && value !== confirmPassword ? "Passwords do not match" : "");
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordError(newPassword && value !== newPassword ? "Passwords do not match" : "");
  };

  const handleSave = async () => {
    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch("https://admediaagency.online/kimi/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
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

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    try {
      const response = await fetch("https://admediaagency.online/kimi/update-password", {
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

        Auth.logout();
        navigate("/login");

      } else {
        const errorData = await response.json();
        alert(`Error updating password: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`Error updating password: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileInfo}>
        <h2>Profile Information</h2>
        <div className={styles.infoItem}>
          <label>Username</label>
          <input type="text" name="username" value={userData.username} disabled />
        </div>
        <div className={styles.infoItem}>
          <label>Email</label>
          <input type="email" name="emailId" value={userData.emailId} disabled />
        </div>
        <section className={styles.emailInfo}>
          <p>
            You can change email addresses in your{" "}
            <a href="/dashboard/settings" className={styles.settingsLink}>
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
        {/* <div className={styles.infoItem}>
          <label>User Type</label>
          <input type="text" name="typeOfUser" value={userData.typeOfUser} disabled />
        </div> */}
        <button className={styles.saveButton} onClick={handleSave}>
          Save Profile
        </button>
      </div>

      <div className={styles.passwordUpdate}>
        <h2>Update Password</h2>
        <div className={styles.infoItem}>
          <label>New Password</label>
          <input type="password" name="newPassword" value={newPassword} onChange={handlePasswordChange} />
        </div>
        <div className={styles.infoItem}>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
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
