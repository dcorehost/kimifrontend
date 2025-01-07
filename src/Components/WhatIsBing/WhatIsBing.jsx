import React from 'react';
import style from "./WhatIsBing.module.css";
import { assets } from "../../assets/assets.jsx"; 

const WhatIsBing = () => {

    return (
        <>
          <div className={style.MainContainer}>
            <div className={style.textsection}>
                <p className={style.award}>
                    Enhance your performance
                 </p>
                <h1 className={style.welcome}>
                    What is Bing ads?
                </h1>               
                <p className={style.digitalpara}>
                   Bing Ads are Ideal for Bringing Traffic and Increasing Sales, understands specificities of advertising networks, succeeds in creating attractive campaigns.               </p>
               <button className={style.actionButton}>Get Start</button>       
            </div>
            <div className={style.imagesection}>
               <img src={assets.whatisbing} alt="bingads" className={style.bingimg} />
            </div>
          </div>
        </>
    );
};

export default WhatIsBing;
