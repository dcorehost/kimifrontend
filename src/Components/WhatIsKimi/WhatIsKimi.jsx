import React from "react";
import styles from "./WhatIsKimi.module.css";
import { assets } from "../../assets/assets.jsx"; 


const WhatIsKimi = () => {
  return (
    <div className={styles.container}>    

      <main className={styles.main}>
        <div className={styles.flexdiv}>
            <div className={styles.flexfirst}>
               <img src={assets.firstimg} alt="firstimg" className={styles.firstimg} />
            </div>
          <div className={styles.flexsecond}>
            <div className={styles.insideflex}>

            <div className={styles.insideflexone}>
               <h2 className={styles.firstheading}>10+</h2>
               <p className={styles.firstpara}>Years of experience</p>
            </div>
            <div className={styles.insideflextwo}>
               <h2 className={styles.secheading}>8K</h2>
               <p className={styles.secpara}>Happy users</p>
            </div>   
            </div>
   
             
            <img src={assets.secondimg} alt="second" className={styles.secondimg} />            

          </div>


          <div className={styles.flexthird}>
            <p>Your gateway to success</p>
            <h1>What is AdMedia Agency?</h1>
            <p>
              We are proud to be the provider of multi-platform agency
              advertising accounts including Meta, Google, Bing ...            
            </p>

            <p>
              We are committed to quality service, fast support, the lowest
              service fee in the market, providing a comprehensive ecosystem for
              customers.
            </p>
          </div>
         
        </div>

       
      </main>
    </div>
  );
};

export default WhatIsKimi;
