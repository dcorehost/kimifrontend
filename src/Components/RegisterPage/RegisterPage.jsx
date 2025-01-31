// // main code without api call 
// import React, { useState } from 'react';
// import styles from './RegisterPage.module.css'; 

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     contactMethod1: '',
//     contactMethod2: '',
//     areaCode1: '',
//     phoneNumber1: '',
//     cid1: '',
//     areaCode2: '',
//     phoneNumber2: '',
//     cid2: '',
//     password: '',
//     confirmPassword: '',
//     agencyAds: false,
//     globalCompanyRegistration: false,
//     dropShippingService: false,
//     selectedPlatforms: [],
//     selectedBusinesses: [],
//     selectedGlobalOptions: [],
//     selectedDropOptions: [],
//     monthlySpend: '',
//   });

//   const platforms = [
//     'Facebook',
//     'Google',
//     'Tiktok',
//     'Tiktok Shop ',
//     'Bing',
//     'Snapchat',
//     'Taboola',
//     'Mediago',
//     'Outbrain',
//     'Kwai',
//     'Others',
//   ];

//   const dropServices = [
//     'Purchase products from China mainland',
//     'Free warehouse',
//     'Shipping goods to global',
//     'Drop-shipping package one by one',
//     'others',
//   ];

//   const businesses = [
//     'Affiliate',
//     'E-Com(Clean)',
//     'E-Com(BH)',
//     'APP',
//     'Work At Home',
//     'Gambling/Casico/Gaming/Betting',
//     'Whatsapp/Telegram Channel',
//     'Others',
//   ];

//   const globalOptions = [
//     'HK Company',
//     'UK Company',
//     'USA Company',
//     'Singapore Company',
//     'others',
//   ];

//   const monthlySpendOptions = [
//     '0-2k',
//     '2k-20k',
//     '20k-200k',
//     '200k+',
//   ];


//   const handleAreaCodeChange = (e, contactMethod) => {
//     const { value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [`areaCode${contactMethod}`]: value,
//       [`phoneNumber${contactMethod}`]: `${value} ${prevState[`phoneNumber${contactMethod}`].replace(/^\+\d+\s?/, '')}`,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleCheckboxSelection = (e, field) => {
//     const { value, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [field]: checked
//         ? [...prevState[field], value]
//         : prevState[field].filter((item) => item !== value),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//     } else {
//       // Handle registration logic here
//       alert('Registration Successful');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Register</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/* Username and Email */}
//         <div className={styles.formGroup}>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Please enter username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Please enter email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>

//           {/* Country Selection */}
//           <div className={styles.formGroup}>
//           <label htmlFor="country">Country</label>
//           <select
//             id="country"
//             name="country" // New field for country selection
//             value={formData.country}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           >
//             <option value="">Select Country</option>
//             <option value="India">India</option>
//             <option value="US">United States</option>
//             <option value="UK">United Kingdom</option>
//             <option value="CA">Canada</option>
//             <option value="AU">Australia</option>
//             <option value="DE">Germany</option>
//             {/* Add more countries as needed */}
//           </select>
//         </div>

//         {/* Contact1 Method Dropdown */}
//         <div className={styles.formGroup}>
//           <label htmlFor="contactMethod1">Contact1</label>
//           <select
//             id="contactMethod1"
//             name="contactMethod1"
//             value={formData.contactMethod1}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           >
//             <option value="">Select Option</option>
//             <option value="whatsapp">WhatsApp</option>
//             <option value="skype">Skype</option>
//             <option value="telegram">Telegram</option>
//           </select>
//         </div>

//         {/* Show Area Code and Phone Number inputs when WhatsApp is selected for Contact1 */}
//         {formData.contactMethod1 === 'whatsapp' && (
//           <>
//             <div className={styles.formGroup}>
//               <label htmlFor="areaCode1">Choose Area Code</label>
//               <select
//                 id="areaCode1"
//                 name="areaCode1"
//                 value={formData.areaCode1}
//                 onChange={(e) => handleAreaCodeChange(e, 1)} // Handle Area Code for Contact1
//                 required
//                 className={styles.input}
//               >
//                 <option value="">Select Area Code</option>
//                 <option value="+1">+1 (USA)</option>
//                 <option value="+44">+44 (UK)</option>
//                 <option value="+91">+91 (India)</option>
//                 <option value="+61">+61 (Australia)</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="phoneNumber1">Phone Number</label>
//               <input
//                 type="text"
//                 id="phoneNumber1"
//                 name="phoneNumber1"
//                 placeholder="Enter your phone number"
//                 value={formData.phoneNumber1}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
//           </>
//         )}

