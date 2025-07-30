import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

const BestSellers = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const subdomain = "mohamed-seller";

        const [productsResponse, favoritesResponse] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_API}/products/seller/subdomain/${subdomain}`
          ),
          fetch(`${import.meta.env.VITE_API}/favorites`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          }),
        ]);

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch best sellers.");
        }
        const productsData = await productsResponse.json();
        setAllProducts(productsData); // We still keep all products in state

        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          setFavorites(favoritesData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Start of Modified Section ---

  // 1. Filter products based on your criteria
  const bestSellers = allProducts.filter((product) => {
    const hasEnoughReviews = product.reviews && product.reviews.length > 3;
    const hasHighRating = product.averageRating > 2.5;
    return hasEnoughReviews && hasHighRating;
  });

  // 2. Update the "View All" handler to use the filtered list's length
  const handleViewAll = () => {
    setVisibleProducts(bestSellers.length);
  };

  // --- End of Modified Section ---

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading Best Sellers...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Error: {error}</h2>
      </div>
    );
  }

  // Hide the whole section if there are no products that match the criteria
  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <div className="container py-5">
      <h2 className="display-5 fw-bold text-black text-center mb-5">
        Best sellers
      </h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {/* 3. Map over the new filtered list */}
        {bestSellers.slice(0, visibleProducts).map((product) => {
          const favoriteItem = favorites.find(
            (fav) => fav.product_id === product.id
          );
          return (
            <div className="col" key={product.id}>
              <ProductCard product={product} favoriteItem={favoriteItem} />
            </div>
          );
        })}
      </div>

      {/* 4. Update the condition to show the button */}
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
