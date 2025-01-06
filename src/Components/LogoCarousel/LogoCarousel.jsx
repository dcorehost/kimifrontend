

// import React from "react";
// import styles from "./LogoCarousel.module.css";
// import { assets } from "../../assets/assets.jsx"; 

// const LogoCarousel = () => {
//   return (
//     <div className={styles.carouselsec}>
//        <img src={assets.facebook} alt=" Logo" className={styles.logo} />
//        <img src={assets.bing} alt=" Logo" className={styles.logo} />
//        <img src={assets.google} alt=" Logo" className={styles.logo} />      


//     </div>
    
//   );
// };

// export default LogoCarousel;



import React from "react";
import styles from "./LogoCarousel.module.css";
import { assets } from "../../assets/assets.jsx";

const LogoCarousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {/* Duplicate the images for seamless scrolling */}
        <img src={assets.facebook} alt="Facebook Logo" className={styles.logo} />
        <img src={assets.bing} alt="Bing Logo" className={styles.logo} />
        <img src={assets.google} alt="Google Logo" className={styles.logo} />
        <img src={assets.facebook} alt="Facebook Logo" className={styles.logo} />
        <img src={assets.bing} alt="Bing Logo" className={styles.logo} />
        <img src={assets.google} alt="Google Logo" className={styles.logo} />
      </div>
    </div>
  );
};

export default LogoCarousel;
