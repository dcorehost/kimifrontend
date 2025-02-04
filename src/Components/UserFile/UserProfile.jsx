// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./UserProfile.module.css";

// const UserProfile = () => {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     username: "john_doe",
//     realname: "John Doe",
//     email: "john@example.com",
//     mobile: "123-456-7890",
//     password: "",
//   });

//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdlM2Q2OWU2ZGFkZDYwNjRkM2IzN2IiLCJwaG9uZSI6NDMyODcsImVtYWlsIjoiZGVlcGlrYWF3d3ExQGdtYWlsLmNvbSIsInR5cGVPZlVzZXIiOiJVc2VyIiwiaWF0IjoxNzM2MzM0Mjg2LCJleHAiOjE3Mzg5MjYyODZ9.GwyheOODZqAy4wEpc8HW3R9ockiVR2S9kahrFuYomXY"; // Replace with the actual token

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const { value } = e.target;
//     setNewPassword(value);

//     if (value && confirmPassword && value !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const { value } = e.target;
//     setConfirmPassword(value);

//     if (newPassword && value !== newPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleSave = async () => {
//     try {
//       // const response = await fetch("http://13.127.161.242:8001/kimi/update-profile", {
//       const response = await fetch("http://admediaagency.online/kimi/update-profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           realname: userData.realname,
//           mobile: userData.mobile,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message || "Profile updated successfully!");
//         setUserData((prevData) => ({
//           ...prevData,
//           ...data.user,
//         }));
//       } else {
//         const errorData = await response.json();
//         alert(`Error updating profile: ${errorData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       alert(`Error updating profile: ${error.message}`);
//     }
//   };

//   const handlePasswordUpdate = async () => {
//     if (!newPassword || !confirmPassword) {
//       alert("Please fill in both password fields.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       // const response = await fetch("http://13.127.161.242:8001/kimi/update-password", {
//       const response = await fetch("http://admediaagency.online/kimi/update-password", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           password: newPassword,
//           confirmPassword,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message || "Password updated successfully!");
//         setNewPassword("");
//         setConfirmPassword("");
//       } else {
//         const errorData = await response.json();
//         alert(`Error updating password: ${errorData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       alert(`Error updating password: ${error.message}`);
//     }
//   };

//   const handleNavigateToSettings = () => {
//     navigate("/settings");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.profileInfo}>
//         <h2>Profile Information</h2>
//         <div className={styles.infoItem}>
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             value={userData.username}
//             onChange={handleInputChange}
//             placeholder="Enter your username"
//             disabled
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Real Name</label>
//           <input
//             type="text"
//             name="realname"
//             value={userData.realname}
//             onChange={handleInputChange}
//             placeholder="Enter your real name"
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleInputChange}
//             placeholder="Enter your email"
//             disabled
//           />
//         </div>
//         <section className={styles.emailInfo}>
//           <p>
//             You can manage verified email addresses in your {" "}
//             <a
//               href="#"
//               className={styles.settingsLink}
//               onClick={handleNavigateToSettings}
//             >
//               settings
//             </a>
//             .
//           </p>
//         </section>
//         <div className={styles.infoItem}>
//           <label>Mobile</label>
//           <input
//             type="number"
//             name="mobile"
//             value={userData.mobile}
//             onChange={handleInputChange}
//             placeholder="Enter your mobile number"
//           />
//         </div>
//         <button className={styles.saveButton} onClick={handleSave}>
//           Save Profile
//         </button>
//       </div>

//       <div className={styles.passwordUpdate}>
//         <h2>Update Password</h2>
//         <div className={styles.infoItem}>
//           <label>New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={newPassword}
//             onChange={handlePasswordChange}
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={handleConfirmPasswordChange}
//             placeholder="Confirm new password"
//           />
//         </div>
//         {passwordError && <p className={styles.error}>{passwordError}</p>}
//         <button className={styles.saveButton} onClick={handlePasswordUpdate}>
//           Update Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./UserProfile.module.css";

// const UserProfile = () => {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     username: "john_doe",
//     realname: "John Doe",
//     email: "john@example.com",
//     mobile: "123-456-7890",
//     password: "",
//   });

//   // Retrieve token dynamically from localStorage
//   const token = localStorage.getItem("userToken"); // Get token from localStorage

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const { value } = e.target;
//     setNewPassword(value);

//     if (value && confirmPassword && value !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const { value } = e.target;
//     setConfirmPassword(value);

//     if (newPassword && value !== newPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleSave = async () => {
//     if (!token) {
//       alert("User is not authenticated.");
//       return;
//     }

//     try {
//       const response = await fetch("http://admediaagency.online/kimi/update-profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           realname: userData.realname,
//           mobile: userData.mobile,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message || "Profile updated successfully!");
//         setUserData((prevData) => ({
//           ...prevData,
//           ...data.user,
//         }));
//       } else {
//         const errorData = await response.json();
//         alert(`Error updating profile: ${errorData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       alert(`Error updating profile: ${error.message}`);
//     }
//   };

