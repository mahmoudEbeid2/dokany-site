import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const sellerInfo = useSelector((state) => state.seller.sellerInfo);
  const currentTheme = sellerInfo?.theme?.name || 'light';
  const [imageError, setImageError] = useState(false);

  // Get hero image based on current theme
  const getHeroImage = () => {
    switch (currentTheme) {
      case 'dark':
        return '/hearo/dark.jpg';
      case 'beige':
        return '/hearo/beige.png';
      case 'light':
      default:
        return '/hearo/light.png';
    }
  };

  const handleImageError = () => {
    setImageError(true);
    console.warn(`Failed to load hero image for theme: ${currentTheme}`);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <section className={`${styles.heroSection} d-flex align-items-center`}>
      <div className="container-fluid p-0">
        <div className="row align-items-center flex-column flex-md-row">
          <div className="col-md-6 text-center">
            <div className={`${styles.heroImgWrapper} position-relative`}>
              <div className={styles.heroImg}>
                <img
                  src={getHeroImage()}
                  alt={`Modern Shopping Experience - ${currentTheme} theme`}
                  className={styles.heroImage}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  key={currentTheme} // Force re-render when theme changes
                />
                {imageError && (
                  <div className={styles.heroImageFallback}>
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <span className="text-muted">Image not available</span>
                    </div>
                  </div>
                )}
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
