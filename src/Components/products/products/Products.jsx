import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";

const Products = ({ subdomain }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    if (!subdomain) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const productsResponse = await fetch(
          `${import.meta.env.VITE_API}/products/seller/subdomain/${subdomain}/all`,
          { signal: controller.signal }
        );

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products.");
        }

        const productsData = await productsResponse.json();
        const discountedProducts = productsData.filter(
          (product) => product.discount > 0
        );

        setAllProducts(discountedProducts);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [subdomain]);


  const handleViewMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
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

  if (allProducts.length === 0) {
    return null;
  }

  return (
    <div className="container py-5">
      <h2 className="text-4xl font-bold text-center text-uppercase py-3">
        Discounted Products
      </h2>
      <div className="row g-3">
        {allProducts.slice(0, visibleProducts).map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {visibleProducts < allProducts.length && (
        <div className="text-center mt-5">
          <button className="btn btn-dark px-4 py-2" onClick={handleViewMore}>
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
