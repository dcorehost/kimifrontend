import React from 'react';
import style from "./Privacy.module.css";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';



const Privacy = () => {
  return (
    <div className={style.MainContainer}>
      <h1  className={style.headingtop}>Privacy Policy</h1>
      <p className={style.headingpara}>Last update on May 2024</p>

      <p className={style.paragraph}> 
          At AdMedia Agency we are committed to protecting the privacy and security of our users’ personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or use our services.        </p>

      <h2 className={style.heading}>
           Information We Collect
      </h2>
    
      <p className={style.paragraph}> 
         <span> <FaArrowRight /> </span>  Personal Information: When you visit our website or interact with our services, we may collect personal information such as your name, email address, phone number, and other contact details.
 
        </p> 

        <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span> Usage Information: We may also gather non-personal information about your interactions with our website, including IP address, browser type, operating system, and pages visited.   
          </p>
     <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span> Cookies: Like many websites, we use cookies and similar tracking technologies to enhance your browsing experience and gather information about usage patterns.
     </p>
     <h2 className={style.heading}>
          How We Use Your Information
      </h2>
      <p className={style.paragraph}> 
         <span> <FaArrowRight /> </span> To provide and improve our services, including customer support and technical assistance.   
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span> To personalize your experience and tailor our content, promotions, and advertisements to your interests.    
  
        </p>
        <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span> To communicate with you about updates, offers, and other relevant information.        
        </p>
        <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>    To analyze usage trends and optimize the performance of our website and services.     
        </p>
        <h2 className={style.heading}>
           Data Sharing and Disclosure
        </h2>
       <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>   We do not sell, trade, or rent your personal information to third parties for marketing purposes. 
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>    We may share your information with trusted service providers who assist us in operating our website or delivering services to you. 
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>     we may disclose your information if required by law or in response to legal process, to protect our rights, or to prevent fraud or imminent harm
      </p>
      <h2 className={style.heading}>
           Data Security
      </h2>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>  We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.   
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>  However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.   
      </p>
      
      <h2 className={style.heading}>
          Your Choices and Rights
      </h2>
      
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>    You have the right to access, update, or delete your personal information at any time.     
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>    You may opt-out of receiving promotional communications from us by following the unsubscribe instructions provided in our emails.
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>     You can configure your browser settings to reject cookies or notify you when cookies are being used.
      </p>
      <h2 className={style.heading}>
         Updates to This Policy
      </h2>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.   
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>   We will notify you of any material changes by posting the updated policy on our website. 
      </p>

      
      
      <h2 className={style.heading}>
           Contact Us
      </h2>
 
      <p className={style.paragraph}> 
          If you have any questions or concerns about our Privacy Policy or data practices, please contact us at email
           <Link to="mailto:info@admediaagency.online" className={style.cursor}>
                 info@admediaagency.online
           </Link>
      </p>   


    </div>
  );
};

export default Privacy;
