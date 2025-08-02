import React, { useEffect, useState } from "react";
import ProductDetailsSection from "../Components/ProductDetailsSection/ProductDetailsSection";
import ReviewsSection from "../Components/ReviewSection/ReviewsSection";
import RecommendedProducts from "../Components/products/recomendedProducts/RecommendedProducts";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { ToastContainer } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productReviews, setProductReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productResponse = await axios.get(
          `https://dokany-api-production.up.railway.app/products/${id}`
        );
        setProduct(productResponse.data);

        const reviewsResponse = await axios.get(
          `https://dokany-api-production.up.railway.app/reviews/${id}`
        );
        setProductReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  if (loading) return <Loader />;

  if (!product)
    return (
      <p style={{ padding: "2rem", textAlign: "center" }}>Product not found.</p>
    );

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
