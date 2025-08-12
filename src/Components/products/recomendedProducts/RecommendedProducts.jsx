import React, { useState, useEffect, useMemo, useCallback } from "react";
import ProductCard from "../productCard/ProductCard";
import sectionStyles from "../../shared/SectionStyles.module.css";
import gridStyles from "../ProductGrid.module.css";
import { startMeasure, endMeasure } from "../../../utils/performanceMonitor";

// Memoized ProductCard component for better performance
const MemoizedProductCard = React.memo(ProductCard);

const RecommendedProducts = React.memo(({ categoryId, currentProductId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Performance monitoring for component initialization
  useEffect(() => {
    startMeasure('recommended_products_initialization', 'component');
    
    return () => {
      endMeasure('recommended_products_initialization', 'component');
    };
  }, []);

  // Fetch recommended products
  const fetchRecommendedProducts = useCallback(async () => {
    if (!categoryId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/categories/${categoryId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const products = await response.json();
      const filteredProducts = products.filter(product => product.id !== currentProductId);
      
      setRecommendedProducts(filteredProducts);
    } catch (err) {
      console.error("Failed to fetch recommended products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId, currentProductId]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchRecommendedProducts();
  }, [fetchRecommendedProducts]);

  // Performance monitoring for render
  useEffect(() => {
    if (recommendedProducts && recommendedProducts.length > 0) {
      startMeasure('recommended_products_render', 'component');
      endMeasure('recommended_products_render', 'component', { 
        productCount: recommendedProducts.length,
        categoryId 
      });
    }
  }, [recommendedProducts, categoryId]);

  // Memoize the sliced products to prevent unnecessary re-renders
  // This must be before any conditional returns
  const displayProducts = useMemo(() => 
    recommendedProducts.slice(0, 8), // Show 8 products like Discounted Products
    [recommendedProducts]
  );

  // Don't render if no category ID
  if (!categoryId) return null;

  if (loading) {
    return (
      <div style={{ 
        margin: '5rem 0',
        padding: '4rem 2rem',
        margin: '0 auto',
        maxWidth: '1400px'
      }}>
        <div className={sectionStyles.loadingContainer}>
          <div className={sectionStyles.inlineSpinner}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        margin: '5rem 0',
        padding: '4rem 2rem',
        margin: '0 auto',
        maxWidth: '1400px'
      }}>
        <div className={sectionStyles.errorContainer}>
          <h2>Error: {error}</h2>
          <button onClick={fetchRecommendedProducts} className={sectionStyles.retryBtn}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div style={{ 
      margin: '5rem 0',
      padding: '4rem 2rem',
      margin: '0 auto',
      maxWidth: '1400px'
    }}>
      <div className={sectionStyles.sectionHeader}>
        <h2 className={sectionStyles.sectionTitle}>
          Recommended Products
        </h2>
      </div>
      
      <div className={gridStyles.productGrid}>
        {displayProducts.map((product) => (
          <div key={product.id}>
            <MemoizedProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
});

RecommendedProducts.displayName = 'RecommendedProducts';

export default RecommendedProducts;
