import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/products/productCard/ProductCard";
import sectionStyles from "../Components/shared/SectionStyles.module.css";
import gridStyles from "../Components/products/ProductGrid.module.css";
import "./CategoryProducts.css";

// Memoized ProductCard component for better performance
const MemoizedProductCard = React.memo(ProductCard);

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const subdomain = window.location.hostname.split(".")[0];
  const api = "https://dokany-api-production.up.railway.app";

  // Memoized fetch function for better performance
  const fetchCategoryProducts = useCallback(async (pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const res = await fetch(`${api}/categories/${id}?page=${pageNum}`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        if (pageNum === 1) {
          setProducts(data);
          setHasMore(data.length >= 10); // Set hasMore based on first page
          // Scroll to top when first page loads
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // For additional pages, append to existing products
          setProducts((prev) => {
            const newProducts = [...prev, ...data];
            return newProducts;
          });
          setHasMore(data.length > 0); // Set hasMore based on additional pages
        }
      }

      if (pageNum === 1) {
        try {
          const categoryRes = await fetch(`${api}/categories/subdomain/${subdomain}`);
          if (categoryRes.ok) {
            const categories = await categoryRes.json();
            const category = categories.find((cat) => cat.id == id);
            setCategoryName(category ? category.name : "Category");
          }
        } catch (catError) {
          console.error("Error fetching category name:", catError);
          setCategoryName("Category");
        }
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
      setError(`Failed to load products: ${error.message}`);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [id, subdomain, api]);

  // Memoized products to display (initially 10)
  const displayedProducts = useMemo(() => {
    // Show all products, not just first 10
    return products;
  }, [products]);

  // Memoized remaining products count
  const remainingCount = useMemo(() => {
    return Math.max(0, products.length - 10);
  }, [products]);

  // Check if there are more products to load
  const hasMoreProducts = useMemo(() => {
    return products.length > 10;
  }, [products]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchCategoryProducts(1);
  }, [id, fetchCategoryProducts]);

  const handleViewMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCategoryProducts(nextPage);
  }, [page, fetchCategoryProducts]);

  if (loading) {
    return (
      <div className="category-products-container">
        <div className="container">
          <div className={sectionStyles.loadingContainer}>
            <div className={sectionStyles.inlineSpinner}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-products-container">
        <div className="container">
          <div className={sectionStyles.errorContainer}>
            <h2>Error: {error}</h2>
            <button onClick={() => window.location.reload()} className={sectionStyles.retryBtn}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="category-products-container">
        <div className="container">
          <div className="text-center py-16 text-gray-500">
            <h2>No products found in this category.</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-products-container">
      <div className="container">
        <div className={sectionStyles.sectionHeader}>
          <h2 className={sectionStyles.sectionTitle}>
            {categoryName}
          </h2>
        </div>

        <div className={gridStyles.productGrid}>
          {displayedProducts.map((product) => (
            <div key={product.id}>
              <MemoizedProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View More button based on hasMoreProducts */}
        {hasMoreProducts && (
          <div className="text-center mt-6">
            <button
              onClick={handleViewMore}
              disabled={loadingMore}
              className={sectionStyles.retryBtn}
            >
              {loadingMore ? "Loading..." : "View More"}
            </button>
          </div>
        )}

        {/* Alternative View More button based on hasMore state */}
        {hasMore && !hasMoreProducts && (
          <div className="text-center mt-6">
            <button
              onClick={handleViewMore}
              disabled={loadingMore}
              className={sectionStyles.retryBtn}
            >
              {loadingMore ? "Loading..." : "View More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(CategoryProducts);
