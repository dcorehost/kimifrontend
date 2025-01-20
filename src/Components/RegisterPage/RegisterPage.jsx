import React, { useState } from 'react';
import styles from './RegisterPage.module.css'; // Import the CSS Module

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactMethod: '',
    contact1: '',
    areaCode: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agencyAds: false,
    globalCompanyRegistration: false,
    dropShippingService: false,
    codFulfillmentService: false,
    platforms: [], // New state for selected platforms
  });

  const areaCodes = {
    Whatsapp: ['+1', '+44', '+91', '+61'],
    Skype: ['Live CID'],
    Telegram: ['+1', '+91'],
  };

  const platforms = [
    'Facebook',
    'Instagram',
    'Google',
    'LinkedIn',
    'Twitter',
    'YouTube',
    'Snapchat',
    'TikTok',
    'Pinterest',
    'Reddit',
    'Quora',
    'Bing',
    'Yahoo',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    const updatedPlatforms = checked
      ? [...formData.platforms, value]
      : formData.platforms.filter((platform) => platform !== value);
    setFormData({ ...formData, platforms: updatedPlatforms });
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const areaCode = formData.areaCode;
    const phoneNumber = value.startsWith(areaCode)
      ? value.slice(areaCode.length)
      : value;

    setFormData({
      ...formData,
      phoneNumber,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
    } else {
      alert('Registration Successful');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Please enter username"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Please enter email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contactMethod">Contact Method</label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="">Select</option>
            <option value="india">India</option>
            <option value="uK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="US">United States</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact1">Contact 1</label>
          <select
            id="contact1"
            name="contact1"
            value={formData.contact1}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="">Select</option>
            <option value="Whatsapp">Whatsapp</option>
            <option value="Skype">Skype</option>
            <option value="Telegram">Telegram</option>
          </select>
        </div>
        {formData.contact1 && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="areaCode">Area Code</label>
              <select
                id="areaCode"
                name="areaCode"
                value={formData.areaCode}
                onChange={handleChange}
                required
                className={styles.input}
              >
                <option value="">Select Area Code</option>
                {areaCodes[formData.contact1]?.map((code, index) => (
                  <option key={index} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
            {formData.areaCode && (
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder={`Enter number (e.g., ${formData.areaCode}123456789)`}
                  value={`${formData.areaCode}${formData.phoneNumber}`}
                  onChange={handlePhoneNumberChange}
                  required
                  className={styles.input}
                />
              </div>
            )}
          </>
        )}
        <div className={styles.formGroup}>
          <label>Services:</label>
          <div className={styles.checkboxGroupColumn}>
            <label>
              <input
                type="checkbox"
                name="agencyAds"
                checked={formData.agencyAds}
                onChange={handleChange}
              />
              Agency Ads
            </label>
            <label>
              <input
                type="checkbox"
                name="globalCompanyRegistration"
                checked={formData.globalCompanyRegistration}
                onChange={handleChange}
              />
              Global Company Registration
            </label>
            <label>
              <input
                type="checkbox"
                name="dropShippingService"
                checked={formData.dropShippingService}
                onChange={handleChange}
              />
              Drop Shipping Service & COD Fulfillment Service
            </label>
          </div>
        </div>
        {formData.agencyAds && (
          <div className={styles.formGroup}>
            <label>Which Platform:</label>
            <div className={styles.checkboxGroupColumn}>
              {platforms.map((platform, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={platform}
                    checked={formData.platforms.includes(platform)}
                    onChange={handlePlatformChange}
                  />
                  {platform}
                </label>
              ))}
            </div>
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Please enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Please enter confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
