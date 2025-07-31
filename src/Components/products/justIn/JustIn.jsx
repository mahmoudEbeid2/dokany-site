import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";
import styles from "./JustIn.module.css";

const chunkProducts = (products, size) => {
  const chunkedArr = [];
  for (let i = 0; i < products.length; i += size) {
    chunkedArr.push(products.slice(i, i + size));
  }
  return chunkedArr;
};

const JustIn = ({ subdomain = "mohamed-seller" }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsData = await fetch(
          `${import.meta.env.VITE_API}/products/seller/subdomain/${subdomain}`
        ).then((res) => {
          if (!res.ok) throw new Error("Failed to fetch products.");
          return res.json();
        });
        setAllProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subdomain]);

  const newProducts = useMemo(() => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    return allProducts.filter((p) => new Date(p.created_date) >= tenDaysAgo);
  }, [allProducts]);

  const productChunks = useMemo(
    () => chunkProducts(newProducts, 4),
    [newProducts]
  );

  const renderIndicators = (chunks, targetId) => (
    <div className={styles.carouselIndicators}>
      {chunks.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target={`#${targetId}`}
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="container text-center py-5 text-danger">
        Error: {error}
      </div>
    );
  if (newProducts.length === 0) return null;

  const carouselId = "justInCarousel";

  return (
    <div className={`container ${styles.justInSection} my-5`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={styles.justInTitle}>Just In</h2>
        {renderIndicators(productChunks, carouselId)}
      </div>
      <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {productChunks.map((chunk, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="row g-4">
                {chunk.map((product) => (
                  <div className="col-12 col-md-6 col-lg-3" key={product.id}>
                    <ProductCard product={product} isNew={true} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JustIn;
