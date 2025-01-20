import React, { useState } from 'react';
import styles from './RegisterPage.module.css'; // Import the CSS Module

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactMethod1: '',
    contactMethod2: '',
    areaCode1: '',
    phoneNumber1: '',
    cid1: '',
    areaCode2: '',
    phoneNumber2: '',
    cid2: '',
    password: '',
    confirmPassword: '',
    agencyAds: false,
    globalCompanyRegistration: false,
    dropShippingService: false,
    selectedPlatforms: [],
    selectedBusinesses: [],
    selectedGlobalOptions: [],
    selectedDropOptions: [],
    monthlySpend: '',
  });

  const platforms = [
    'Google Ads',
    'Facebook Ads',
    'Instagram Ads',
    'LinkedIn Ads',
    'Twitter Ads',
    'Snapchat Ads',
    'Pinterest Ads',
    'TikTok Ads',
    'YouTube Ads',
    'Reddit Ads',
    'Bing Ads',
    'Amazon Ads',
    'Spotify Ads',
    'Others',
  ];

  const dropServices = [
    'Order Fulfillment',
    'Warehouse Management',
    'Inventory Tracking',
    'Shipping Logistics',
    'Return Management',
  ];

  const businesses = [
    'E-commerce',
    'Retail',
    'Real Estate',
    'Healthcare',
    'Education',
    'Hospitality',
    'Finance',
    'Others',
  ];

  const globalOptions = [
    'Company Formation',
    'Tax Registration',
    'Bank Account Setup',
    'Compliance Services',
    'others',
  ];

  const monthlySpendOptions = [
    '< $1000',
    '$1000 - $5000',
    '$5000 - $10,000',
    '> $10,000',
  ];


  const handleAreaCodeChange = (e, contactMethod) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [`areaCode${contactMethod}`]: value,
      [`phoneNumber${contactMethod}`]: `${value} ${prevState[`phoneNumber${contactMethod}`].replace(/^\+\d+\s?/, '')}`,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
    } else {
      // Handle registration logic here
      alert('Registration Successful');
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

          {/* Country Selection */}
          <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country" // New field for country selection
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
            {/* Add more countries as needed */}
          </select>
        </div>

        {/* Contact1 Method Dropdown */}
        <div className={styles.formGroup}>
          <label htmlFor="contactMethod1">Contact1</label>
          <select
            id="contactMethod1"
            name="contactMethod1"
            value={formData.contactMethod1}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="">Select Option</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="skype">Skype</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>

        {/* Show Area Code and Phone Number inputs when WhatsApp is selected for Contact1 */}
        {formData.contactMethod1 === 'whatsapp' && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="areaCode1">Choose Area Code</label>
              <select
                id="areaCode1"
                name="areaCode1"
                value={formData.areaCode1}
                onChange={(e) => handleAreaCodeChange(e, 1)} // Handle Area Code for Contact1
                required
                className={styles.input}
              >
                <option value="">Select Area Code</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+61">+61 (Australia)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber1">Phone Number</label>
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

        {/* Show CID input when Skype is selected for Contact1 */}
        {formData.contactMethod1 === 'skype' && (
          <div className={styles.formGroup}>
            <label htmlFor="cid1">Enter CID (Customer ID)</label>
            <input
              type="text"
              id="cid1"
              name="cid1"
              placeholder="for example: live:.cid.123456"
              value={formData.cid1}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        )}

        {/* Show Placeholder for Telegram in Contact1 */}
        {formData.contactMethod1 === 'telegram' && (
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber1">Telegram Username</label>
            <input
              type="text"
              id="phoneNumber1"
              name="phoneNumber1"
              placeholder="For example: @kimiagencyofficial"
              value={formData.phoneNumber1}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        )}

        {/* Contact2 Method Dropdown */}
        <div className={styles.formGroup}>
          <label htmlFor="contactMethod2">Contact2</label>
          <select
            id="contactMethod2"
            name="contactMethod2"
            value={formData.contactMethod2}
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="">Select Option</option>

            {/* Conditionally render options for Contact2 based on Contact1 */}
            {formData.contactMethod1 === 'whatsapp' && (
              <>
                <option value="skype">Skype</option>
                <option value="telegram">Telegram</option>
              </>
            )}
            {formData.contactMethod1 === 'skype' && (
              <>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
              </>
            )}
            {formData.contactMethod1 === 'telegram' && (
              <>
                <option value="whatsapp">WhatsApp</option>
                <option value="skype">Skype</option>
              </>
            )}
          </select>
        </div>

        {/* Show Area Code and Phone Number inputs when WhatsApp is selected for Contact2 */}
        {formData.contactMethod2 === 'whatsapp' && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="areaCode2">Choose Area Code</label>
              <select
                id="areaCode2"
                name="areaCode2"
                value={formData.areaCode2}
                onChange={(e) => handleAreaCodeChange(e, 2)} // Handle Area Code for Contact2
                required
                className={styles.input}
              >
                <option value="">Select Area Code</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+61">+61 (Australia)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phoneNumber2">Phone Number</label>
              <input
                type="text"
                id="phoneNumber2"
                name="phoneNumber2"
                placeholder="Enter your phone number"
                value={formData.phoneNumber2}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </>
        )}

        {/* Show CID input when Skype is selected for Contact2 */}
        {formData.contactMethod2 === 'skype' && (
          <div className={styles.formGroup}>
            <label htmlFor="cid2">Enter CID (Customer ID)</label>
            <input
              type="text"
              id="cid2"
              name="cid2"
              placeholder="for example: live:.cid.123456"
              value={formData.cid2}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        )}

        {/* Show Placeholder for Telegram in Contact2 */}
        {formData.contactMethod2 === 'telegram' && (
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber2">Telegram Username</label>
            <input
              type="text"
              id="phoneNumber2"
              name="phoneNumber2"
              placeholder="For example: @kimiagencyofficial"
              value={formData.phoneNumber2}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        )}
        {/* Services Checkboxes */}
        <div className={styles.formGroup}>
          <label>Services:</label>
          <div className={styles.checkboxGroupColumn}>
            {/* Agency Ads */}
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
                        onChange={(e) =>
                          handleCheckboxSelection(e, 'selectedPlatforms')
                        }
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
                        onChange={(e) =>
                          handleCheckboxSelection(e, 'selectedBusinesses')
                        }
                      />
                      {business}
                    </label>
                  ))}
                </div>

                {/* Monthly Spend */}
                <p>Monthly Spend (USD):</p>
                <div className={styles.radioGroup}>
                  {monthlySpendOptions.map((option, index) => (
                    <label key={index}>
                      <input
                        type="radio"
                        name="monthlySpend"
                        value={option}
                        checked={formData.monthlySpend === option}
                        onChange={handleChange}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Global Company Registration */}
            <label>
              <input
                type="checkbox"
                name="globalCompanyRegistration"
                checked={formData.globalCompanyRegistration}
                onChange={handleChange}
              />
              Global Company Registration
            </label>

            {formData.globalCompanyRegistration && (
              <div className={styles.platformsGroup}>
                {globalOptions.map((option, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.selectedGlobalOptions.includes(option)}
                      onChange={(e) =>
                        handleCheckboxSelection(e, 'selectedGlobalOptions')
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}

            {/* Drop Shipping Service */}
            <label>
              <input
                type="checkbox"
                name="dropShippingService"
                checked={formData.dropShippingService}
                onChange={handleChange}
              />
              Drop-Shipping Service & COD fulfillment services
            </label>

            {formData.dropShippingService && (
              <div className={styles.platformsGroup}>
                {dropServices.map((service, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={service}
                      checked={formData.selectedDropOptions.includes(service)}
                      onChange={(e) =>
                        handleCheckboxSelection(e, 'selectedDropOptions')
                      }
                    />
                    {service}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Password and Confirm Password */}
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