//         {/* Show CID input when Skype is selected for Contact1 */}
//         {formData.contactMethod1 === 'skype' && (
//           <div className={styles.formGroup}>
//             <label htmlFor="cid1">Enter CID (Customer ID)</label>
//             <input
//               type="text"
//               id="cid1"
//               name="cid1"
//               placeholder="for example: live:.cid.123456"
//               value={formData.cid1}
//               onChange={handleChange}
//               required
//               className={styles.input}
//             />
//           </div>
//         )}

//         {/* Show Placeholder for Telegram in Contact1 */}
//         {formData.contactMethod1 === 'telegram' && (
//           <div className={styles.formGroup}>
//             <label htmlFor="phoneNumber1">Telegram Username</label>
//             <input
//               type="text"
//               id="phoneNumber1"
//               name="phoneNumber1"
//               placeholder="For example: @kimiagencyofficial"
//               value={formData.phoneNumber1}
//               onChange={handleChange}
//               required
//               className={styles.input}
//             />
//           </div>
//         )}

//         {/* Contact2 Method Dropdown */}
//         <div className={styles.formGroup}>
//           <label htmlFor="contactMethod2">Contact2</label>
//           <select
//             id="contactMethod2"
//             name="contactMethod2"
//             value={formData.contactMethod2}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           >
//             <option value="">Select Option</option>

//             {/* Conditionally render options for Contact2 based on Contact1 */}
//             {formData.contactMethod1 === 'whatsapp' && (
//               <>
//                 <option value="skype">Skype</option>
//                 <option value="telegram">Telegram</option>
//               </>
//             )}
//             {formData.contactMethod1 === 'skype' && (
//               <>
//                 <option value="whatsapp">WhatsApp</option>
//                 <option value="telegram">Telegram</option>
//               </>
//             )}
//             {formData.contactMethod1 === 'telegram' && (
//               <>
//                 <option value="whatsapp">WhatsApp</option>
//                 <option value="skype">Skype</option>
//               </>
//             )}
//           </select>
//         </div>

//         {/* Show Area Code and Phone Number inputs when WhatsApp is selected for Contact2 */}
//         {formData.contactMethod2 === 'whatsapp' && (
//           <>
//             <div className={styles.formGroup}>
//               <label htmlFor="areaCode2">Choose Area Code</label>
//               <select
//                 id="areaCode2"
//                 name="areaCode2"
//                 value={formData.areaCode2}
//                 onChange={(e) => handleAreaCodeChange(e, 2)} // Handle Area Code for Contact2
//                 required
//                 className={styles.input}
//               >
//                 <option value="">Select Area Code</option>
//                 <option value="+1">+1 (USA)</option>
//                 <option value="+44">+44 (UK)</option>
//                 <option value="+91">+91 (India)</option>
//                 <option value="+61">+61 (Australia)</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="phoneNumber2">Phone Number</label>
//               <input
//                 type="text"
//                 id="phoneNumber2"
//                 name="phoneNumber2"
//                 placeholder="Enter your phone number"
//                 value={formData.phoneNumber2}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
//           </>
//         )}

//         {/* Show CID input when Skype is selected for Contact2 */}
//         {formData.contactMethod2 === 'skype' && (
//           <div className={styles.formGroup}>
//             <label htmlFor="cid2">Enter CID (Customer ID)</label>
//             <input
//               type="text"
//               id="cid2"
//               name="cid2"
//               placeholder="for example: live:.cid.123456"
//               value={formData.cid2}
//               onChange={handleChange}
//               required
//               className={styles.input}
//             />
//           </div>
//         )}

//         {/* Show Placeholder for Telegram in Contact2 */}
//         {formData.contactMethod2 === 'telegram' && (
//           <div className={styles.formGroup}>
//             <label htmlFor="phoneNumber2">Telegram Username</label>
//             <input
//               type="text"
//               id="phoneNumber2"
//               name="phoneNumber2"
//               placeholder="For example: @kimiagencyofficial"
//               value={formData.phoneNumber2}
//               onChange={handleChange}
//               required
//               className={styles.input}
//             />
//           </div>
//         )}
//         {/* Services Checkboxes */}
//         <div className={styles.formGroup}>
//           <label>interested(Multiple Choice)</label>
//           <div className={styles.checkboxGroupColumn}>
//             {/* Agency Ads */}
//             <label>
//               <input
//                 type="checkbox"
//                 name="agencyAds"
//                 checked={formData.agencyAds}
//                 onChange={handleChange}
//               />
//               Agency Ads
//             </label>

