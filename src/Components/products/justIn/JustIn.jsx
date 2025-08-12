import React, { useMemo } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";
import sectionStyles from "../../shared/SectionStyles.module.css";
import gridStyles from "../ProductGrid.module.css";
import { useDataFetching } from "../../../hooks/useDataFetching";

// Memoized ProductCard component for better performance
const MemoizedProductCard = React.memo(ProductCard);

const JustIn = ({ subdomain }) => {
  // Fetch function for just in products
  const fetchJustInProducts = useMemo(() => async (signal) => {
    const productsResponse = await fetch(
      `${import.meta.env.VITE_API}/products/seller/subdomain/${subdomain}?page=1`,
      { signal }
    );

    if (!productsResponse.ok) {
      throw new Error("Failed to fetch products.");
    }

    const productsData = await productsResponse.json();
    
    // Filter and sort new products - show only 4
    const newProducts = productsData
      .filter((product) => {
        const dateField = product.createdAt || product.created_date || product.createdAt || product.date;
        if (!dateField) return false;
        const productDate = new Date(dateField);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - productDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30; // منتجات آخر 30 يوم
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.created_date || a.createdAt || a.date);
        const dateB = new Date(b.createdAt || b.created_date || b.createdAt || b.date);
        return dateB - dateA; // الأحدث أولاً
      })
      .slice(0, 4); // عرض 4 منتجات فقط

    return newProducts;
  }, [subdomain]);

  // Use optimized data fetching hook
  const { data: newProducts, loading, error, refetch } = useDataFetching(
    fetchJustInProducts,
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

  if (!newProducts || newProducts.length === 0) {
    return null;
  }

  return (
    <>
      <div className={sectionStyles.sectionHeader}>
        <h2 className={sectionStyles.sectionTitle}>
          Just In
        </h2>
      </div>
      
      <div className={gridStyles.productGrid}>
        {newProducts.map((product) => (
          <div key={product.id}>
            <MemoizedProductCard product={product} isNew={true} />
          </div>
        ))}
      </div>
    </>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(JustIn);
