


import React, { useState } from "react";
import styles from "./BingFaq.module.css";
import { BingfaqsData } from "../../assets/assets.jsx";

const BingFaq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <section className={styles.faq}>
        <h2 className={styles.faqTitle}>You have questions, we have answers</h2>
        <div className={styles.faqItems}>
          {BingfaqsData.map((faq, index) => (
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

export default BingFaq;
