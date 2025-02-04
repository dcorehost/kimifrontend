import { useState } from "react";
import styles from "./SecurityCodeGenerator.module.css";

const SecurityCodeGenerator = () => {
  const [code, setCode] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);
  const [notes, setNotes] = useState("");

  const generateCode = () => {
    // Generate a 6-digit random code
    const newCode = Math.floor(100000 + Math.random() * 900000);
    setCode(newCode);

    // Set the expiration time (e.g., 30 seconds from now)
    setExpiresIn(30);

    // Countdown for expiration
    const countdown = setInterval(() => {
      setExpiresIn((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setCode(""); // Clear the code when it expires
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Security Code Generator 2FA</h1>
      <input
        type="text"
        placeholder="Enter 2FA Key"
        className={styles.input}
      />
      <button onClick={generateCode} className={styles.button}>
        Get Code
      </button>
      <p>Expires later： second</p>
      {code && (
        <div>
          <p className={styles.code}>Generated Code: {code}</p>
          <p className={styles.expiry}>Expires in: {expiresIn} second{expiresIn !== 1 ? "s" : ""}</p>
        </div>
      )}
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Enter your notes here..."
        className={styles.textarea}
      />
    </div>
  );
};

export default SecurityCodeGenerator;
