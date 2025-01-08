import React from 'react';
import style from "./WhatIsGoogle.module.css";
import { assets } from "../../assets/assets.jsx"; 

const WhatIsGoogle = () => {

    return (
        <>
          <div className={style.MainContainer}>
            <div className={style.textsection}>
                <p className={style.award}>
                    Enhance your performance
                 </p>
                <h1 className={style.welcome}>
                    What is Google ads?
                </h1>               
                <p className={style.digitalpara}>
                   Google Ads is a paid advertising platform that provides a more streamlined, consolidated overview.
               </p>
               <button className={style.actionButton}>Get Start</button>       
            </div>
            <div className={style.imagesection}>
               <img src={assets.whatisgoogle} alt="googleads" className={style.Googleimg} />
            </div>
          </div>
        </>
    );
};

export default WhatIsGoogle;
