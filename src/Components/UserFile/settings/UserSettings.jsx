import React, { useState } from "react";
import httpServices from "../../Services/Httpservices.jsx";
import Auth from "../../Services/Auth.js";
import styles from "./Usersetting.module.css";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get Auth Token
  const authData = Auth.getAuthData();
  const token = authData?.token;

  // Send OTP to Email
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await httpServices.post(
        "/email-change",
        { newEmail: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("OTP has been sent to your email.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await httpServices.post(
        "/verify-email",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Email verified successfully!");
      setStep(1);
      setEmail("");
      setOtp("");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Email Verification</h2>
      <hr />
      <p>Verify your email address</p>

      {step === 1 ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.button} onClick={handleSendOtp} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className={styles.input}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className={styles.button} onClick={handleVerifyOtp} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default VerifyEmail;
