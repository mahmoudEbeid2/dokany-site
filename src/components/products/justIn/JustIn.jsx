import React, { useState, useEffect } from "react";
import styles from "./JustIn.module.css";
import ProductCard from "../productCard/ProductCard";

const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};

const chunkProducts = (products, size) => {
  const chunkedArr = [];
  for (let i = 0; i < products.length; i += size) {
    chunkedArr.push(products.slice(i, i + size));
  }
  return chunkedArr;
};

const JustIn = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // for new products
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        const justIn = productsData.filter((p) => {
          const productCreationDate = new Date(p.created_date);
          return productCreationDate >= tenDaysAgo;
        });

        setNewProducts(justIn);

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

  const productChunks = {
    desktop: chunkProducts(newProducts, 4),
    tablet: chunkProducts(newProducts, 2),
    mobile: chunkProducts(newProducts, 1),
  };

  const renderIndicators = (chunks) => (
    <div className={styles.carouselIndicators}>
      {chunks.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target="#justInCarousel"
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>
  );

  if (loading)
    return <div className="container text-center py-5">Loading...</div>;
  if (error)
    return (
      <div className="container text-center py-5 text-danger">
        Error: {error}
      </div>
    );
  if (newProducts.length === 0) return null;

  return (
    <div className={`container ${styles.justInSection} my-5`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={styles.justInTitle}>Just In</h2>
        <div className="d-none d-lg-flex">
          {renderIndicators(productChunks.desktop)}
        </div>
        <div className="d-none d-md-flex d-lg-none">
          {renderIndicators(productChunks.tablet)}
        </div>
        <div className="d-flex d-md-none">
          {renderIndicators(productChunks.mobile)}
        </div>
      </div>

      <div
        id="justInCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-wrap="true"
        data-bs-touch="true"
      >
        <div className="carousel-inner">
          {/* Desktop View */}
          <div className="d-none d-lg-block">
            {productChunks.desktop.map((chunk, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={`desktop-${index}`}
              >
                <div className="row g-4">
                  {chunk.map((product) => {
                    const favoriteItem = favorites.find(
                      (fav) => fav.product_id === product.id
                    );
                    return (
                      <div className="col-lg-3" key={product.id}>
                        <ProductCard
                          product={product}
                          favoriteItem={favoriteItem}
                          isNew={true}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Tablet View */}
          <div className="d-none d-md-block d-lg-none">
            {productChunks.tablet.map((chunk, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={`tablet-${index}`}
              >
                <div className="row g-4">
                  {chunk.map((product) => {
                    const favoriteItem = favorites.find(
                      (fav) => fav.product_id === product.id
                    );
                    return (
                      <div className="col-md-6" key={product.id}>
                        <ProductCard
                          product={product}
                          favoriteItem={favoriteItem}
                          isNew={true}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View */}
          <div className="d-block d-md-none">
            {productChunks.mobile.map((chunk, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={`mobile-${index}`}
              >
                <div className="row g-4 justify-content-center">
                  {chunk.map((product) => {
                    const favoriteItem = favorites.find(
                      (fav) => fav.product_id === product.id
                    );
                    return (
                      <div className="col-10" key={product.id}>
                        <ProductCard
                          product={product}
                          favoriteItem={favoriteItem}
                          isNew={true}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JustIn;
