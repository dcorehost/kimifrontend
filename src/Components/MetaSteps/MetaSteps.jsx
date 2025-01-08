



import React from 'react';
import style from "./MetaSteps.module.css";
import { assets } from "../../assets/assets.jsx"; 

const MetaSteps = () => {
    return (
        <>
        <div className={style.maincontainer}>
            <p className={style.headerpara}>
                How it works               
            </p>  
            <h5 className={style.mainheader}>
               Step of get a Meta agency ad account
            </h5>
          <div className={style.step}>
            <div className={style.textsection}>
                <h5 className={style.header}>01</h5>   
                <h5 className={style.title}>Register and Open an Account</h5>  
                <h5 className={style.description}>
                   Provide information, get account
                </h5>      
            </div>
            <div className={style.imagesection}>
                <img src={assets.metastep1} alt="metastep1" className={style.image} />
            </div>
          </div>

          <div className={style.step}>
            <div className={style.imagesection}>
                <img src={assets.metastep2} alt="metastep2" className={style.image} />
            </div>          
            <div className={style.textsection}>                  
                <h5 className={style.header}>02</h5>   
                <h5 className={style.title}>Deposit Funds into Your Account</h5>  
                <h5 className={style.description}>
                   Deposit funds, share BM.
                </h5> 
            </div>
          </div>

          <div className={style.step}>
            <div className={style.textsection}>                  
                <h5 className={style.header}>03</h5>   
                <h5 className={style.title}>Get a Free Marketing Automation Guide</h5>  
                <h5 className={style.description}>
                   Unlock the power of marketing automation with our free guide.
                </h5> 
            </div>
            <div className={style.imagesection}>
                <img src={assets.metastep3} alt="metastep3" className={style.image} />
            </div>
          </div>
        </div>
        </>
    );
};

export default MetaSteps;
