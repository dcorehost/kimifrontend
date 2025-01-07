
import React from 'react';
import style from "./AdvantageBing.module.css";
import { assets } from "../../assets/assets.jsx";
import { BsPatchCheck } from "react-icons/bs";

const AdvantageBing = () => {
    return (
        <>
        <div className={style.container}>

          <div className={style.MainContainer}>
              <div className={style.textsection}>
                  <h1 className={style.welcome}>                     
                     Advantages of KIMI Bing Agency Ad Account
                  </h1>
                  <hr className={style.separator} />
                  <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Unlimited domains
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Unlimited spend
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Run in all types of business
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Apply account and deposit fast
                 </p>
                
              </div>
              <div className={style.imagesection}>
                 <img src={assets.advantagebing} alt="advantagebing" className={style.advantagebing} />
              </div>
          </div>
          </div>

        </>
    );
};

export default AdvantageBing;
