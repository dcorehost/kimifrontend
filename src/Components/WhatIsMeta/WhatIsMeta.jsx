import React from 'react';
import style from "./WhatIsMeta.module.css";
import { assets } from "../../assets/assets.jsx"; 

const WhatIsMeta = () => {

    return (
        <>
          <div className={style.MainContainer}>
            <div className={style.textsection}>
                <p className={style.award}>
                    Enhance your performance
                 </p>
                <h1 className={style.welcome}>
                    What is Meta ads?
                </h1>               
                <p className={style.digitalpara}>
                    One of the world's largest social media platforms, improves advertising exposure, conversion rate and return on investment, and helps advertisers achieve better marketing results.
               </p>
               <button className={style.actionButton}>Get Start</button>       
            </div>
            <div className={style.imagesection}>
               <img src={assets.whatismeta} alt="metaads" className={style.metaimg} />
            </div>
          </div>
        </>
    );
};

export default WhatIsMeta;
