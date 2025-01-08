import React from 'react';
import style from "./RefundPolicy.module.css";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';



const RefundPolicy = () => {
  return (
    <div className={style.MainContainer}>
      <h1  className={style.headingtop}>Refund Policy</h1>
      <p className={style.headingpara}>Last update on May 2024</p>

      <p className={style.paragraph}> 
         At KIMI AGENCY we try our best to provide exceptional service and satisfaction to all our clients. However, we understand that due to violations, a refund is necessary. Please review our refund policy below:       </p>

      <h2 className={style.heading}>
          Eligibility for Refund
      </h2>
    
      <p className={style.paragraph}> 
         <span> <FaArrowRight /> </span> Refunds are eligible after you transfer money to us.
 
        </p> 

        <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span> Refunds will only be considered for services that have not been completed.
        </p>
     
     <h2 className={style.heading}>
            How to Request a Refund
     </h2>
      <p className={style.paragraph}> 
         <span> <FaArrowRight /> </span> 
         To request a refund, please contact our customer support team at support group or email to us at<Link to="mailto:info@kimiagency.com" className={style.cursor}>
                 info@kimiagency.com
           </Link>,team will provide your order details.  
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span> Remaining money in ad accounts with deposit fee can be refunded to system wallet if you don't need ad accounts any more within 7 business days.    
  
        </p>
        <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span> Stop cooperation and withdraw wallet money are eligible within 28 days after you put forward.        
        </p>
        
        <h2 className={style.heading}>
           Refund Process
        </h2>
       <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>  Once your refund request is approved, refunds will be issued using the original payment method you used. 
      </p>
      <p className={style.paragraph}> 
          <span> <FaArrowRight /> </span>   Please allow 7 business days for the refund to be reflected in your account. 
      </p>
     
      <h2 className={style.heading}>
         Non-Refundable Items
      </h2>
      <p className={style.paragraph}> 
         Account opening fee, penalty (if applicable).
      </p>     
      
      <h2 className={style.heading}>
         Exceptions
      </h2>
      
      <p className={style.paragraph}> 
            In exceptional circumstances, such as technical errors or service disruptions on our end, we may issue refunds beyond the standard refund period. 
       </p>  
      
      
      
      <h2 className={style.heading}>
           Contact Us
      </h2>
 
      <p className={style.paragraph}> 
         If you have any questions or concerns regarding our refund policy, please feel free to reach out to our customer support team
      </p>  
      <p className={style.paragraph}> 
           KIMI AGENCY reserves the right to modify or update this refund policy at any time without prior notice. Any changes will be effective immediately upon posting on our website.
       </p>    

    </div>
  );
};

export default RefundPolicy;
