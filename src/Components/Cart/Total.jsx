import React from "react";
import styles from "../../pages/cart/cart.module.css";

export default function Total({ cartItems = [], onPay }) {
  // Calculate total from cart items
  const calculatedTotal = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => {
      const itemTotal =
        item?.final_price * (1 - (item?.product?.discount) / 100) ||
        (item?.quantity || 1) *
        (item?.unit_price || item?.product?.price || 0);
      return sum + itemTotal;
    }, 0)
    : 0;


  return (
    <div className={styles.totalContainer}>
      <h2 className={styles.totalTitle}>Cart summary</h2>
      <div className={styles.totalPrice}>
        <p>Total</p>
        <p>${calculatedTotal.toFixed(2)}</p>
      </div>
      <button onClick={onPay} className={styles.cheackOutBtn}>
        Checkout
      </button>
    </div>
  );
}
