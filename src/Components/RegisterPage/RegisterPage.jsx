

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactMethod1: '',
    pinCode: '',
    phoneNumber1: '',
    password: '',
    confirmPassword: '',
    country: '',
    agencyAds: false,
    selectedPlatforms: [],
    selectedBusinesses: [],
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const platforms = ['Facebook', 'Google', 'Bing', 'Others'];
  const businesses = [
    'Affiliate',
    'E-Com(Clean)',
    'E-Com(BH)',
    'APP',
    'Work At Home',
    'Gambling/Casino/Gaming/Betting',
    'Whatsapp/Telegram Channel',
    'Others',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContactMethodChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      contactMethod1: e.target.value,
      phoneNumber1: '',
      pinCode: '',
    }));
  };

  const handleCheckboxSelection = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [field]: checked
        ? [...prevState[field], value]
        : prevState[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const requestData = {
      username: formData.username,
      emailId: formData.email,
      country: formData.country,
      contact1: formData.phoneNumber1,
      pincode: formData.pinCode,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      agencyAds: formData.agencyAds
        ? {
            platform: formData.selectedPlatforms || [],
            business: formData.selectedBusinesses || [],
          }
        : {},
    };

    try {
      const response = await axios.post(
        'https://admediaagency.online/kimi/create-account',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message) {
        alert(response.data.message); 
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      alert('There was an error creating the account.');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Username and Email */}
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
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
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        {/* Country Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        {/* Contact Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="contactMethod1">Contact Method</label>
          <select
            id="contactMethod1"
            name="contactMethod1"
            value={formData.contactMethod1}
            onChange={handleContactMethodChange}
            required
            className={styles.input}
          >
            <option value="">Select Option</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="skype">Skype</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>

        {/* PIN Code & Mobile Number Section */}
        {formData.contactMethod1 && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="pinCode">Enter PIN Code</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                placeholder="Enter PIN Code"
                value={formData.pinCode}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber1">Enter Mobile Number</label>
              <input
                type="text"
                id="phoneNumber1"
                name="phoneNumber1"
                placeholder="Enter your phone number"
                value={formData.phoneNumber1}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </>
        )}

        {/* Interested In Section */}
        <div className={styles.formGroup}>
          <label>Interested in:</label>
          <label>
            <input
              type="checkbox"
              name="agencyAds"
              checked={formData.agencyAds}
              onChange={handleChange}
            />
            Agency Ads
          </label>

          {formData.agencyAds && (
            <>
              {/* Platforms */}
              <p>Which platforms?</p>
              <div className={styles.platformsGroup}>
                {platforms.map((platform, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={platform}
                      checked={formData.selectedPlatforms.includes(platform)}
                      onChange={(e) => handleCheckboxSelection(e, 'selectedPlatforms')}
                    />
                    {platform}
                  </label>
                ))}
              </div>

              {/* Businesses */}
              <p>What is your business?</p>
              <div className={styles.businessGroup}>
                {businesses.map((business, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={business}
                      checked={formData.selectedBusinesses.includes(business)}
                      onChange={(e) => handleCheckboxSelection(e, 'selectedBusinesses')}
                    />
                    {business}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Password and Confirm Password */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
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
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        {/* Submit Button */}
        <div className={styles.formGroup}>
          <button type="submit" className={styles.submitButton}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
