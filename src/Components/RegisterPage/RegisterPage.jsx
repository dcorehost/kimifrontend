import React, { useState } from "react";
import styles from "./RegisterPage.module.css"; // Import CSS module
import { assets } from "../../assets/assets.jsx";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    contact1Method: "",
    contact1CountryCode: "",
    contact1Number: "",
    contact2Method: "", // Skype or Telegram
    contact2Id: "", // Skype or Telegram ID
    interested: [], // Store multiple selections here
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      // For multiple selections, toggle the value in the 'interested' array
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, contact1Method, contact1CountryCode, contact1Number, contact2Method, contact2Id, interested } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registering user:", { name, email, password, contact1Method, contact1CountryCode, contact1Number, contact2Method, contact2Id, interested });
    // Add your registration logic here (e.g., API call)
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.logo}>
        <img src={assets.logo} alt="Kimi Agency Logo" className={styles.kimilogo} />
      </div>
      <div className={styles.RegisterForm}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.disInput}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">* User Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="User name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">* Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="country">* Country</label>
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="">Select your country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="India">India</option>
                {/* Add more countries as needed */}
              </select>
            </div>
          </div>

          {/* Contact 1 Options */}
          <div className={styles.disInput}>
            <div className={styles.inputGroup}>
              <label htmlFor="contact1Method">* Contact 1</label>
              <select
                name="contact1Method"
                id="contact1Method"
                value={formData.contact1Method}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="Skype">Skype</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Telegram">Telegram</option>
              </select>
            </div>

            {/* Country Code and Phone Number for Contact 1 */}
            <div className={styles.inputGroup}>
              <label htmlFor="contact1CountryCode">please choose area code</label>
              <select
                name="contact1CountryCode"
                id="contact1CountryCode"
                value={formData.contact1CountryCode}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="">please choose area code</option>
                <option value="+1">+1 (USA, Canada)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="contact1Number">Mobile Number</label>
              <input
                type="tel"
                name="contact1Number"
                id="contact1Number"
                placeholder="Phone Number"
                value={formData.contact1Number}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Contact 2 Options */}
          <div className={styles.disInput}>
            <div className={styles.inputGroup}>
              <label htmlFor="contact2Method">* Contact 2</label>
              <select
                name="contact2Method"
                id="contact2Method"
                value={formData.contact2Method}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="Skype">Skype</option>
                <option value="Telegram">Telegram</option>
              </select>
            </div>

            {/* Contact 2 ID (Skype ID or Telegram ID) */}
            <div className={styles.inputGroup}>
              <label htmlFor="contact2Id">Enter Skype or Telegram ID</label>
              <input
                type="text"
                name="contact2Id"
                id="contact2Id"
                placeholder="Enter Skype or Telegram ID"
                value={formData.contact2Id}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          
          {/* New Interested in section */}
          <div className={styles.inputGroup}>
            <label htmlFor="interested">* Interested in</label>
            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="interested"
                  value="Web Development"
                  checked={formData.interested.includes("Web Development")}
                  onChange={handleChange}
                />
                Agency ads
              </label>
              <label>
                <input
                  type="checkbox"
                  name="interested"
                  value="App Development"
                  checked={formData.interested.includes("App Development")}
                  onChange={handleChange}
                />
                Global company Registration
              </label>
              <label>
                <input
                  type="checkbox"
                  name="interested"
                  value="Digital Marketing"
                  checked={formData.interested.includes("Digital Marketing")}
                  onChange={handleChange}
                />
                Drop-shippingn Service & COD Fulfillment  Service
              </label>
              {/* Add more options as needed */}
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">* Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">* Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

            
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage; 