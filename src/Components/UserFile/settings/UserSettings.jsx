// import React from "react";
// import styles from "./Usersetting.module.css";

// const UserSetting = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.section2}>
//         <h2>Email Verify</h2>
//         <hr />
//         <p>Please verify your email address</p>
//         <input type="email" placeholder="Please enter email" className={styles.input} />
//         <div>
//         <button className={styles.button}>Send Email Verify</button>
//         </div>
//       </div>
//       <h2>Two-factor authentication</h2>
//       <hr />
//       <div className={styles.section}>
//         {/* <h2>Two-factor authentication</h2> */}
//         <div className={styles.lockIcon}>🔒</div>
//         <p className={styles.status}>Two-factor authentication is not enabled yet</p>
//         <p className={styles.description}>
//           Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in
//         </p>
//         <button className={styles.button}>Enable two-factor authentication</button>
//       </div>
//     </div>
//   );
// };

// export default UserSetting;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Usersetting.module.css";
// import Auth from "../../Services/Auth";

// const UserSetting = () => {
//   const [email, setEmail] = useState("");
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [otp, setOtp] = useState("");
//   const token = Auth.getToken();

//   useEffect(() => {
//     const authData = Auth.getAuthData();
//     if (authData && authData.emailId) {
//       setEmail(authData.emailId);
//     }
//   }, []);

//   const handleSendVerification = async () => {
//     if (!email) {
//       alert("Please enter a valid email.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://admediaagency.online/kimi/send-verification-email",
//         { email },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message || "Verification email sent! Check your inbox.");
//       setShowOtpInput(true);
//     } catch (error) {
//       console.error("Error sending verification email:", error);
//       alert(error.response?.data?.message || "Failed to send verification email.");
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp) {
//       alert("Please enter the OTP.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://admediaagency.online/kimi/verify-email",
//         { email, otp },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message || "Email verified successfully!");
//       setShowOtpInput(false);
//       setOtp(""); // Clear OTP field
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       alert(error.response?.data?.message || "Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.section2}>
//         <h2>Email Verify</h2>
//         <hr />
//         <p>Please verify your email address</p>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           className={styles.input}
//           value={email}
//           disabled
//         />
//         <div>
//           <button className={styles.button} onClick={handleSendVerification}>
//             Send Email Verify
//           </button>
//         </div>

//         {showOtpInput && (
//           <div className={styles.otpSection}>
//             <h3>Enter OTP</h3>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               className={styles.input}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button className={styles.button} onClick={handleVerifyOtp}>
//               Submit OTP
//             </button>
//           </div>
//         )}
//       </div>

//       <h2>Two-Factor Authentication</h2>
//       <hr />
//       <div className={styles.section}>
//         <div className={styles.lockIcon}>🔒</div>
//         <p className={styles.status}>Two-factor authentication is not enabled yet</p>
//         <p className={styles.description}>
//           Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
//         </p>
//         <button className={styles.button}>Enable Two-Factor Authentication</button>
//       </div>
//     </div>
//   );
// };

// export default UserSetting;



import React, { useState } from "react";
import axios from "axios";
import styles from "./Usersetting.module.css";
import Auth from "../../Services/Auth"; // Import Auth to get user data

const UserSetting = () => {
  const authData = Auth.getAuthData(); // Get user info
  const [email, setEmail] = useState(authData?.username || ""); // Store email from Auth
  const [otp, setOtp] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Send OTP to email
  const handleSendEmailVerify = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post("https://admediaagency.online/send-verification-email", {
        email,
      });

      if (response.data.success) {
        setShowOtpSection(true); // Show OTP input section
      } else {
        alert("Failed to send verification email.");
      }
    } catch (error) {
      alert("Error sending verification email.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("https://admediaagency.online/verify-email", {
        email,
        otp,
      });

      if (response.data.success) {
        setSuccessMessage("Email verified successfully! ✅");
        setShowOtpSection(false); // Hide OTP section after success
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Error verifying OTP.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.section2}>
        <h2>Email Verify</h2>
        <hr />
        <p>Please verify your email address</p>
        <input
          type="email"
          placeholder="Please enter email"
          className={styles.input}
          value={email}
          onChange={handleEmailChange} // ✅ Now email is editable
        />
        <div>
          <button className={styles.button} onClick={handleSendEmailVerify}>
            Send Email Verify
          </button>
        </div>
      </div>

      {showOtpSection && (
        <div className={styles.otpSection}>
          <h3>Enter OTP</h3>
          <input
            type="text"
            placeholder="Enter OTP"
            className={styles.input}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className={styles.button} onClick={handleVerifyOtp}>
            Submit OTP
          </button>
        </div>
      )}

      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

      <h2>Two-factor authentication</h2>
      <hr />
      <div className={styles.section}>
        <div className={styles.lockIcon}>🔒</div>
        <p className={styles.status}>Two-factor authentication is not enabled yet</p>
        <p className={styles.description}>
          Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
        </p>
        <button className={styles.button}>Enable two-factor authentication</button>
      </div>
    </div>
  );
};

export default UserSetting;
