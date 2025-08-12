import React, { useState, useEffect, useMemo } from "react";
import Products from "../../Components/products/products/Products";
import JustIn from "../../Components/products/justIn/JustIn";
import BestSellers from "../../Components/products/bestSellers/BestSellers";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Categories from "../../Components/Categories/Categories";
import Lazyload from "../../Components/Lazyload";
import styles from "./Home.module.css";
import { startMeasure, endMeasure } from "../../utils/performanceMonitor";

export default function Home() {
  const [subdomain, setSubdomain] = useState(null);

  // Better subdomain extraction that works in both dev and production
  const getSubdomain = () => {
    const hostname = window.location.hostname;
    
    // If we're in development (localhost), use a default subdomain
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      console.log("Development mode detected, using default subdomain");
      return 'default'; // or whatever default subdomain you want to use
    }
    
    // In production, extract the subdomain
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const subdomain = parts[0];
      console.log("Production mode, extracted subdomain:", subdomain);
      return subdomain;
    }
    
    // Fallback
    console.log("Could not extract subdomain, using default");
    return 'default';
  };

  // Initialize subdomain on component mount
  useEffect(() => {
    startMeasure('home_initialization', 'component');
    
    const extractedSubdomain = getSubdomain();
    setSubdomain(extractedSubdomain);
    
    endMeasure('home_initialization', 'component', { subdomain: extractedSubdomain });
  }, []);

  // Memoize subdomain to prevent unnecessary re-renders
  const memoizedSubdomain = useMemo(() => subdomain, [subdomain]);

  // Show loading state while subdomain is being determined
  if (!memoizedSubdomain) {
    return null;
  }

  return (
    <div className={styles.homeContainer}>
      <HeroSection />

      <Lazyload>
        <div className={styles.sectionContainer}>
          <Categories subdomain={memoizedSubdomain} />
        </div>
      </Lazyload>

      <Lazyload>
        <div className={`${styles.sectionContainer} ${styles.justInSection}`}>
          <JustIn subdomain={memoizedSubdomain} />
        </div>
      </Lazyload>

      <Lazyload>
        <div className={`${styles.sectionContainer} ${styles.discountedSection}`}>
          <Products subdomain={memoizedSubdomain} />
        </div>
      </Lazyload>

      <Lazyload>
        <div className={`${styles.sectionContainer} ${styles.bestSellersSection}`}>
          <BestSellers subdomain={memoizedSubdomain} />
        </div>
      </Lazyload>
    </div>
  );
}
