import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, AlertCircle, RefreshCw } from "lucide-react";
import styles from "./cart.module.css";
import CartTable from "../../Components/Cart/CartTable";
import Total from "../../Components/Cart/Total";
import Loader from "../../Components/Loader/Loader";
import { setIntialCart, deleteFromCart, addToCart, removeFromCart, updateCart } from "../../features/user/userSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const token = localStorage.getItem("token");

  console.log("Cart items:", cart);
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
        dispatch(deleteFromCart(itemId));
        toast.success("Item removed from cart!");
      } else {
        throw new Error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to remove item!");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/stripe/checkout`,
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
      toast.error("Failed to proceed to checkout!");
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      // setUpdatingItems((prev) => new Set(prev).add(itemId));

      const response = await fetch(
        `${import.meta.env.VITE_API}/cart/update/${itemId}`,
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
        const data = await response.json();
        if (newQuantity === 0) {
          dispatch(deleteFromCart(data.id));
        } else {
          console.log(data);
          dispatch(updateCart({ product_id: data.product_id, quantity: data.quantity,final_price: data.final_price }));
        }
        toast.success("Quantity updated successfully!");
      } else {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity!");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  if (!cart) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <ShoppingCart size={40} style={{ marginRight: '1rem', display: 'inline-block' }} />
        Shopping Cart
      </div>

      {error ? (
        <div className={styles.errorContainer}>
          <AlertCircle size={48} color="#dc3545" />
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button
            className={styles.retryBtn}
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      ) : cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <ShoppingCart size={64} color="#6c7275" />
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <CartTable
            cartItems={cart}
            onDeleteItem={deleteCartItem}
            onUpdateQuantity={updateQuantity}
            updatingItems={updatingItems}
          />
          <Total cartItems={cart} onPay={handleCheckout} />
        </div>
      )}
    </div>
  );
}

export default Cart;
