import React, { useEffect, useState } from "react";
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
import MyAccount from "./Pages/MyAccount/MyAccount";
import AccountForm from "./Components/MyAccount/AccountForm";
import Orders from "./Components/Orders/Orders";
import FavList from "./Pages/FavList/Favlist";
import Contact from "./Pages/contact/contact.jsx";
import Cart from "./Pages/cart/Cart";
import ProductDetails from "./Pages/ProductDetails.jsx";
import CategoryProducts from "./Pages/CategoryProducts.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import LegalPages from "./Pages/LegalPages";
import LandingPage from "./Pages/LandingPage.jsx";
import Footer from "./Components/Footer/Footer";
import ResetPassword from "./Components/sign/resetPassword/ResetPassword";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
import PaymentFailure from "./Pages/PaymentFailure.jsx";
import EmailVerification from "./Pages/EmailVerification.jsx";
import VerifyEmail from "./Components/sign/verifyEmail/VerifyEmail.jsx";
// Redux actions
import {
  setUserInfo,
  setIntialCart,
  setIntialWatchlist,
} from "./features/user/userSlice";

// Theme management
import { useThemeManager } from "./hooks/useThemeManager";

// Performance monitoring
import { startMeasure, endMeasure } from "./utils/performanceMonitor";

// Styles
import "./App.css";
import { setSellerInfo } from "./features/seller/sellerSlice.js";
import { use } from "react";

const api = import.meta.env.VITE_API;

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [themeLoaded, setThemeLoaded] = useState(false);
  const { sellerInfo } = useSelector((state) => state.seller);

  // Change Title Dynamic 
  useEffect(() => {
    const subdomainTitle = (sellerInfo?.subdomain && !["localhost", "127", "dokaney"].includes(sellerInfo.subdomain.toLowerCase()))
      ? sellerInfo.subdomain.charAt(0).toUpperCase() + sellerInfo.subdomain.slice(1) + " Store | "
      : "";

    const pageTitle = `${subdomainTitle}Dokany Platform`;

    document.title = pageTitle
  }, [sellerInfo?.subdomain]);


  // Show loader for fixed duration to ensure it's visible on all themes
  useEffect(() => {
    // Always show loader for 3 seconds to ensure visibility
    const timer = setTimeout(() => {
      setThemeLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Apply theme manager immediately
  useThemeManager();

  // Get the current location object
  const location = useLocation();

  const subdomain = window.location.hostname.split(".")[0];

  const isSignPage =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/reset-password";

  const isLandingPage =
    location.pathname === "/" &&
    (subdomain === "localhost" || subdomain === "127" || subdomain === "dokaney" || subdomain === "www");

  // Performance monitoring for app initialization
  useEffect(() => {
    startMeasure('app_initialization', 'app');

    return () => {
      endMeasure('app_initialization', 'app');
    };
  }, []);

  // Performance monitoring for route changes
  useEffect(() => {
    startMeasure('route_change', 'navigation', { path: location.pathname });

    return () => {
      endMeasure('route_change', 'navigation', { path: location.pathname });
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const controller = new AbortController();

    startMeasure('user_info_fetch', 'api');
    axios
      .get(`${api}/api/customer/me`, {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(setUserInfo(response.data));
        endMeasure('user_info_fetch', 'api', { success: true });
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Fetch error:", error);
          endMeasure('user_info_fetch', 'api', { success: false, error: error.message });
        }
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const controller = new AbortController();

    startMeasure('seller_info_fetch', 'api');
    axios
      .get(`${api}/api/seller/subdomain/${subdomain}`, {
        headers: isAuthenticated
          ? {
            Authorization: `Bearer ${isAuthenticated}`,
          }
          : {},
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(setSellerInfo(response.data));
        endMeasure('seller_info_fetch', 'api', { success: true });
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Fetch error:", error);
          endMeasure('seller_info_fetch', 'api', { success: false, error: error.message });
          // Set default seller info if API fails
          dispatch(
            setSellerInfo({
              subdomain: subdomain,
              logo: null,
            })
          );
        }
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, dispatch, subdomain]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const controller = new AbortController();

    startMeasure('cart_fetch', 'api');
    axios
      .get(`${api}/cart`, {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(setIntialCart(response.data.cart));
        endMeasure('cart_fetch', 'api', { success: true });
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("Cart request canceled:", error.message);
        } else {
          console.error("Cart fetch error:", error);
          endMeasure('cart_fetch', 'api', { success: false, error: error.message });
        }
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const controller = new AbortController();

    startMeasure('favorites_fetch', 'api');
    axios
      .get(`${api}/favorites`, {
        headers: {
          Authorization: `Bearer ${isAuthenticated}`,
        },
        signal: controller.signal,
      })
      .then((response) => {
        dispatch(setIntialWatchlist(response.data));
        endMeasure('favorites_fetch', 'api', { success: true });
      })
      .catch((error) => {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("Favorites request canceled");
        } else {
          console.error("Favorites fetch error:", error);
          endMeasure('favorites_fetch', 'api', { success: false, error: error.message });
        }
      });

    return () => {
      controller.abort();
    };
  }, [isAuthenticated, dispatch]);

  // Show loading screen until theme is loaded and applied
  console.log('Theme loaded state:', themeLoaded);
  if (!themeLoaded) {
    console.log('Showing loader...');
    return (
      <div className="app-theme-loader">
        <div className="app-theme-loader-content">
          <div className="app-theme-loader-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {!isSignPage && !isLandingPage && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={
            subdomain === "localhost" || subdomain === "127" || subdomain === "dokaney" || subdomain === "www" ? (
              <LandingPage />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal" element={<LegalPages />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/shoppage" element={<ShopPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/payment/success"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/failure"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PaymentFailure />
            </ProtectedRoute>
          }
        />

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
        >
          <Route index element={<AccountForm />} />
          <Route path="orders" element={<Orders />} />
        </Route>
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