//             {formData.agencyAds && (
//               <>
//                 {/* Platforms */}
//                 <p>Which platforms?</p>
//                 <div className={styles.platformsGroup}>
//                   {platforms.map((platform, index) => (
//                     <label key={index}>
//                       <input
//                         type="checkbox"
//                         value={platform}
//                         checked={formData.selectedPlatforms.includes(platform)}
//                         onChange={(e) =>
//                           handleCheckboxSelection(e, 'selectedPlatforms')
//                         }
//                       />
//                       {platform}
//                     </label>
//                   ))}
//                 </div>

//                 {/* Businesses */}
//                 <p>What is your business?</p>
//                 <div className={styles.businessGroup}>
//                   {businesses.map((business, index) => (
//                     <label key={index}>
//                       <input
//                         type="checkbox"
//                         value={business}
//                         checked={formData.selectedBusinesses.includes(business)}
//                         onChange={(e) =>
//                           handleCheckboxSelection(e, 'selectedBusinesses')
//                         }
//                       />
//                       {business}
//                     </label>
//                   ))}
//                 </div>

//                 {/* Monthly Spend */}
//                 <p>Monthly Spend (USD):</p>
//                 <div className={styles.radioGroup}>
//                   {monthlySpendOptions.map((option, index) => (
//                     <label key={index}>
//                       <input
//                         type="radio"
//                         name="monthlySpend"
//                         value={option}
//                         checked={formData.monthlySpend === option}
//                         onChange={handleChange}
//                       />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* Global Company Registration */}
//             <label>
//               <input
//                 type="checkbox"
//                 name="globalCompanyRegistration"
//                 checked={formData.globalCompanyRegistration}
//                 onChange={handleChange}
//               />
//               Global Company Registration
//             </label>

//             {formData.globalCompanyRegistration && (
//               <div className={styles.platformsGroup}>
//                 {globalOptions.map((option, index) => (
//                   <label key={index}>
//                     <input
//                       type="checkbox"
//                       value={option}
//                       checked={formData.selectedGlobalOptions.includes(option)}
//                       onChange={(e) =>
//                         handleCheckboxSelection(e, 'selectedGlobalOptions')
//                       }
//                     />
//                     {option}
//                   </label>
//                 ))}
//               </div>
//             )}

//             {/* Drop Shipping Service */}
//             <label>
//               <input
//                 type="checkbox"
//                 name="dropShippingService"
//                 checked={formData.dropShippingService}
//                 onChange={handleChange}
//               />
//               Drop-Shipping Service & COD fulfillment services
//             </label>

//             {formData.dropShippingService && (
//               <div className={styles.platformsGroup2}>
//                 {dropServices.map((service, index) => (
//                   <label key={index}>
//                     <input
//                       type="checkbox"
//                       value={service}
//                       checked={formData.selectedDropOptions.includes(service)}
//                       onChange={(e) =>
//                         handleCheckboxSelection(e, 'selectedDropOptions')
//                       }
//                     />
//                     {service}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Password and Confirm Password */}
//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Please enter password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className={styles.input}t
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder="Please enter confirm password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>

//         <button type="submit" className={styles.submitButton}>
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;

// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './RegisterPage.module.css'; 

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     contactMethod1: '',
//     contactMethod2: '',
//     areaCode1: '',
//     phoneNumber1: '',
//     cid1: '',
//     areaCode2: '',
//     phoneNumber2: '',
//     cid2: '',
//     password: '',
//     confirmPassword: '',
//     agencyAds: false,
//     globalCompanyRegistration: false,
//     dropShippingService: false,
//     selectedPlatforms: [],
//     selectedBusinesses: [],
//     selectedGlobalOptions: [],
//     selectedDropOptions: [],
//     monthlySpend: '',
//     country: '',
//   });

//   const platforms = [
//     'Facebook',
//     'Google',
//     'Tiktok',
//     'Tiktok Shop ',
//     'Bing',
//     'Snapchat',
//     'Taboola',
//     'Mediago',
//     'Outbrain',
//     'Kwai',
//     'Others',
//   ];

