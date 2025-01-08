

import React, { useState, useEffect } from "react";
import styles from "./StatsAndFAQ.module.css";
import { faqsData } from "../../assets/assets.jsx";

const StatsAndFAQ = () => {
  // Initial counters data
  const initialCounters = [
    { title: "Number of Users", value: 0, max: 8000, increment: 1000 },
    { title: "Accounts Opened", value: 0, max: 10000, increment: 1000 },
    { title: "Total Ad Spend", value: 0, max: 200000000, increment: 10000000 },
    { title: "Typical Partners", value: 0, max: 40, increment: 2 },
  ];

  const [counters, setCounters] = useState(initialCounters);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters) =>
        prevCounters.map((counter) => {
          if (counter.value < counter.max) {
            return { ...counter, value: counter.value + counter.increment };
          }
          return counter;
        })
      );
    }, 150); // Update every 150ms

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  // Format counter values with W, M, and + symbols
  const formatCounterValue = (value, title) => {
    let formattedValue = value;

    if (title === "Accounts Opened") {
      formattedValue = (
        <>
          {Math.floor(value / 1000)}
          <span className={styles.unitSymbol}>W+</span>
        </>
      );
    } else if (title === "Total Ad Spend") {
      formattedValue = (
        <>
          {Math.floor(value / 1000000)}
          <span className={styles.unitSymbol}>M+</span>
        </>
      );
    } else {
      formattedValue = (
        <>
          {value}
          <span className={styles.unitSymbol}>+</span>
        </>
      );
    }

    return formattedValue;
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      {/* Counter Section */}
      <section className={styles.counters}>
        {counters.map((item, index) => (
          <div key={index} className={styles.counter}>
            <h2 className={styles.title}>{item.title}</h2>
            <hr className={styles.hrLine} />
            <h3 className={styles.value}>
              {formatCounterValue(item.value, item.title)}
            </h3>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <h2 className={styles.faqTitle}>You have questions, we have answers</h2>
        <div className={styles.faqItems}>
          {faqsData.map((faq, index) => (
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
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StatsAndFAQ;


// import React, { useState, useEffect } from "react";
// import styles from "./StatsAndFAQ.module.css";
// import { faqsData } from "../../assets/assets.jsx";

// const StatsAndFAQ = () => {
//   // Initial counters data
//   const initialCounters = [
//     { title: "Number of Users", value: 0, max: 8000, increment: 1000 },
//     { title: "Accounts Opened", value: 0, max: 10000, increment: 1000 },
//     { title: "Total Ad Spend", value: 0, max: 200000000, increment: 10000000 },
//     { title: "Typical Partners", value: 0, max: 40, increment: 10 },
//   ];

//   const [counters, setCounters] = useState(initialCounters);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCounters((prevCounters) =>
//         prevCounters.map((counter) => {
//           // Stop the counter when it reaches the max value
//           if (counter.value < counter.max) {
//             return { ...counter, value: counter.value + counter.increment };
//           }
//           return counter;
//         })
//       );
//     }, 150); // Update every 1 second

//     return () => clearInterval(interval); // Clean up on component unmount
//   }, []);

//   // Render the counters with "+" symbol for specific cases
//   const formatCounterValue = (value, title) => {
//     let formattedValue = value;
//     let symbolClass = "";

//     if (title === "Number of Users" || title === "Typical Partners") {
//       symbolClass = styles.plusSymbol;
//     } else if (title === "Accounts Opened") {
//       formattedValue = `${(value / 1000).toFixed(1)}W`;
//       symbolClass = styles.kSymbol;
//     } else if (title === "Total Ad Spend") {
//       formattedValue = `${(value / 1000000).toFixed(1)}M`;
//       symbolClass = styles.mSymbol;
//     }

//     return (
//       <>
//         {formattedValue}
//         <span className={symbolClass}>{title === "Total Ad Spend" ? "+" : "+"}</span>
//       </>
//     );
//   };

//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className={styles.container}>
//       {/* Counter Section */}
//       <section className={styles.counters}>
//         {counters.map((item, index) => (
//           <div key={index} className={styles.counter}>
//              <h2 className={styles.title}>{item.title}</h2>
//             <h3 className={styles.value}>
//               {formatCounterValue(item.value, item.title)}
//             </h3>
//             {/* <p className={styles.title}>{item.title}</p> */}
//           </div>
//         ))}
//       </section>

//       {/* FAQ Section */}
//       <section className={styles.faq}>
//         <h2 className={styles.faqTitle}>You have questions, we have answers</h2>
//         <div className={styles.faqItems}>
//           {faqsData.map((faq, index) => (
//             <div key={index} className={styles.faqItem}>
//               <div
//                 className={styles.faqQuestion}
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

// export default StatsAndFAQ;





// import React, { useState, useEffect } from "react";
// import styles from "./StatsAndFAQ.module.css";
// import { faqsData } from "../../assets/assets.jsx";

// const StatsAndFAQ = () => {
//   // Initial counters data
//   const initialCounters = [
//     { title: "Number of Users", value: 0, max: 8000, increment: 1000 },
//     { title: "Accounts Opened", value: 0, max: 10000, increment: 1000 },
//     { title: "Total Ad Spend", value: 0, max: 200000000, increment: 10000000 },
//     { title: "Typical Partners", value: 0, max: 40, increment: 10 },
//   ];

//   const [counters, setCounters] = useState(initialCounters);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCounters((prevCounters) =>
//         prevCounters.map((counter) => {
//           // Stop the counter when it reaches the max value
//           if (counter.value < counter.max) {
//             return { ...counter, value: counter.value + counter.increment };
//           }
//           return counter;
//         })
//       );
//     }, 150); // Update every 150ms

//     return () => clearInterval(interval); // Clean up on component unmount
//   }, []);

//   // Render the counters with "+" symbol for specific cases
//   const formatCounterValue = (value, title) => {
//     let formattedValue = value;
//     let symbolClass = "";

//     if (title === "Number of Users" || title === "Typical Partners") {
//       symbolClass = styles.plusSymbol;
//     } else if (title === "Accounts Opened") {
//       formattedValue = `${(value / 1000).toFixed(1)}W`;
//       symbolClass = styles.kSymbol;
//     } else if (title === "Total Ad Spend") {
//       formattedValue = `${(value / 1000000).toFixed(1)}M`;
//       symbolClass = styles.mSymbol;
//     }

//     return (
//       <>
//         {formattedValue}
//         <span className={symbolClass}>{title === "Total Ad Spend" ? "+" : "+"}</span>
//       </>
//     );
//   };

//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className={styles.container}>
//       {/* Counter Section */}
//       <section className={styles.counters}>
//         {counters.map((item, index) => (
//           <div key={index} className={styles.counter}>
//             <h2 className={styles.title}>{item.title}</h2>
//             <hr className={styles.hrLine} /> {/* Red line below title */}
//             <h3 className={styles.value}>
//               {formatCounterValue(item.value, item.title)}
//             </h3>
//           </div>
//         ))}
//       </section>

//       {/* FAQ Section */}
//       <section className={styles.faq}>
//         <h2 className={styles.faqTitle}>You have questions, we have answers</h2>
//         <div className={styles.faqItems}>
//           {faqsData.map((faq, index) => (
//             <div key={index} className={styles.faqItem}>
//               <div
//                 className={styles.faqQuestion}
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

// export default StatsAndFAQ;





