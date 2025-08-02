import React, { useEffect, useState } from "react";
import "./ShopPage.css";
import axios from "axios";
import ProductCard from "../../Components/products/productCard/ProductCard";
import Loader from "../../Components/Loader/Loader";

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
  const [getBy, setGetBy] = useState("products");
  const [search, setSearch] = useState("");
  
  const subdomain = window.location.hostname.split('.')[0] ;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`${api}/categories/subdomain/${subdomain}`);
        setCategories(response.data);
      } catch (err) {
        console.log("Error fetching categories:", err);
      }
    };
    getCategories();
  }, [subdomain]);

  // fetch products
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        let url = `${api}/products/seller/subdomain/${subdomain}?page=${pageProduct}`;
        if (selectProducts === "low" || selectProducts === "high") {
          url += `&sort=${selectProducts}`;
        } else if (selectProducts === "discount") {
          url = `${api}/products/seller/subdomain/${subdomain}/discount?page=${pageProduct}`;
        }
        const response = await axios.get(url);
        const data = response.data;
        
        if (pageProduct === 1) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }
        
        if (data.length === 0) {
          setHasMore(false);
        }
      } catch (err) {
        console.log("Error fetching products:", err);
      }
      setLoading(false);
    };

    getProducts();
  }, [selectProducts, pageProduct, subdomain]);

  // fetch products by category
  useEffect(() => {
    const fetchByCategory = async () => {
      setLoading(true);
      if (!selectCategoryId) return;
      try {
        const response = await axios.get(
          `${api}/categories/subdomain/${subdomain}/${selectCategoryId}?page=${pageCategory}`
        );
        const data = response.data;
        
        if (pageCategory === 1) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }

        if (data.length === 0) {
          setHasMore(false);
        }
        setLoading(false);
      } catch (err) {
        console.log("Error fetching products by category:", err);
      }
    };
    fetchByCategory();
  }, [selectCategoryId, pageCategory, subdomain]);

  // handle category selection
  const handleCategorySelect = (e) => {
    const categoryId = e.target.value;
    setSelectCategoryId(categoryId);
    setProducts([]);
    setPageCategory(1);
    setHasMore(true);
    setGetBy("categories");
  };

  // handle product sorting
  const handleProductSort = (e) => {
    const sortType = e.target.value;
    setSelectProducts(sortType);
    setSelectCategoryId("");
    setProducts([]);
    setPageProduct(1);
    setHasMore(true);
    setGetBy("products");
  };

  // handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setProducts([]);
    setSelectCategoryId("");
    setSelectProducts("");
    setPageSearch(1);
    setHasMore(true);
    setGetBy("search");
  };

  // fetch products by search
  useEffect(() => {
    const fetchProductsBySearch = async () => {
      setLoading(true);
      if (!search) return;
      try {
        const response = await axios.get(
          `${api}/products/search?title=${search}&subdomain=${subdomain}&page=${pageSearch}`
        );

        if (pageSearch === 1) {
          setProducts(response.data.enrichedProducts);
        } else {
          setProducts((prev) => [...prev, ...response.data.enrichedProducts]);
        }
        
        if (response.data.enrichedProducts.length === 0) {
          setHasMore(false);
        }
      } catch (err) {
        console.log("Error searching products:", err);
      }
      setLoading(false);
    };
    fetchProductsBySearch();
  }, [search, pageSearch, subdomain]);

  // load more function
  const loadMore = () => {
    if (getBy === "categories") {
      setPageCategory(pageCategory + 1);
    } else if (getBy === "products") {
      setPageProduct(pageProduct + 1);
    } else if (getBy === "search") {
      setPageSearch(pageSearch + 1);
    }
  };

  if (loading && products.length === 0) {
    return <Loader />;
  }

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="shop-hero d-flex flex-column align-items-center mb-5">
        <h1 className="text-4xl font-bold text-center text-uppercase py-3">Shop Page</h1>
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

      {/* Products Grid */}
      <div className="products-section">
        {products.length > 0 ? (
          <>
            <div className="row g-3">
              {products.map((product) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && !loading && (
              <div className="text-center mt-5">
                <button
                  onClick={loadMore}
                  className="btn btn-dark px-4 py-2"
                >
                  Load More
                </button>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="text-center mt-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          !loading && (
            <div className="text-center py-5">
              <h3 className="text-muted">No products found</h3>
              <p className="text-muted">Try adjusting your search or filters</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ShopPage;
