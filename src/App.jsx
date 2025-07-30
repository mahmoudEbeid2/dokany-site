import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/home/Home";
import SignIn from "./components/sign/signIn/SignIn";
import SignUp from "./components/sign/signUp/SignUp";
import Products from "./components/products/products/Products";

import ProductDetailsPage from "./components/products/products/ProductDetailsPage";
import ProtectedRoute from "./components/sign/ProtectedRoute";
import { ToastContainer } from "react-toastify";
function App() {
  const isAuthenticated = localStorage.getItem("token");

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

        {/* لو دخل مسار مش موجود */}
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
