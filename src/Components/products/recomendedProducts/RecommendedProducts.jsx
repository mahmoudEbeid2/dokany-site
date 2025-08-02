import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";
import axios from "axios";


const RecommendedProducts = ({ categoryId, currentProductId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setLoading(false);
      return;
    }
    const fetchRecommendedProducts = async () => {
      setLoading(true);
      setError(null);
      const requestUrl = `${import.meta.env.VITE_API}/categories/${categoryId}`;

      try {
        const response = await axios.get(requestUrl);

        const products = response.data || [];

        const filteredProducts = products.filter(
          (product) => product.id !== currentProductId
        );
        setRecommendedProducts(filteredProducts);
      } catch (err) {
        console.error("AXIOS REQUEST FAILED:", err);
        const status = err.response?.status;
        const message =
          err.response?.data?.error || "Server responded with an error.";
        setError(`API Error: ${status} - ${message}.`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [categoryId, currentProductId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger">Failed to Load Recommended Products</h3>
        <p
          className="text-muted mt-2"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          <strong>Details:</strong> {error}
        </p>
      </div>
    );
  }

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="container py-5">
      <h2 className="text-4xl font-bold text-center text-uppercase py-3">
        Recommended Products
      </h2>
      <div className="row g-3">
        {recommendedProducts.slice(0, 4).map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
