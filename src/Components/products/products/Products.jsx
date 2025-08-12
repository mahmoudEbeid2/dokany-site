import React, { useMemo } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";
import sectionStyles from "../../shared/SectionStyles.module.css";
import gridStyles from "../ProductGrid.module.css";
import { useDataFetching } from "../../../hooks/useDataFetching";

// Memoized ProductCard component for better performance
const MemoizedProductCard = React.memo(ProductCard);

const Products = ({ subdomain }) => {
  // Fetch function for discounted products
  const fetchDiscountedProducts = useMemo(() => async (signal) => {
    const productsResponse = await fetch(
      `${import.meta.env.VITE_API}/products/seller/subdomain/${subdomain}/discount?page=1`,
      { signal }
    );

    if (!productsResponse.ok) {
      throw new Error("Failed to fetch products.");
    }

    const productsData = await productsResponse.json();
    return productsData.filter((product) => product.discount > 0).slice(0, 8);
  }, [subdomain]);

  // Use optimized data fetching hook
  const { data: allProducts, loading, error, refetch } = useDataFetching(
    fetchDiscountedProducts,
    [subdomain],
    {
      enableCache: true,
      cacheTimeout: 3 * 60 * 1000, // 3 minutes cache
      retryCount: 2,
      retryDelay: 500
    }
  );

  if (loading) {
    return (
      <div className={sectionStyles.loadingContainer}>
        <div className={sectionStyles.inlineSpinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={sectionStyles.errorContainer}>
        <h2>Error: {error}</h2>
        <button onClick={refetch} className={sectionStyles.retryBtn}>
          Retry
        </button>
      </div>
    );
  }

  if (!allProducts || allProducts.length === 0) {
    return null;
  }

  return (
    <>
      <div className={sectionStyles.sectionHeader}>
        <h2 className={sectionStyles.sectionTitle}>
          Discounted Products
        </h2>
      </div>
      
      <div className={gridStyles.productGrid}>
        {allProducts.map((product) => (
          <div key={product.id}>
            <MemoizedProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(Products);
