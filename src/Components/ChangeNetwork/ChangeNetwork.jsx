import React, { useState } from "react";
import styles from "./ChangeNetwork.module.css";
import Httpservices from "../../Components/Services/Httpservices";
import Auth from "../../Components/Services/Auth";

const ChangeNetwork = () => {
  const [networkName, setNetworkName] = useState("");
  const [networkAddress, setNetworkAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdateNetwork = async (e) => {
    e.preventDefault();

    const token = Auth.getToken();
    if (!token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    try {
      const response = await Httpservices.put(
        "https://admediaagency.online/kimi/update-network-details",
        { networkName, networkAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message) {
        setMessage(response.data.message);
        setError(null);
      }
    } catch (err) {
      setError("Failed to update network details.");
      console.error("API Error:", err.response || err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Change Network</h2>
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleUpdateNetwork}>
        <div className={styles.inputGroup}>
          <label>Network Name:</label>
          <input
            type="text"
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Network Address:</label>
          <input
            type="text"
            value={networkAddress}
            onChange={(e) => setNetworkAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Update Network
        </button>
      </form>
    </div>
  );
};

export default ChangeNetwork;