//   const handlePasswordUpdate = async () => {
//     if (!newPassword || !confirmPassword) {
//       alert("Please fill in both password fields.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     if (!token) {
//       alert("User is not authenticated.");
//       return;
//     }

//     try {
//       const response = await fetch("http://admediaagency.online/kimi/update-password", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           password: newPassword,
//           confirmPassword,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message || "Password updated successfully!");
//         setNewPassword("");
//         setConfirmPassword("");
//       } else {
//         const errorData = await response.json();
//         alert(`Error updating password: ${errorData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       alert(`Error updating password: ${error.message}`);
//     }
//   };

//   const handleNavigateToSettings = () => {
//     navigate("/settings");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.profileInfo}>
//         <h2>Profile Information</h2>
//         <div className={styles.infoItem}>
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             value={userData.username}
//             onChange={handleInputChange}
//             placeholder="Enter your username"
//             disabled
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Real Name</label>
//           <input
//             type="text"
//             name="realname"
//             value={userData.realname}
//             onChange={handleInputChange}
//             placeholder="Enter your real name"
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleInputChange}
//             placeholder="Enter your email"
//             disabled
//           />
//         </div>
//         <section className={styles.emailInfo}>
//           <p>
//             You can manage verified email addresses in your{" "}
//             <a
//               href="#"
//               className={styles.settingsLink}
//               onClick={handleNavigateToSettings}
//             >
//               settings
//             </a>
//             .
//           </p>
//         </section>
//         <div className={styles.infoItem}>
//           <label>Mobile</label>
//           <input
//             type="number"
//             name="mobile"
//             value={userData.mobile}
//             onChange={handleInputChange}
//             placeholder="Enter your mobile number"
//           />
//         </div>
//         <button className={styles.saveButton} onClick={handleSave}>
//           Save Profile
//         </button>
//       </div>

//       <div className={styles.passwordUpdate}>
//         <h2>Update Password</h2>
//         <div className={styles.infoItem}>
//           <label>New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={newPassword}
//             onChange={handlePasswordChange}
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={handleConfirmPasswordChange}
//             placeholder="Confirm new password"
//           />
//         </div>
//         {passwordError && <p className={styles.error}>{passwordError}</p>}
//         <button className={styles.saveButton} onClick={handlePasswordUpdate}>
//           Update Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



// // working code 
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./UserProfile.module.css";

// const UserProfile = () => {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     username: "john_doe",
//     realname: "John Doe",
//     email: "john@example.com",
//     mobile: "123-456-7890",
//     password: "",
//   });

//   // Retrieve token dynamically from localStorage
//   const token = localStorage.getItem("userToken"); // Get token from localStorage

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const { value } = e.target;
//     setNewPassword(value);

//     if (value && confirmPassword && value !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const { value } = e.target;
//     setConfirmPassword(value);

//     if (newPassword && value !== newPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleSave = async () => {
//     if (!token) {
//       alert("User is not authenticated.");
//       return;
//     }

//     try {
//       const response = await fetch("http://admediaagency.online/kimi/update-profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           realname: userData.realname,
//           mobile: userData.mobile,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message || "Profile updated successfully!");
//         setUserData((prevData) => ({
//           ...prevData,
//           ...data.user,
//         }));
//       } else {
//         const errorData = await response.json();
//         alert(`Error updating profile: ${errorData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       alert(`Error updating profile: ${error.message}`);
//     }
//   };

//   const handlePasswordUpdate = async () => {
//     if (!newPassword || !confirmPassword) {
//       alert("Please fill in both password fields.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     if (!token) {
//       alert("User is not authenticated.");
//       return;
//     }

//     try {
//       const response = await fetch("http://admediaagency.online/kimi/update-password", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           password: newPassword,
//           confirmPassword,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message || "Password updated successfully!");
//         setNewPassword("");
//         setConfirmPassword("");
//       } else {
//         const errorData = await response.json();
//         alert(`Error updating password: ${errorData.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       alert(`Error updating password: ${error.message}`);
//     }
//   };

//   const handleNavigateToSettings = () => {
//     navigate("/settings");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.profileInfo}>
//         <h2>Profile Information</h2>
//         <div className={styles.infoItem}>
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             value={userData.username}
//             onChange={handleInputChange}
//             placeholder="Enter your username"
//             disabled
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Real Name</label>
//           <input
//             type="text"
//             name="realname"
//             value={userData.realname}
//             onChange={handleInputChange}
//             placeholder="Enter your real name"
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleInputChange}
//             placeholder="Enter your email"
//             disabled
//           />
//         </div>
//         <section className={styles.emailInfo}>
//           <p>
//             You can manage verified email addresses in your{" "}
//             <a
//               href="#"
//               className={styles.settingsLink}
//               onClick={handleNavigateToSettings}
//             >
//               settings
//             </a>
//             .
//           </p>
//         </section>
//         <div className={styles.infoItem}>
//           <label>Mobile</label>
//           <input
//             type="number"
//             name="mobile"
//             value={userData.mobile}
//             onChange={handleInputChange}
//             placeholder="Enter your mobile number"
//           />
//         </div>
//         <button className={styles.saveButton} onClick={handleSave}>
//           Save Profile
//         </button>
//       </div>

