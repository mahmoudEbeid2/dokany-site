import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";

const getToken = () => {
  let token = localStorage.getItem("token");

  return token;
};

const Products = () => {
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
          throw new Error("Failed to fetch products.");
        }
        const productsData = await productsResponse.json();
        setAllProducts(productsData);

        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          setFavorites(favoritesData);
        } else {
          console.error(
            "Could not fetch favorites. User might not be logged in."
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewAll = () => {
    setVisibleProducts(allProducts.length);
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

  return (
    <div className="container py-5">
      <h2 className="display-5 fw-bold text-black text-center mb-5">
        Products
      </h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
        {allProducts.slice(0, visibleProducts).map((product) => {
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

      {visibleProducts < allProducts.length && (
        <div className="text-center mt-5">
          <button className="btn btn-dark px-4 py-2" onClick={handleViewAll}>
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
