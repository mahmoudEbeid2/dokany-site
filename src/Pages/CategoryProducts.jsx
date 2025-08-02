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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const subdomain = window.location.hostname.split(".")[0];
  const api = "https://dokany-api-production.up.railway.app";

  const fetchCategoryProducts = async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching products for category ${id} page ${pageNum} in subdomain ${subdomain}`);
      const res = await fetch(`${api}/categories/${id}?page=${pageNum}`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log("Fetched products:", data);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }

      if (pageNum === 1) {
        try {
          const categoryRes = await fetch(`${api}/categories/subdomain/${subdomain}`);
          if (categoryRes.ok) {
            const categories = await categoryRes.json();
            const category = categories.find((cat) => cat.id == id);
            setCategoryName(category ? category.name : "Category");
          }
        } catch (catError) {
          console.error("Error fetching category name:", catError);
          setCategoryName("Category");
        }
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
      setError(`Failed to load products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchCategoryProducts(1);
  }, [id]);

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
        ) : products.length === 0 && !loading ? (
          <div className="category-products-empty">
            <p>No products found in this category.</p>
          </div>
        ) : (
          <>
            <div className="row gy-4 category-products-grid justify-content-center">
              {products.map((product) => (
                <div className="col-lg-2 col-md-3 col-sm-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {hasMore && !loading && (
              <div className="text-center mt-4">
                <button
                  className="btn btnLoadCat bg-black text-white p-3"
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchCategoryProducts(nextPage);
                  }}
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}

        {loading && <Loader />}
      </div>
    </div>
  );
};

export default CategoryProducts;
