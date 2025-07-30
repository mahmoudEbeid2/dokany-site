import React from 'react';
import styles from './HeroSection.module.css';
import hero_img from '../../assets/hero_img.png';

const HeroSection = () => {
  return (
    <section
      className={`${styles.heroSection} d-flex align-items-center`}
    >
      <div className="container-fluid p-0">
        <div className="row align-items-center flex-column flex-md-row">
          <div className="col-md-6 text-center">
            <div className={`${styles.heroImgWrapper} position-relative`}>
              <img
                src={hero_img}
                alt="hero image"
                className={`img-fluid ${styles.heroImg}`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>

          <div className={`col-md-6 ${styles.heroContent}`}>
            <h1 className={styles.heroHeader}>Great Products, Better Prices</h1>
            <p className={styles.heroDescription}>
              Shop confidently from anywhere, We cover every category with trusted items, secure payments, and fast delivery right to your door.
            </p>
            <a href="#" className={styles.heroBtn}>
              Shopping Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


