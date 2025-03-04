

import React from 'react';
import styles from '../Specialize/Specialize.module.css';
import { specializeData } from '../../assets/assets.jsx';

const Specialize = () => {
  return (
    <section className={styles.services}>
      <h2>We specialize in the following services</h2>
      <div className={styles.cards}>
        {specializeData.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.icon}>{item.icon}</div> 
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specialize;