//   const dropServices = [
//     'Purchase products from China mainland',
//     'Free warehouse',
//     'Shipping goods to global',
//     'Drop-shipping package one by one',
//     'others',
//   ];

//   const businesses = [
//     'Affiliate',
//     'E-Com(Clean)',
//     'E-Com(BH)',
//     'APP',
//     'Work At Home',
//     'Gambling/Casico/Gaming/Betting',
//     'Whatsapp/Telegram Channel',
//     'Others',
//   ];

//   const globalOptions = [
//     'HK Company',
//     'UK Company',
//     'USA Company',
//     'Singapore Company',
//     'others',
//   ];

//   const monthlySpendOptions = [
//     '0-2k',
//     '2k-20k',
//     '20k-200k',
//     '200k+',
//   ];

//   const handleAreaCodeChange = (e, contactMethod) => {
//     const { value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [`areaCode${contactMethod}`]: value,
//       [`phoneNumber${contactMethod}`]: `${value} ${prevState[`phoneNumber${contactMethod}`].replace(/^\+\d+\s?/, '')}`,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleCheckboxSelection = (e, field) => {
//     const { value, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [field]: checked
//         ? [...prevState[field], value]
//         : prevState[field].filter((item) => item !== value),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//     } else {
//       // Prepare the data based on the formData
//       const requestData = {
//         username: formData.username,
//         emailId: formData.email,
//         country: formData.country,
//         contact1: formData.phoneNumber1,
//         contact2: formData.phoneNumber2,
//         interestedIn: [...formData.selectedPlatforms, ...formData.selectedBusinesses], // Combination of selected values
//         password: formData.password,
//         confirmPassword: formData.confirmPassword,
//         pincode: formData.areaCode1, // This can be adjusted according to requirements
//         agencyAds: {
//           platform: formData.selectedPlatforms,
//           business: formData.selectedBusinesses,
//           monthlySpend: formData.monthlySpend,
//         },
//         globalCompanyRegistration: formData.selectedGlobalOptions,
//         dropShippingServices: formData.selectedDropOptions,
//       };

//       try {
//         const response = await axios.post('http://admediaagency.online/kimi/create-account', requestData);
//         if (response.data.message) {
//           alert(response.data.message); // Success message from API
//           console.log(response.data.newUser); // Log or handle the response as needed
//         }
//       } catch (error) {
//         alert('There was an error creating the account.');
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Register</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/* Username and Email */}
//         <div className={styles.formGroup}>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             placeholder="Please enter username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Please enter email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>

//         {/* Country Selection */}
//         <div className={styles.formGroup}>
//           <label htmlFor="country">Country</label>
//           <select
//             id="country"
//             name="country" // New field for country selection
//             value={formData.country}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           >
//             <option value="">Select Country</option>
//             <option value="India">India</option>
//             <option value="US">United States</option>
//             <option value="UK">United Kingdom</option>
//             <option value="CA">Canada</option>
//             <option value="AU">Australia</option>
//             <option value="DE">Germany</option>
//           </select>
//         </div>

//         {/* Contact1 Method Dropdown */}
//         <div className={styles.formGroup}>
//           <label htmlFor="contactMethod1">Contact1</label>
//           <select
//             id="contactMethod1"
//             name="contactMethod1"
//             value={formData.contactMethod1}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           >
//             <option value="">Select Option</option>
//             <option value="whatsapp">WhatsApp</option>
//             <option value="skype">Skype</option>
//             <option value="telegram">Telegram</option>
//           </select>
//         </div>

//         {/* Show Area Code and Phone Number inputs when WhatsApp is selected for Contact1 */}
//         {formData.contactMethod1 === 'whatsapp' && (
//           <>
//             <div className={styles.formGroup}>
//               <label htmlFor="areaCode1">Choose Area Code</label>
//               <select
//                 id="areaCode1"
//                 name="areaCode1"
//                 value={formData.areaCode1}
//                 onChange={(e) => handleAreaCodeChange(e, 1)} // Handle Area Code for Contact1
//                 required
//                 className={styles.input}
//               >
//                 <option value="">Select Area Code</option>
//                 <option value="+1">+1 (USA)</option>
//                 <option value="+44">+44 (UK)</option>
//                 <option value="+91">+91 (India)</option>
//                 <option value="+61">+61 (Australia)</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="phoneNumber1">Phone Number</label>
//               <input
//                 type="text"
//                 id="phoneNumber1"
//                 name="phoneNumber1"
//                 placeholder="Enter your phone number"
//                 value={formData.phoneNumber1}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
//           </>
//         )}

