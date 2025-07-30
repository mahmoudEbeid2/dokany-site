import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setIntialCart, setIntialWatchlist, } from './features/user/userSlice';
import axios from "axios";

import Home from "./Pages/home/Home";
import SignIn from "./components/sign/signIn/SignIn";
import SignUp from "./components/sign/signUp/SignUp";
import Products from "./components/products/products/Products";
import "./App.css";
import SupportSection from "./Components/SupportCard/SupportSection";
import ReviewsSection from "./Components/ReviewSection/ReviewsSection";
import ShopPage from "../pages/ShopPage/ShopPage";
import ProductDetailsPage from "./components/products/products/ProductDetailsPage";
import ProtectedRoute from "./components/sign/ProtectedRoute";
import { ToastContainer } from "react-toastify";
function App() {
  const isAuthenticated = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { userInfo, cart, watchlist } = useSelector((state) => state.user);

  useEffect(() => {
    axios.get('https://dokany-api-production.up.railway.app/api/customer/me', {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
      },

    }).then((response) => {
      dispatch(setUserInfo(response.data));
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  useEffect(() => {
    axios.get('https://dokany-api-production.up.railway.app/cart', {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
      },
    }).then((response) => {
      dispatch(setIntialCart(response.data.cart));
    }).catch((error) => {
      console.log(error);
    })
  }, []);


  useEffect(() => {
    axios.get('https://dokany-api-production.up.railway.app/favorites', {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
      },
    }).then((response) => {
      dispatch(setIntialWatchlist(response.data));
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  console.log(userInfo);
  console.log(cart);
  console.log(watchlist);

  return (
    <>
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
          path="/products/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductDetailsPage />
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
      {/* <ShopPage/>
      <SupportSection/>
      <ReviewsSection/> */}
    </>
  );
}

export default App;
