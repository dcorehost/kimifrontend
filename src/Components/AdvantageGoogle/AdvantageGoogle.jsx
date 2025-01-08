

import React from 'react';
import style from "./AdvantageGoogle.module.css";
import { assets } from "../../assets/assets.jsx";
import { BsPatchCheck } from "react-icons/bs";

const AdvantageGoogle = () => {
    return (
        <>
        <div className={style.container}>

          <div className={style.MainContainer}>
              <div className={style.textsection}>
                  <h1 className={style.welcome}>                     
                     Advantages of KIMI Google Agency Ad Account
                  </h1>
                  <hr className={style.separator} />
                  <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Unlimited spend
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Unlimited domains
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Run in all types of business
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Apply account and deposit fast
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Promotions $385 / $500
                 </p>                
              </div>
              <div className={style.imagesection}>
                 <img src={assets.advantagegoogle} alt="advantagegoogle" className={style.advantagegoogle} />
              </div>
          </div>
          </div>

        </>
    );
};

export default AdvantageGoogle;
