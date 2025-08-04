import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";
import heroImage from "../../../public/images/light.png";

const HeroSection = () => {
  return (
    <section className={`${styles.heroSection} d-flex align-items-center`}>
      <div className="container-fluid p-0">
        <div className="row align-items-center flex-column flex-md-row">
          <div className="col-md-6 text-center">
            <div className={`${styles.heroImgWrapper} position-relative`}>
              <div className={styles.heroImg}>
                <img
                  src={heroImage}
                  alt="Modern Shopping Experience"
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>

          <div className={`col-md-6 ${styles.heroContent}`}>
            <h1 className={styles.heroHeader}>Great Products, Better Prices</h1>
            <p className={styles.heroDescription}>
              Shop confidently from anywhere, We cover every category with
              trusted items, secure payments, and fast delivery right to your
              door.
            </p>
            <Link to="/shoppage" className={`${styles.heroBtn}`}>
              Shopping Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
