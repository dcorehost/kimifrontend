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
        {/* Other input fields */}
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

        {/* Conditional rendering of platforms section */}
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
