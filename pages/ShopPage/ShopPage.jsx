import React, { useEffect, useState } from "react";
import "./ShopPage.css";
import axios from "axios";
import ProductCard from "../../src/components/products/productCard/ProductCard";
import { set } from "zod";
function ShopPage() {

  const api = import.meta.env.VITE_API;

  const [products, setProducts] = useState([]);
  const [selectPtoducts, setSelectPtoducts] = useState("");
  const [selectCategoryId, setSelectCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [pageCategory, setPageCategory] = useState(1);
  const [pageProduct, setPageProduct] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [getBy, setGetBy] = useState("products");
  const [search, setSearch] = useState("");
  // /products/seller/subdomain/mohamed-seller
  let subdomain = "mohamed-seller";

  useEffect(() => {
    const getCategories = async () => {
      axios
        .get(`${api}/categories/subdomain/${subdomain}`)
        .then((res) => {
          setCategories(res.data);
          console.log(res.data); //kkkk
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCategories();
  }, []);
  // fetch products
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        //    products/seller/subdomain/mohamed-seller?sort=low&page=2
        let url = `${api}/products/seller/subdomain/${subdomain}?page=${pageProduct}`;
        if (selectPtoducts === "low" || selectPtoducts === "high") {
          url += `&sort=${selectPtoducts}`;
        } else if (selectPtoducts === "discount") {
          url = `${api}/products/seller/subdomain/${subdomain}/discount?page=${pageProduct}`;
        }
        const response = await axios.get(url);
        // setProducts((prevProducts) => [...prevProducts, ...response.data]);
        const data = response.data;
        if (pageProduct === 0) {
          setPageProduct(1);
        } else if (pageProduct === 1) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }
        if (data.length === 0) {
          setHasMore(false);
        }
        // setProducts(response.data);
        console.log("products", response.data); //kkkk
      } catch (err) {
        console.log("error", err);
      }
      setLoading(false);
    };

    getProducts();
  }, [selectPtoducts, pageProduct]);

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
        console.log("products", response.data); //kkkk
        setLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchByCategory();
  }, [selectCategoryId, pageCategory]);

  const handelSelect = (e) => {
    const categoryId = e.target.value;
    setSelectCategoryId(categoryId);
    // setSelectPtoducts("");
    setProducts([]);
    setPageCategory(1);
    setHasMore(true);
    setGetBy("categories");

    // try{

    //     if(categoryId){
    //         axios.get(`${api}/categories/subdomain/${subdomain}/${categoryId}?page=${page}`).then((res) => {
    //             setProducts(res.data);
    //             console.log("products",res.data);//kkkk
    //         }).catch((err) => {
    //             console.log("error",err);
    //         });
    //     }
    // }catch(err){
    //     console.log("error",err);
    // }
  };
  // handel select product
  const handelSelectProduct = (e) => {
    const products = e.target.value;
    setSelectPtoducts(products);
    setSelectCategoryId("");
    setProducts([]);
    setPageProduct(1);
    setHasMore(true);
    setGetBy("products");
  };
  // handel search
  const handelSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    setProducts([]);
    setSelectCategoryId("");
    setSelectPtoducts("");
    setPageSearch(1);
    setHasMore(true);

    setGetBy("search");
  };
  useEffect(() => {
    const fetchProductsBySearch = async () => {
      setLoading(true);
      if (!search) return;
      try {
        //    products/search?title=iphone
        const response = await axios.get(
          `${api}/products/search?title=${search}&subdomain=${subdomain}&page=${pageSearch}`
        );

        // setProducts(response.data.enrichedProducts);
        if (pageSearch === 1) {
          setProducts(response.data.enrichedProducts);
        }else{
            
            setProducts((prev) => [...prev, ...response.data.enrichedProducts]);
        }
        if (response.data.enrichedProducts.length === 0) {
          setHasMore(false);
        }
        console.log("search products", response.data); //kkkk
      } catch (err) {
        console.log("error", err);
      }
      setLoading(false);
    };
    fetchProductsBySearch();
  }, [search, pageSearch]);
  return (
    <div className="container">
      <div className="shop-hero d-flex flex-column align-items-center">
        <p>
          {" "}
          <span className="text-muted">Home &gt; </span> Shop
        </p>
        <h1 className="fw-bold mb-3">Shop Page</h1>
        <p className="text-muted">
          Let’s design the place you always imagined.{" "}
        </p>
      </div>

      {/* categories */}
      <div className="row">
        {/* search */}
        <div className="search col-md-6 col-12 my-4">
          <p className="filter-text">Search</p>

          <input
            className="form-control me-2 filter-input"
            type="search"
            placeholder="Search by title"
            value={search}
            onChange={handelSearch}
          />
        </div>
        <div className="categories col-md-3 col-12 my-4">
          <p className="filter-text">Categories</p>
          <select
            className="form-select filter-input"
            value={selectCategoryId}
            onChange={handelSelect}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="categories col-md-3 col-12 my-4">
          <p className="filter-text">Price</p>
          <select
            className="form-select filter-input"
            value={selectPtoducts}
            onChange={handelSelectProduct}
          >
            <option value="">All Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
            <option value="discount">descount</option>
          </select>
        </div>
      </div>
      {/* products */}
      <div className="products container">
        <div className="row">
          {products?.map((product) => (
              <div className="card col-sm-6 col-md-3" key={product.id}>
            <ProductCard
                          product={product}
                          favoriteItem={[]}
                          isJustIn={false}
                        />
                        </div>
            // <div className="card col-sm-6 col-md-3" key={product.id}>
            //   <img
            //     src={product?.images[0].image}
            //     className="card-img-top"
            //     alt="..."
            //   />
            //   <div className="card-body">
            //     <h5 className="card-title fw-bold">{product.title}</h5>
            //     <p
            //       className="card-text "
            //       style={{ height: "100px", overflow: "hidden" }}
            //     >
            //       {product.description}
            //     </p>
            //     <p className="card-text">{product.price}</p>
            //   </div>
            // </div>
          ))}
        </div>

        {hasMore && !loading && (
            <div className="col-12 d-flex justify-content-center mt-5">

          <button
            onClick={() => {
              if (getBy === "categories") {
                setPageCategory(pageCategory + 1);
              } else if (getBy === "products") {
                setPageProduct(pageProduct + 1);
              } else if (getBy === "search") {
                setPageSearch(pageSearch + 1);
              }
            }}
            className=" btn-primary2"
          >
            Load More
          </button>
            </div>
        )}

        {loading && (
          <p className="text-center mt-2 text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
