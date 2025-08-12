import React, { useMemo } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";
import sectionStyles from "../../shared/SectionStyles.module.css";
import gridStyles from "../ProductGrid.module.css";
import { useDataFetching } from "../../../hooks/useDataFetching";

// Memoized ProductCard component for better performance
const MemoizedProductCard = React.memo(ProductCard);

const BestSellers = ({ subdomain }) => {
  // Fetch function for best sellers
  const fetchBestSellers = useMemo(() => async (signal) => {
    const productsResponse = await fetch(
      `${import.meta.env.VITE_API}/products/seller/subdomain/${subdomain}?page=1`,
      { signal }
    );

    if (!productsResponse.ok) {
      throw new Error("Failed to fetch products.");
    }

    const productsData = await productsResponse.json();
    
    // Calculate average rating and filter products with ratings
    const productsWithRating = productsData
      .map((product) => {
        const reviews = product.reviews || [];
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        return { ...product, averageRating, reviewCount: reviews.length };
      })
      .filter((product) => product.averageRating > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
              .slice(0, 8);

    return productsWithRating;
  }, [subdomain]);

  // Use optimized data fetching hook
  const { data: bestSellers, loading, error, refetch } = useDataFetching(
    fetchBestSellers,
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

  if (!bestSellers || bestSellers.length === 0) {
    return null;
  }

  return (
    <>
      <div className={sectionStyles.sectionHeader}>
        <h2 className={sectionStyles.sectionTitle}>
          Best Sellers
        </h2>
      </div>
      
      <div className={gridStyles.productGrid}>
        {bestSellers.map((product) => (
          <div key={product.id}>
            <MemoizedProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(BestSellers);
