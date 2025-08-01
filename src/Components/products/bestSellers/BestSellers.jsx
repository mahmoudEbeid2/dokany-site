import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";

const BestSellers = ({ subdomain }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsResponse = await fetch(
          `${import.meta.env.VITE_API}/products/seller/subdomain/${subdomain}`
        );

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch best sellers.");
        }
        const productsData = await productsResponse.json();
        setAllProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const bestSellers = allProducts.filter((product) => {
    const hasEnoughReviews = product.reviews && product.reviews.length > 3;
    const hasHighRating = product.averageRating > 1.5;
    return hasEnoughReviews && hasHighRating;
  });

  const handleViewAll = () => {
    setVisibleProducts(bestSellers.length);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Error: {error}</h2>
      </div>
    );
  }

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <div className="container py-5">
      <h2 className="display-5 fw-bold  mb-5">Best sellers</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {bestSellers.slice(0, visibleProducts).map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {visibleProducts < bestSellers.length && (
        <div className="text-center mt-5">
          <button className="btn btn-dark px-4 py-2" onClick={handleViewAll}>
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSellers;
