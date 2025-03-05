import React from 'react';
import style from "./WelcomePage.module.css";
import myImage from "../../assets/img2.jpg";
import { FaTrophy } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';

const WelcomePage = () => {
    const text1 = "";
    const text2 = "Agency|";

    return (
        <div>
          <div className={style.MainContainer}>
            <div className={style.MainContainer1}>
                <p className={style.award}>Award-winning digital services</p>
                <h1 className={style.welcome}>Welcome to</h1>
                <h1 className={style.KimiAgencyText}>Ad Media
                    {text1.split("").map((char, index) => (
                        <span
                          key={`Kimi-${index}`}
                          style={{ "--index": index }} 
                        >
                          {char}
                        </span>
                    ))}
                    <span className={style.Space}>&nbsp;</span>
                    {text2.split("").map((char, index) => (
                        <span
                          key={`Agency-${index}`}
                          style={{ "--index": index + text1.length }} 
                        >
                          {char}
                        </span>
                    ))}
                </h1>
                <p  className={style.digitalpara}>Digital Marketing Solutions. Unlock a Premium Agency Ad 
                    Account.Say goodbye to concerns about restrictions and 
                    ad account suspensions.</p>
                 <div  className={style.WorkWinning}>
                    <div className={style.work}>
                    <FaClock size={60} color="#EF9273" />
                    <div  className={style.awardes}>
                    <h2 className={style.system}>24/7 System Work</h2>
                    <p className={style.help}>We're always here to help</p>
                    </div>
                       
                    </div>
                    <div className={style.winning}>
                   
                    <FaTrophy size={60}  color="#EF9273"/>
                        <div className={style.awardes}>
                        <h2 className={style.system}>Award Winning agency</h2>
                        <p className={style.help}>you are in safe hand</p>
                        </div>
                        
                    </div>
                    </div>   
            </div>
            <div className={style.MainContainer2}>

                <div className={style.imageContainer}><img src={myImage} alt="description" /></div>
            </div>
          </div>
        </div>
    );
};

export default WelcomePage;
