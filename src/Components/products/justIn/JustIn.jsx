import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";
import styles from "./JustIn.module.css";
import Carousel from "react-bootstrap/Carousel";

const chunkProducts = (products, size) => {
  const chunkedArr = [];
  for (let i = 0; i < products.length; i += size) {
    chunkedArr.push(products.slice(i, i + size));
  }
  return chunkedArr;
};

const JustIn = ({ subdomain }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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

  const renderIndicators = (chunks) => (
    <div className={styles.carouselIndicators}>
      {chunks.map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => setIndex(idx)}
          className={idx === index ? "active" : ""}
          aria-label={`Slide ${idx + 1}`}
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

  return (
    <div className={`container ${styles.justInSection} my-5`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-4xl font-bold text-center text-uppercase py-3">
          Just In
        </h2>
        {renderIndicators(productChunks)}
      </div>

      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        controls={false}
        indicators={false}
      >
        {productChunks.map((chunk, i) => (
          <Carousel.Item key={i}>
            <div className="row g-3">
              {chunk.map((product) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  key={product.id}
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
