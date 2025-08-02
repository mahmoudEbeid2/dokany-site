import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/products/productCard/ProductCard";
import Loader from "../Components/Loader/Loader";
import "./CategoryProducts.css";

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get subdomain from current hostname
  const subdomain = window.location.hostname.split('.')[0];
  const api = "https://dokany-api-production.up.railway.app";

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching products for category ${id} in subdomain ${subdomain}`);
        const res = await fetch(`${api}/categories/subdomain/${subdomain}/${id}`);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`API Error: ${res.status} - ${errorText}`);
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }
        
        const data = await res.json();
        console.log("Category products data:", data);
        setProducts(data || []);
        
        // Try to get category name from categories endpoint
        try {
          const categoryRes = await fetch(`${api}/categories/subdomain/${subdomain}`);
          if (categoryRes.ok) {
            const categories = await categoryRes.json();
            const category = categories.find(cat => cat.id == id);
            if (category) {
              setCategoryName(category.name);
            } else {
              setCategoryName("Category");
            }
          }
        } catch (catError) {
          console.error("Error fetching category name:", catError);
          setCategoryName("Category");
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
        setError(`Failed to load products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id, subdomain, api]);

  if (loading) return <Loader />;

  return (
    <div className="category-products-container">
      <div className="container">
        <h2 className="category-products-title text-center">{categoryName}</h2>
        
        {error ? (
          <div className="category-products-empty">
            <p className="text-danger">{error}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary mt-2">
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="category-products-empty">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="row gy-4 category-products-grid justify-content-center">
            {products.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