//         {/* Contact2 Method Dropdown */}
//         <div className={styles.formGroup}>
//           <label htmlFor="contactMethod2">Contact2</label>
//           <select
//             id="contactMethod2"
//             name="contactMethod2"
//             value={formData.contactMethod2}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           >
//             <option value="">Select Option</option>
//             <option value="whatsapp">WhatsApp</option>
//             <option value="skype">Skype</option>
//             <option value="telegram">Telegram</option>
//           </select>
//         </div>

//         {/* Show Area Code and Phone Number inputs when WhatsApp is selected for Contact2 */}
//         {formData.contactMethod2 === 'whatsapp' && (
//           <>
//             <div className={styles.formGroup}>
//               <label htmlFor="areaCode2">Choose Area Code</label>
//               <select
//                 id="areaCode2"
//                 name="areaCode2"
//                 value={formData.areaCode2}
//                 onChange={(e) => handleAreaCodeChange(e, 2)} // Handle Area Code for Contact2
//                 required
//                 className={styles.input}
//               >
//                 <option value="">Select Area Code</option>
//                 <option value="+1">+1 (USA)</option>
//                 <option value="+44">+44 (UK)</option>
//                 <option value="+91">+91 (India)</option>
//                 <option value="+61">+61 (Australia)</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="phoneNumber2">Phone Number</label>
//               <input
//                 type="text"
//                 id="phoneNumber2"
//                 name="phoneNumber2"
//                 placeholder="Enter your phone number"
//                 value={formData.phoneNumber2}
//                 onChange={handleChange}
//                 required
//                 className={styles.input}
//               />
//             </div>
//           </>
//         )}

//         {/* Services Checkboxes */}
//         <div className={styles.formGroup}>
//           <label>Interested (Multiple Choice)</label>
//           <div className={styles.checkboxGroupColumn}>
//             {/* Agency Ads */}
//             <label>
//               <input
//                 type="checkbox"
//                 name="agencyAds"
//                 checked={formData.agencyAds}
//                 onChange={handleChange}
//               />
//               Agency Ads
//             </label>

//             {formData.agencyAds && (
//               <>
//                 {/* Platforms */}
//                 <p>Which platforms?</p>
//                 <div className={styles.platformsGroup}>
//                   {platforms.map((platform, index) => (
//                     <label key={index}>
//                       <input
//                         type="checkbox"
//                         value={platform}
//                         checked={formData.selectedPlatforms.includes(platform)}
//                         onChange={(e) =>
//                           handleCheckboxSelection(e, 'selectedPlatforms')
//                         }
//                       />
//                       {platform}
//                     </label>
//                   ))}
//                 </div>

//                 {/* Businesses */}
//                 <p>What is your business?</p>
//                 <div className={styles.businessGroup}>
//                   {businesses.map((business, index) => (
//                     <label key={index}>
//                       <input
//                         type="checkbox"
//                         value={business}
//                         checked={formData.selectedBusinesses.includes(business)}
//                         onChange={(e) =>
//                           handleCheckboxSelection(e, 'selectedBusinesses')
//                         }
//                       />
//                       {business}
//                     </label>
//                   ))}
//                 </div>

//                 {/* Monthly Spend */}
//                 <p>Monthly Spend (USD):</p>
//                 <div className={styles.radioGroup}>
//                   {monthlySpendOptions.map((option, index) => (
//                     <label key={index}>
//                       <input
//                         type="radio"
//                         name="monthlySpend"
//                         value={option}
//                         checked={formData.monthlySpend === option}
//                         onChange={handleChange}
//                       />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* Global Company Registration */}
//             <label>
//               <input
//                 type="checkbox"
//                 name="globalCompanyRegistration"
//                 checked={formData.globalCompanyRegistration}
//                 onChange={handleChange}
//               />
//               Global Company Registration
//             </label>

