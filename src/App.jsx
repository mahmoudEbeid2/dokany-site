import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar/NavBar";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";
import Home from "./Pages/home/Home";
import SignIn from "./Pages/Auth/signIn/SignIn";
import SignUp from "./Pages/Auth/signUp/SignUp";
import Products from "./components/products/products/Products";
import ShopPage from "./Pages/ShopPage/ShopPage";
import ProductDetailsPage from "./components/products/products/ProductDetailsPage";
import MyAccount from "./Pages/MyAccount/MyAccount";
import FavList from "./Pages/FavList/FavList";

import {
  setUserInfo,
  setIntialCart,
  setIntialWatchlist,
} from "./features/user/userSlice";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  const dispatch = useDispatch();
  // const { userInfo, cart, watchlist } = useSelector((state) => state.user);

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
