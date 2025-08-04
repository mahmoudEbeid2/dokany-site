import React from "react";
import { ShoppingBag, CreditCard } from "lucide-react";
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

  // Calculate item count
  const itemCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item?.quantity || 1), 0)
    : 0;

  return (
    <div className={styles.totalContainer}>
      <h2 className={styles.totalTitle}>
        <ShoppingBag size={20} style={{ marginRight: '0.5rem', display: 'inline-block' }} />
        Cart Summary
      </h2>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--cart-summary-border)',
        fontSize: '0.9rem',
        color: 'var(--cart-summary-total-label)'
      }}>
        <span>Items ({itemCount})</span>
        <span>${calculatedTotal.toFixed(2)}</span>
      </div>
      
      <div className={styles.totalPrice}>
        <p>Total Amount</p>
        <p>${calculatedTotal.toFixed(2)}</p>
      </div>
      
      <button onClick={onPay} className={styles.cheackOutBtn}>
        <CreditCard size={18} style={{ marginRight: '0.5rem' }} />
        Proceed to Checkout
      </button>
      
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--cart-summary-total-label)',
        textAlign: 'center',
        marginTop: '1rem',
        lineHeight: '1.4'
      }}>
        Secure checkout powered by Stripe
      </div>
    </div>
  );
}
