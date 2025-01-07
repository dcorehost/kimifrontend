

import React from 'react';
import style from "./AdvantageMeta.module.css";
import { assets } from "../../assets/assets.jsx";
import { BsPatchCheck } from "react-icons/bs";

const AdvantageMeta = () => {
    return (
        <>
        <div className={style.container}>

          <div className={style.MainContainer}>
              <div className={style.textsection}>
                  <h1 className={style.welcome}>                     
                     Advantages of KIMI Meta Agency Ad Account
                  </h1>
                  <hr className={style.separator} />
                  <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Unlimited spend
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Unlimited campaigns
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> 7*24 recharge and share automatically
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Get account fast
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> Priority support from Meta official
                 </p>
                 <p className={style.award}>
                     <BsPatchCheck className={style.icon} /> After sales service
                 </p>
              </div>
              <div className={style.imagesection}>
                 <img src={assets.advantagemeta} alt="advantagemeta" className={style.advantagemeta} />
              </div>
          </div>
          </div>

        </>
    );
};

export default AdvantageMeta;
