

// import React, { useState, useEffect } from "react";
// import styles from "./MetaFaq.module.css";
// import { MetafaqsData } from "../../assets/assets.jsx";

// const MetaFaq = () => {
 


//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className={styles.container}>    
//       <section className={styles.faq}>
//         <h2 className={styles.faqTitle}>You have questions, we have answers</h2>
//         <div className={styles.faqItems}>
//           {MetafaqsData.map((faq, index) => (
//             <div key={index} className={styles.faqItem}>
//               <div   className={styles.faqQuestion}
//                 onClick={() => toggleFAQ(index)}
//               >
//                 <p>{faq.question}</p>
//                 <span>{activeIndex === index ? "-" : "+"}</span>
//               </div>
//               {activeIndex === index && (
//                 <div className={styles.faqAnswer}>
//                   <p>{faq.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MetaFaq;



import React, { useState } from "react";
import styles from "./MetaFaq.module.css";
import { MetafaqsData } from "../../assets/assets.jsx";

const MetaFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <section className={styles.faq}>
        <h2 className={styles.faqTitle}>You have questions, we have answers</h2>
        <div className={styles.faqItems}>
          {MetafaqsData.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <p>{faq.question}</p>
                <span>{activeIndex === index ? "-" : "+"}</span>
              </div>
              {activeIndex === index && (
                <div className={styles.faqAnswer}>
                  {faq.answer.map((ans, ansIndex) => (
                    <p key={ansIndex}>{ans}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MetaFaq;
