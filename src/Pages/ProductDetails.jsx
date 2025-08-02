import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductDetailsSection from "../Components/ProductDetailsSection/ProductDetailsSection";
import ReviewsSection from "../Components/ReviewSection/ReviewsSection";
import RecommendedProducts from "../Components/products/recomendedProducts/RecommendedProducts";
import Loader from "../Components/Loader/Loader";

const api = import.meta.env.VITE_API;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product and reviews together
  useEffect(() => {
    let isMounted = true;

    const fetchProductAndReviews = async () => {
      setLoading(true);
      setError("");

      try {
        const [productRes, reviewsRes] = await Promise.all([
          axios.get(`${api}/products/${id}`),
          axios.get(`${api}/reviews/${id}`)
        ]);

        if (isMounted) {
          setProduct(productRes.data);
          setProductReviews(reviewsRes.data);
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

  // Loader
  if (loading) return <Loader />;

  // Error UI
  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h4>{error}</h4>
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

      <ProductDetailsSection product={product} reviews={productReviews} />

      <ReviewsSection
        productId={id}
        reviews={productReviews}
        handeledReviews={setProductReviews}
      />

      {product.category_id && (
        <RecommendedProducts
          categoryId={product.category_id}
          currentProductId={product.id}
        />
      )}
    </div>
  );
}

export default ProductDetails;


