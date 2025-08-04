import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import useLocation from react-router-dom
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/home/Home";
import SignIn from "./Components/sign/signIn/SignIn";
import SignUp from "./Components/sign/signUp/SignUp";
import Products from "./Components/products/products/Products";
import ShopPage from "./Pages/ShopPage/ShopPage.jsx";
import ProtectedRoute from "./Components/sign/ProtectedRoute";
import MyAccount from "./pages/MyAccount/MyAccount";
import FavList from "./pages/FavList/Favlist";
import Contact from "./pages/contact/contact.jsx";
import Cart from "./pages/cart/Cart";
import ProductDetails from "./Pages/ProductDetails.jsx";
import CategoryProducts from "./Pages/CategoryProducts.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Footer from "./Components/Footer/Footer";

// Redux actions
import {
  setUserInfo,
  setIntialCart,
  setIntialWatchlist,
} from "./features/user/userSlice";

// Theme management
import { useThemeManager } from "./hooks/useThemeManager";

// Styles
import "./App.css";
import { setSellerInfo } from "./features/seller/sellerSlice.js";

const api = import.meta.env.VITE_API;

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const dispatch = useDispatch();

  // تطبيق الثيم
  useThemeManager();

  // Get the current location object
  const location = useLocation();

  const subdomain = window.location.hostname.split(".")[0];
  
  const isSignPage =
    location.pathname === "/signin" || location.pathname === "/signup";
  
  const isLandingPage = location.pathname === "/" && (subdomain === "dockany" || subdomain === "localhost");

  useEffect(() => {
    if (!isAuthenticated) return;

    const controller = new AbortController();

    axios
      .get(`${api}/api/customer/me`, {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(setUserInfo(response.data));
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Fetch error:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`${api}/api/seller/subdomain/${subdomain}`, {
        headers: isAuthenticated ? {
          Authorization: `Bearer ${isAuthenticated}`,
        } : {},
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(setSellerInfo(response.data));
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Fetch error:", error);
          // Set default seller info if API fails
          dispatch(setSellerInfo({
            subdomain: subdomain,
            logo: null
          }));
        }
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, dispatch, subdomain]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const controller = new AbortController();

    axios
      .get(`${api}/cart`, {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(setIntialCart(response.data.cart));
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("Cart request canceled:", error.message);
        } else {
          console.error("Cart fetch error:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const controller = new AbortController();

    axios
      .get(`${api}/favorites`, {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(setIntialWatchlist(response.data));
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("Favorites request canceled");
        } else {
          console.error("Favorites fetch error:", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, dispatch]);

  return (
    <div className="App">
      {!isSignPage && !isLandingPage && <NavBar />}

      <Routes>
        <Route path="/" element={(subdomain === "dockany" || subdomain === "localhost") ? <LandingPage /> : <Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/shoppage" element={<ShopPage />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myaccount"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FavList />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isSignPage && !isLandingPage && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="light"
      />
    </div>
  );
}

export default App;
