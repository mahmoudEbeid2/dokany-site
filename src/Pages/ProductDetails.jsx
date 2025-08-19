import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import ProductDetailsSection from "../Components/ProductDetailsSection/ProductDetailsSection";
import ReviewsSection from "../Components/ReviewSection/ReviewsSection";
import RecommendedProducts from "../Components/products/recomendedProducts/RecommendedProducts";
import ReviewsSectionPlaceholder from "../Components/ReviewSection/ReviewsSectionPlaceholder";
import RecommendedProductsPlaceholder from "../Components/products/recomendedProducts/RecommendedProductsPlaceholder";
import Loader from "../Components/Loader/Loader";
import Lazyload from "../Components/Lazyload";
import { startMeasure, endMeasure } from "../utils/performanceMonitor";

const api = import.meta.env.VITE_API;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Performance monitoring for component initialization
  useEffect(() => {
    startMeasure('product_details_initialization', 'component');
    
    return () => {
      endMeasure('product_details_initialization', 'component');
    };
  }, []);

  // Fetch product and reviews data
  useEffect(() => {
    let isMounted = true;

    const fetchProductAndReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const [productRes, reviewsRes] = await Promise.all([
          fetch(`${api}/products/${id}`),
          fetch(`${api}/reviews/${id}`)
        ]);

        if (!productRes.ok) throw new Error(`Product fetch failed: ${productRes.status}`);
        if (!reviewsRes.ok) throw new Error(`Reviews fetch failed: ${reviewsRes.status}`);

        const [productData, reviewsData] = await Promise.all([
          productRes.json(),
          reviewsRes.json()
        ]);

        if (isMounted) {
          setProduct(productData);
          setProductReviews(reviewsData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductAndReviews();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Memoize category ID to prevent unnecessary re-renders
  const categoryId = useMemo(() => product?.category_id, [product?.category_id]);

  // Performance monitoring for render
  useEffect(() => {
    if (product) {
      startMeasure('product_details_render', 'component');
      endMeasure('product_details_render', 'component', { 
        productId: product.id,
        hasImages: product.images?.length > 0,
        hasReviews: productReviews.length > 0
      });
    }
  }, [product, productReviews]);

  // Loader
  if (loading) return <Loader />;

  // Error UI
  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h4>Error loading product: {error}</h4>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h4>Product not found</h4>
      </div>
    );
  }

  return (
    <div>
      {/* Main product section - load immediately */}
      <ProductDetailsSection product={product} reviews={productReviews} />

      {/* Reviews section - lazy load with specialized placeholder */}
      <Lazyload placeholder={<ReviewsSectionPlaceholder />}>
        <div className="container mt-5">
          <ReviewsSection
            productId={id}
            reviews={productReviews}
            handeledReviews={setProductReviews} // This will be handled by the hook
          />
        </div>
      </Lazyload>

      {/* Recommended products - lazy load only if category exists */}
      {categoryId && (
        <Lazyload placeholder={<RecommendedProductsPlaceholder />}>
          <RecommendedProducts
            categoryId={categoryId}
            currentProductId={product.id}
          />
        </Lazyload>
      )}
    </div>
  );
}

export default React.memo(ProductDetails);


