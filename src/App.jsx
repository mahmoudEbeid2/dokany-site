import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import NavBar from "./Components/NavBar/NavBar";
import Home from "./pages/home/Home";
import SignIn from "./Components/sign/signIn/SignIn";
import SignUp from "./Components/sign/signUp/SignUp";
import Products from "./components/products/products/Products";
import ShopPage from "../pages/ShopPage/ShopPage";
import ProductDetailsPage from "./Components/products/products/ProductDetailsPage";
import ProtectedRoute from "./Components/sign/ProtectedRoute";
import MyAccount from "./pages/MyAccount/MyAccount";
import FavList from "./pages/FavList/Favlist";
import Contact from "./pages/contact/contact.jsx";
import Cart from "./pages/cart/Cart";

// Redux actions
import {
  setUserInfo,
  setIntialCart,
  setIntialWatchlist,
} from "./features/user/userSlice";

// Styles
import "./App.css";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { userInfo, cart, watchlist } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("https://dokany-api-production.up.railway.app/api/customer/me", {
          headers: {
            Authorization: `Bearer ${isAuthenticated}`,
          },
        })
        .then((response) => {
          dispatch(setUserInfo(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("https://dokany-api-production.up.railway.app/cart", {
          headers: {
            Authorization: `Bearer ${isAuthenticated}`,
          },
        })
        .then((response) => {
          dispatch(setIntialCart(response.data.cart));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("https://dokany-api-production.up.railway.app/favorites", {
          headers: {
            Authorization: `Bearer ${isAuthenticated}`,
          },
        })
        .then((response) => {
          dispatch(setIntialWatchlist(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shoppage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductDetailsPage />
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

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
