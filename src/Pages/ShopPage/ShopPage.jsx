import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./ShopPage.css";
import axios from "axios";
import ProductCard from "../../Components/products/productCard/ProductCard";
import sectionStyles from "../../Components/shared/SectionStyles.module.css";
import gridStyles from "../../Components/products/ProductGrid.module.css";

// Memoized ProductCard component for better performance
const MemoizedProductCard = React.memo(ProductCard);

function ShopPage() {
  const api = import.meta.env.VITE_API;

  const [products, setProducts] = useState([]);
  const [selectProducts, setSelectProducts] = useState("");
  const [selectCategoryId, setSelectCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [pageCategory, setPageCategory] = useState(1);
  const [pageProduct, setPageProduct] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [getBy, setGetBy] = useState("products");
  const [search, setSearch] = useState("");

  const subdomain = window.location.hostname.split(".")[0];

  // Memoized fetch categories function
  const getCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${api}/categories/subdomain/${subdomain}`
      );
      setCategories(response.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  }, [api, subdomain]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Memoized fetch products function
  const getProducts = useCallback(async (pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      let url = `${api}/products/seller/subdomain/${subdomain}?page=${pageNum}`;
      if (selectProducts === "low" || selectProducts === "high") {
        url += `&sort=${selectProducts}`;
      } else if (selectProducts === "discount") {
        url = `${api}/products/seller/subdomain/${subdomain}/discount?page=${pageNum}`;
      }
      
      const response = await axios.get(url);
      const data = response.data;

      if (pageNum === 1) {
        setProducts(data);
        // Scroll to top when first page loads
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setProducts((prev) => [...prev, ...data]);
      }

      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error fetching products:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [api, subdomain, selectProducts]);

  // Memoized fetch by category function
  const fetchByCategory = useCallback(async (pageNum = 1) => {
    if (!selectCategoryId) return;
    
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const response = await axios.get(
        `${api}/categories/subdomain/${subdomain}/${selectCategoryId}?page=${pageNum}`
      );
      const data = response.data;

      if (pageNum === 1) {
        setProducts(data);
        // Scroll to top when first page loads
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setProducts((prev) => [...prev, ...data]);
      }

      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error fetching products by category:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [api, subdomain, selectCategoryId]);

  // Memoized search function
  const fetchProductsBySearch = useCallback(async (pageNum = 1) => {
    if (!search) return;
    
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const response = await axios.get(
        `${api}/products/search?title=${search}&subdomain=${subdomain}&page=${pageNum}`
      );

      if (pageNum === 1) {
        setProducts(response.data.enrichedProducts);
        // Scroll to top when first page loads
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setProducts((prev) => [...prev, ...response.data.enrichedProducts]);
      }

      if (response.data.enrichedProducts.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error searching products:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [api, subdomain, search]);

  // Memoized products to display (initially 10)
  const displayedProducts = useMemo(() => {
    return products;
  }, [products]);

  // Check if there are more products to load
  const hasMoreProducts = useMemo(() => {
    return products.length > 10;
  }, [products]);

  // fetch products
  useEffect(() => {
    if (getBy === "products") {
      getProducts(1);
    }
  }, [selectProducts, getBy, getProducts]);

  // fetch products by category
  useEffect(() => {
    if (getBy === "categories") {
      fetchByCategory(1);
    }
  }, [selectCategoryId, getBy, fetchByCategory]);

  // fetch products by search
  useEffect(() => {
    if (getBy === "search") {
      fetchProductsBySearch(1);
    }
  }, [search, getBy, fetchProductsBySearch]);

  // handle category selection
  const handleCategorySelect = useCallback((e) => {
    const categoryId = e.target.value;
    setSelectCategoryId(categoryId);
    setProducts([]);
    setPageCategory(1);
    setHasMore(true);
    setGetBy("categories");
  }, []);

  // handle product sorting
  const handleProductSort = useCallback((e) => {
    const sortType = e.target.value;
    setSelectProducts(sortType);
    setSelectCategoryId("");
    setProducts([]);
    setPageProduct(1);
    setHasMore(true);
    setGetBy("products");
  }, []);

  // handle search
  const handleSearch = useCallback((e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setProducts([]);
    setSelectCategoryId("");
    setSelectProducts("");
    setPageSearch(1);
    setHasMore(true);
    setGetBy("search");
  }, []);

  // load more function
  const loadMore = useCallback(() => {
    if (getBy === "categories") {
      const nextPage = pageCategory + 1;
      setPageCategory(nextPage);
      fetchByCategory(nextPage);
    } else if (getBy === "products") {
      const nextPage = pageProduct + 1;
      setPageProduct(nextPage);
      getProducts(nextPage);
    } else if (getBy === "search") {
      const nextPage = pageSearch + 1;
      setPageSearch(nextPage);
      fetchProductsBySearch(nextPage);
    }
  }, [getBy, pageCategory, pageProduct, pageSearch, fetchByCategory, getProducts, fetchProductsBySearch]);

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="shop-hero d-flex flex-column align-items-center mb-5">
        <h1 className="text-4xl font-bold text-center text-uppercase py-3">
          Shop Page
        </h1>
        <p className="text-muted text-center">
          Let's design the place you always imagined.
        </p>
      </div>

      {/* Filters Section */}
      <div className="row mb-5">
        {/* Search */}
        <div className="col-md-6 col-12 mb-4">
          <label className="form-label fw-semibold mb-2">Search</label>
          <input
            className="form-control"
            type="search"
            placeholder="Search by title..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Categories */}
        <div className="col-md-3 col-12 mb-4">
          <label className="form-label fw-semibold mb-2">Categories</label>
          <select
            className="form-select"
            value={selectCategoryId}
            onChange={handleCategorySelect}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Sort */}
        <div className="col-md-3 col-12 mb-4">
          <label className="form-label fw-semibold mb-2">Price</label>
          <select
            className="form-select"
            value={selectProducts}
            onChange={handleProductSort}
          >
            <option value="">All Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>

      {/* Products Section with Loading */}
      <div className="products-section">
        {loading ? (
          // Loading state only for products section
          <div className={sectionStyles.loadingContainer}>
            <div className={sectionStyles.inlineSpinner}></div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className={gridStyles.productGrid}>
              {displayedProducts.map((product) => (
                <div key={product.id}>
                  <MemoizedProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-5">
                <button 
                  onClick={loadMore} 
                  className={sectionStyles.retryBtn}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "View More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <h3 className="text-muted">No products found</h3>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(ShopPage);
