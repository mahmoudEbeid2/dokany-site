import "./App.css";
import SupportSection from "./Components/SupportCard/SupportSection";
import ReviewsSection from "./Components/ReviewSection/ReviewsSection";
import ShopPage from "../pages/ShopPage/ShopPage";
import ProductDetailsPage from "./components/products/products/ProductDetailsPage";
import ProtectedRoute from "./components/sign/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import NavBar from "./Components/NavBar/NavBar";
import MyAccount from "./Pages/MyAccount/MyAccount";
import FavList from "./Pages/FavList/FavList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignIn from "./Components/sign/signIn/SignIn";
import SignUp from "./Components/sign/signUp/SignUp";
import Products from "../pages/ShopPage/ShopPage";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;
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
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
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
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
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
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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
