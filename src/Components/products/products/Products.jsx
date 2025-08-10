import React, { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import Loader from "../../Loader/Loader";

const Products = ({ subdomain }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          `${
            import.meta.env.VITE_API
          }/products/seller/subdomain/${subdomain}/discount?page=1`,
          { signal: controller.signal }
        );

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products.");
        }

        const productsData = await productsResponse.json();
        const discountedProducts = productsData.filter(
          (product) => product.discount > 0
        );

        setAllProducts(discountedProducts.slice(0, 8));
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
    <div className="container py-5 ">
      <h2 className="text-3xl mainHeaderHome categories-header font-bold text-center text-uppercase py-3">
        Discounted Products
      </h2>
      <div className="row g-3 ">
        {allProducts.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-center text-center items-center m-auto " key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