//             {formData.globalCompanyRegistration && (
//               <div className={styles.platformsGroup}>
//                 {globalOptions.map((option, index) => (
//                   <label key={index}>
//                     <input
//                       type="checkbox"
//                       value={option}
//                       checked={formData.selectedGlobalOptions.includes(option)}
//                       onChange={(e) =>
//                         handleCheckboxSelection(e, 'selectedGlobalOptions')
//                       }
//                     />
//                     {option}
//                   </label>
//                 ))}
//               </div>
//             )}

//             {/* Drop Shipping Service */}
//             <label>
//               <input
//                 type="checkbox"
//                 name="dropShippingService"
//                 checked={formData.dropShippingService}
//                 onChange={handleChange}
//               />
//               Drop Shipping Service
//             </label>

//             {formData.dropShippingService && (
//               <div className={styles.platformsGroup}>
//                 {dropServices.map((service, index) => (
//                   <label key={index}>
//                     <input
//                       type="checkbox"
//                       value={service}
//                       checked={formData.selectedDropOptions.includes(service)}
//                       onChange={(e) =>
//                         handleCheckboxSelection(e, 'selectedDropOptions')
//                       }
//                     />
//                     {service}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Password and Confirm Password */}
//         <div className={styles.formGroup}>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Please enter password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             placeholder="Confirm password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//         </div>

//         {/* Submit */}
//         <div className={styles.submitContainer}>
//           <button type="submit" className={styles.submitButton}>
//             Create Account
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;


import React, { useState } from 'react';
import axios from 'axios';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactMethod1: '',
    contactMethod2: '',
    areaCode1: '',
    phoneNumber1: '',
    areaCode2: '',
    phoneNumber2: '',
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
    country: '',
  });

  const token = localStorage.getItem("userToken");

  const platforms = [
    'Facebook',
    'Google',
    'Tiktok',
    'Tiktok Shop',
    'Bing',
    'Snapchat',
    'Taboola',
    'Mediago',
    'Outbrain',
    'Kwai',
    'Others',
  ];

  const dropServices = [
    'Purchase products from China mainland',
    'Free warehouse',
    'Shipping goods to global',
    'Drop-shipping package one by one',
    'others',
  ];

  const businesses = [
    'Affiliate',
    'E-Com(Clean)',
    'E-Com(BH)',
    'APP',
    'Work At Home',
    'Gambling/Casico/Gaming/Betting',
    'Whatsapp/Telegram Channel',
    'Others',
  ];

  const globalOptions = [
    'HK Company',
    'UK Company',
    'USA Company',
    'Singapore Company',
    'others',
  ];

  const monthlySpendOptions = [
    '0-2k',
    '2k-20k',
    '20k-200k',
    '200k+',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // console.log("formData", formData);
    // Prepare the data based on the formData

    const interestedIn = [];

    // Check if each field exists in formData and is selected (true)
    if (formData?.selectedPlatforms.length > 0 || formData?.selectedBusinesses.length > 0 || formData?.monthlySpend) {
      interestedIn.push("Agency Ads");
    }

    if (formData?.selectedGlobalOptions?.length>0) {
      interestedIn.push("Global Company Registration");
    }

    if (formData?.selectedDropOptions?.length>0) {
      interestedIn.push("Drop Shipping Service");
    }


    const requestData = {
      username: formData.username,
      emailId: formData.email,
      country: formData.country,
      contact1: formData.phoneNumber1,
      contact2: formData.phoneNumber2,
      interestedIn, // Combination of selected values
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      pincode: formData.areaCode1, // This can be adjusted according to requirements
      agencyAds: {
        platform: formData?.selectedPlatforms || [],
        business: formData?.selectedBusinesses || [],
        monthlySpend: formData?.monthlySpend || "",
      },
      globalCompanyRegistration: formData?.selectedGlobalOptions || [],
      dropShippingServices: formData?.selectedDropOptions || [],
    };

    try {
      const response = await axios.post('http://admediaagency.online/kimi/create-account', requestData, {
        headers: {
          'Content-Type': 'application/json', // Ensure the request is sent with the correct header
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message) {
        alert(response.data.message); // Success message from API
        console.log(response.data.newUser); // Log or handle the response as needed
      }
    } catch (error) {
      alert('There was an error creating the account.');

      // Log more detailed error information for debugging
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
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
            <option value="whatsapp">WhatsApp</option>
            <option value="skype">Skype</option>
            <option value="telegram">Telegram</option>
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

        {/* Services Checkboxes */}
        <div className={styles.formGroup}>
          <label>Interested (Multiple Choice)</label>
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
              Drop Shipping Service
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










