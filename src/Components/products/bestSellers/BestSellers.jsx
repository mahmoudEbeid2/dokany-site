import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";

const BestSellers = ({ subdomain }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    if (!subdomain) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const productsResponse = await fetch(
          `${
            import.meta.env.VITE_API
          }/products/seller/subdomain/${subdomain}/all`
        );

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products.");
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
  }, [subdomain]);

  const bestSellers = useMemo(() => {
    return allProducts
      .map((product) => {
        const ratings = product.reviews?.map((r) => r.rating) || [];
        const averageRating = ratings.length
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;
        return { ...product, averageRating };
      })
      .filter((productWithRating) => {
        const hasEnoughReviews =
          productWithRating.reviews && productWithRating.reviews.length > 3;
        const hasHighRating = productWithRating.averageRating > 4;
        return hasEnoughReviews && hasHighRating;
      })
      .sort((a, b) => b.averageRating - a.averageRating);
  }, [allProducts]);

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
      <h2 className="text-4xl font-bold text-center text-uppercase py-3">
        Best Sellers
      </h2>
      <div className="row g-3">
        {bestSellers.slice(0, visibleProducts).map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
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
