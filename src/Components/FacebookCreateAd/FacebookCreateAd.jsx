import React, { useState } from "react";
import styles from "./FacebookCreateAd.module.css";

const FacebookCreateAd = () => {
  const [pageNum, setPageNum] = useState(2);
  const [urls, setUrls] = useState(["", ""]);
  const [adType, setAdType] = useState("domain"); // Ad Type (Domain or App)
  const [unlimitedDomain, setUnlimitedDomain] = useState(""); // Need Unlimited Domain (Yes/No)
  const [addNumber, setAddNumber] = useState(1); // Add Number (1 or 2)
  const [domains, setDomains] = useState([""]); // Domains (Array for input fields)
  const [appUrl, setAppUrl] = useState(""); // App URL
  const [appId, setAppId] = useState(""); // App ID

  const [licenseType, setLicenseType] = useState(""); // Track selected license type
  const [licenseInput, setLicenseInput] = useState(""); // Track input for new/old license

  // New states for additional radio buttons
  const [newRadio1, setNewRadio1] = useState(""); // First new radio button
  const [newRadio2, setNewRadio2] = useState(""); // Second new radio button
  
  const handlePageNumChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setPageNum(num);
    setUrls(Array(num).fill(""));
  };

  const handleAddNumberChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setAddNumber(num);

    // Update domains array with empty strings for the new number of domains
    setDomains(Array(num).fill(""));
  };

  const handleDomainChange = (e, index) => {
    const newDomains = [...domains];
    newDomains[index] = e.target.value;
    setDomains(newDomains);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleLicenseChange = (e) => {
    setLicenseType(e.target.value);
    setLicenseInput(""); // Reset input when switching license type
  };

  return (
    <div className={styles.container}>
        <div className={styles.labelWithBorder1}>
      <div className={styles.field}>
         
        <label className={styles.label}>
          <span>*</span> The License name:
        </label>
        <select
          className={styles.select2}
          value={licenseType}
          onChange={handleLicenseChange}
        >
          <option value="">Select license mode</option>
          <option value="new">New license</option>
          <option value="old">Old license</option>
        </select>
      </div>
       {/* Conditionally render input for new/old license */}
       {licenseType && (
        <div className={styles.licenseInputContainer}>
          <label className={styles.label}>
            {/* <span>*</span> License Details: */}
          </label>
          <input
            type="text"
            className={styles.input2}
            value={licenseInput}
            onChange={(e) => setLicenseInput(e.target.value)}
            placeholder={
              licenseType === "new"
                ? "Please enter license"
                : "Please select license name"
            }
          />
        </div>
      )}
      </div>
    {/*----------------------*/}
      <div className={styles.labelWithBorder}>
      <div className={styles.field}>
        <label className={styles.label}>
          <span>*</span> Page Num:
        </label>
        <input
          type="number"
          min="1"
          value={pageNum}
          className={styles.input}
          onChange={handlePageNumChange}
        />
      </div>

      {urls.map((url, index) => (
        <div key={index} className={styles.field}>
          <label className={styles.label}>
            <span>*</span> {index + 1}. Page URL:
          </label>
          <input
            type="text"
            placeholder="Please enter Page URL"
            className={styles.input}
            value={url}
            onChange={(e) =>
              setUrls(urls.map((u, i) => (i === index ? e.target.value : u)))
            }
          />
        </div>
      ))}

      <div className={styles.note}>
        <input type="checkbox" />
        <span>
          Please make sure you have already shared your page with this profile:
        </span>
        <div className={styles.linkContainer}>
          <a
            href="https://www.facebook.com/profile.php?id=61565914434685"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            https://www.facebook.com/profile.php?id=61565914434685
          </a>
          <button
            className={styles.copyButton}
            onClick={() =>
              copyToClipboard("https://www.facebook.com/profile.php?id=61565914434685")
            }
          >
            Copy
          </button>
        </div>
      </div>
</div>
<div className={styles.labelWithBorder}>
      {/* Radio Buttons Section */}
      <div className={styles.radioGroup}>
        <label className={styles.label}>
          <span>*</span> Ad Type:
        </label>
        <div>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="adType"
              value="domain"
              checked={adType === "domain"}
              onChange={() => setAdType("domain")}
            />
            Domain (Website)
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="adType"
              value="app"
              checked={adType === "app"}
              onChange={() => setAdType("app")}
            />
            App
          </label>
        </div>
      </div>

     
     

      {/* Section for Domain */}
      {adType === "domain" && (
        <>
          <div className={styles.radioGroup}>
            <label className={styles.label}>
              <span>*</span> Need Unlimited Domain:
            </label>
            <div>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="unlimitedDomain"
                  value="yes"
                  checked={unlimitedDomain === "yes"}
                  onChange={() => setUnlimitedDomain("yes")}
                />
                Yes
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="unlimitedDomain"
                  value="no"
                  checked={unlimitedDomain === "no"}
                  onChange={() => setUnlimitedDomain("no")}
                />
                No
              </label>
            </div>
          </div>

          {/* If "No" for Unlimited Domain is selected */}
          {unlimitedDomain === "no" && (
            <>
              <div className={styles.field}>
                <label className={styles.label}>
                  <span>*</span> Add Number:
                </label>
                <select
                  className={styles.select}
                  value={addNumber}
                  onChange={handleAddNumberChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              {/* Render domain inputs based on Add Number */}
              {Array.from({ length: addNumber }).map((_, index) => (
                <div key={index} className={styles.field}>
                  <label className={styles.label}>
                    <span>*</span> Domain {index + 1}:
                  </label>
                  <input
                    type="text"
                    placeholder="Please enter Domain"
                    className={styles.input}
                    value={domains[index]}
                    onChange={(e) => handleDomainChange(e, index)}
                  />
                </div>
              ))}
            </>
          )}
        </>
      )}

      {/* Section for App */}
      {adType === "app" && (
        <>
          <div className={styles.field}>
            <label className={styles.label}>
              <span>*</span> App URL:
            </label>
            <input
              type="text"
              placeholder="Please enter App URL"
              className={styles.input}
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <span>*</span> App ID:
            </label>
            <input
              type="text"
              placeholder="Please enter App ID"
              className={styles.input}
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
            />
          </div>
        </>
      )}
   </div>
   <div className={styles.labelWithBorder}>
     {/* New Radio Buttons Section */}
     <div className={styles.radioGroup}>
        <label className={styles.label}>
         
        </label>
        <div>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="newRadio1"
              value="option1"
              checked={newRadio1 === "option1"}
              onChange={() => setNewRadio1("option1")}
            />
            become monthly vip
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="newRadio1"
              value="option2"
              checked={newRadio1 === "option2"}
              onChange={() => setNewRadio1("option2")}
            />
            pay ads one by one 
          </label>
        </div>
      </div>
    

      {/* <div className={styles.field}>
        <label className={styles.label}>
          <span>*</span> The License name:
        </label>
        <select className={styles.select}>
          <option value="">Select license mode</option>
          <option value="mode1">Mode 1</option>
          <option value="mode2">Mode 2</option>
        </select>
      </div> */}

      <div className={styles.field}>
        <label className={styles.label}>
          <span>*</span> Ad Num:
        </label>
        <input
          type="number"
          min="1"
          value={pageNum}
          className={styles.input}
          onChange={handlePageNumChange}
        />
      </div>

      {urls.map((url, index) => (
  <div key={index} className={styles.field}>
    <label className={styles.label}>
      <span>*</span> {index + 1}. ads account name
    </label>
    <input
      type="text"
      placeholder="Please enter ads account name"
      className={styles.input}
      value={url.accountName}
      onChange={(e) =>
        setUrls(urls.map((u, i) => (i === index ? { ...u, accountName: e.target.value } : u)))
      }
    />

<label className={styles.label}>
      <span>*</span> {index + 1}. deposit
    </label>
    <input
      type="text"
      placeholder="Deposit"
      className={styles.input}
      value={url.deposit}
      onChange={(e) =>
        setUrls(urls.map((u, i) => (i === index ? { ...u, deposit: e.target.value } : u)))
      }
    />
  </div>
      ))}
 </div>
              {/* New Text Area Section */}
      
        <div id={styles.label}>
        <label >
          <span>*</span>  if you have special requirement ,please fill remark here:
        </label>
        </div>
        <div>
       
        <textarea
          placeholder=""
          className={styles.textarea}
        />
         </div>
       
 </div>
   
  );
};

export default FacebookCreateAd;
