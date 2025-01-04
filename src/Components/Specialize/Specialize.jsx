import styles from '../Specialize/Specialize.module.css';

const Specialize = () => {
  const Specialize = [
    {
      title: "Reliable agency advertising accounts",
      description: "As an official partner of Meta, Google, Bing, TikTok, etc., we provide cost-effective accounts."
    },
    {
      title: "Self-Manage Panel",
      description: "Manage all accounts efficiently with real-time feedback."
    },
    {
      title: "Professional team service",
      description: "Get professional guidance and quick responses from our support team."
    },
  ];

  return (
    <section className={styles.services}>
      <h2>We specialize in the following services</h2>
      <div className={styles.cards}>
        {Specialize.map((Specialize, index) => (
          <div className={styles.card} key={index}>
            <h3>{Specialize.title}</h3>
            <p>{Specialize.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specialize;