//       <div className={styles.passwordUpdate}>
//         <h2>Update Password</h2>
//         <div className={styles.infoItem}>
//           <label>New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={newPassword}
//             onChange={handlePasswordChange}
//             placeholder="Enter new password"
//           />
//         </div>
//         <div className={styles.infoItem}>
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={handleConfirmPasswordChange}
//             placeholder="Confirm new password"
//           />
//         </div>
//         {passwordError && <p className={styles.error}>{passwordError}</p>}
//         <button className={styles.saveButton} onClick={handlePasswordUpdate}>
//           Update Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./UserProfile.module.css";

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("userToken");
//   const storedUserData = localStorage.getItem("userData");
  
//   const initialUserData = storedUserData ? JSON.parse(storedUserData) : {
//     username: "",
//     realname: "",
//     email: "",
//     mobile: "",
//     password: ""
//   };

//   const [userData, setUserData] = useState(initialUserData);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   useEffect(() => {
//     if (!token) {
//       alert("User is not authenticated.");
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlePasswordChange = (e) => {
//     const { value } = e.target;
//     setNewPassword(value);
//     setPasswordError(value !== confirmPassword ? "Passwords do not match" : "");
//   };

//   const handleConfirmPasswordChange = (e) => {
//     const { value } = e.target;
//     setConfirmPassword(value);
//     setPasswordError(value !== newPassword ? "Passwords do not match" : "");
//   };

//   const handleSave = async () => {
//     if (!token) return alert("User is not authenticated.");

//     try {
//       const response = await fetch("http://admediaagency.online/kimi/update-profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           realname: userData.realname,
//           mobile: userData.mobile,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Profile updated successfully!");
//         setUserData(data.user);
//         localStorage.setItem("userData", JSON.stringify(data.user));
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };

//   const handlePasswordUpdate = async () => {
//     if (!newPassword || !confirmPassword) return alert("Fill in both password fields.");
//     if (newPassword !== confirmPassword) return alert("Passwords do not match!");
//     if (!token) return alert("User is not authenticated.");

//     try {
//       const response = await fetch("http://admediaagency.online/kimi/update-password", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           password: newPassword,
//           confirmPassword,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Password updated successfully!");
//         setNewPassword("");
//         setConfirmPassword("");
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>User Profile</h2>
//       <div className={styles.profileInfo}>
//         <label>Username</label>
//         <input type="text" name="username" value={userData.username} disabled />
        
//         <label>Real Name</label>
//         <input type="text" name="realname" value={userData.realname} onChange={handleInputChange} />

//         <label>Email</label>
//         <input type="email" name="email" value={userData.email} disabled />

//         <label>Mobile</label>
//         <input type="number" name="mobile" value={userData.mobile} onChange={handleInputChange} />

//         <button onClick={handleSave}>Save Profile</button>
//       </div>

//       <div className={styles.passwordUpdate}>
//         <h2>Update Password</h2>
//         <label>New Password</label>
//         <input type="password" value={newPassword} onChange={handlePasswordChange} />

//         <label>Confirm Password</label>
//         <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />

//         {passwordError && <p className={styles.error}>{passwordError}</p>}
//         <button onClick={handlePasswordUpdate}>Update Password</button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";
import Auth from "../Services/Auth"; // Import the Auth service

const UserProfile = () => {
  const navigate = useNavigate();

  // State for user data
  const [userData, setUserData] = useState({
    username: "",
    realname: "",
    emailId: "",
    mobile: "",
    password: "",
  });

  //Retrieve user authentication data
  useEffect(() => {
    const authData = Auth.getAuthData(); // Get user info from Auth
    if (authData) {
      setUserData((prevData) => ({
        ...prevData,
        username: authData.username || "",
        email: authData.emailId || "",
      }));
    } else {
      console.error("Auth data not found or incomplete.");
    }
  }, []);




  // useEffect(() => {
  //   const authData = Auth.getAuthData(); // Get user info from Auth
  //   console.log("Auth Data:", authData); // Debugging: Log auth data to the console
  //   if (authData) {
  //     setUserData((prevData) => ({
  //       ...prevData,
  //       username: authData.username || "",
  //       emailId: authData.emailId || authData.email || "", // Ensure emailId is correctly assigned
  //     }));
  //   } else {
  //     console.error("Auth data not found or incomplete.");
  //   }
  // }, []);
  
  // Retrieve token dynamically from Auth service
  const token = Auth.getToken();

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

    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    try {
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
          <input type="text" name="username" value={userData.username} disabled />
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
          <input type="email" name="email" value={userData.emailId} disabled />
        </div>
        <section className={styles.emailInfo}>
          <p>
            You can manage verified email addresses in your{" "}
            <a href="#" className={styles.settingsLink} onClick={handleNavigateToSettings}>
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
 


