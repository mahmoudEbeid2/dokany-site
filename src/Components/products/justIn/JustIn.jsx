import React, { useState, useEffect, useMemo } from "react";
import Carousel from "react-bootstrap/Carousel";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";
import styles from "./JustIn.module.css";

// Helper: divide products into chunks
const chunkProducts = (products, size) => {
  return Array.from({ length: Math.ceil(products.length / size) }, (_, i) =>
    products.slice(i * size, i * size + size)
  );
};

const JustIn = ({ subdomain }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch seller products by subdomain
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${import.meta.env.VITE_API}/products/seller/subdomain/${subdomain}`
        );
        if (!res.ok) throw new Error("Failed to fetch products.");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [subdomain]);

  // Filter products created within the last 10 days
  const newProducts = useMemo(() => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    return products.filter(
      (product) => new Date(product.created_date) >= tenDaysAgo
    );
  }, [products]);

  // Chunk new products into groups of 4 for carousel
  const productChunks = useMemo(() => chunkProducts(newProducts, 4), [newProducts]);

  // Custom carousel indicators
  const renderIndicators = () => (
    <div className={styles.carouselIndicators}>
      {productChunks.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={i === activeIndex ? "active" : ""}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </div>
  );

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="container text-center py-5 text-danger">Error: {error}</div>
    );
  if (newProducts.length === 0) return null;

  return (
    <div className={`container ${styles.justInSection} my-5`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-4xl font-bold text-center text-uppercase py-3">
          Just In
        </h2>
        {renderIndicators()}
      </div>

      <Carousel
        activeIndex={activeIndex}
        onSelect={(i) => setActiveIndex(i)}
        interval={null}
        controls={false}
        indicators={false}
      >
        {productChunks.map((chunk, i) => (
          <Carousel.Item key={i}>
            <div className="row g-3">
              {chunk.map((product) => (
                <div
                  key={product.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <ProductCard product={product} isNew={true} />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default JustIn;

