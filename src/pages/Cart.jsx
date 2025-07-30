import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Cart.module.css";
import CartTable from "../Components/Cart/CartTable";
import Total from "../Components/Cart/Total";
import Loader from "../Components/Loader/Loader";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZG1jdTZ5bzAwMzBseHJtNnZ5dXhhdTAiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2NjIwOTksImV4cCI6MTc1NDI2Njg5OX0.NdwhH2nGMAxvSfrz15dfDXmuWoXbu5SOy78D7BmX5o8";
  useEffect(() => {
    async function fetchCartItems() {
      try {
        setLoading(true);
        setError(null);
        //   get the cart items from the api using custmoer token
        const response = await fetch(`${import.meta.env.VITE_API}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCartItems(data.cart || data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(error.message);
        toast.error("Failed to load!");
      } finally {
        setLoading(false);
      }
    }
    fetchCartItems();
  }, []);

  const deleteCartItem = async (itemId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/cart/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove item from local state
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        toast.success("Item removed!");
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to remove!");
    }
  };

  // api/stripe/create-checkout-session
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `https://dokany-api-production.up.railway.app/api/stripe/checkout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
      } else {
        throw new Error("Failed to initiate checkout");
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      toast.error("Failed to checkout!");
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      // Add item to updating set
      setUpdatingItems((prev) => new Set(prev).add(itemId));

      const response = await fetch(
        `https://dokany-api-production.up.railway.app/cart/update/${itemId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      if (response.ok) {
        // Update item in local state
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
        toast.success("Quantity updated!");
      } else {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update!");
    } finally {
      // Remove item from updating set
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <h1 className={styles.headline}>Cart</h1>

        {error ? (
          <div className="text-center text-danger p-4">
            <p>Error: {error}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : (
          <div
            className={`${styles.cartContent} d-flex flex-column flex-md-row align-items-center`}
          >
            <CartTable
              cartItems={cartItems}
              onDeleteItem={deleteCartItem}
              onUpdateQuantity={updateQuantity}
              updatingItems={updatingItems}
            />
            <Total cartItems={cartItems} onPay={handleCheckout} />
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
