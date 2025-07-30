import React from "react";
import styles from "../../pages/cart/Cart.module.css";

import CartItem from "./CartItem";
function CartTable({
  cartItems = [],
  onDeleteItem,
  onUpdateQuantity,
  updatingItems,
}) {
  return (
    <div>
      <div className={styles.table}>
        <div className={styles.tableHead}>
          <div className="col-5">Product</div>
          <div className="col-3">Quantity</div>
          <div className="col-2">Price</div>
          <div className="col-2">Subtotal</div>
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem
              key={item.id || index}
              item={item}
              onDelete={onDeleteItem}
              onUpdateQuantity={onUpdateQuantity}
              isUpdating={updatingItems.has(item.id)}
            />
          ))
        ) : (
          <div className="text-center p-4">
            <p>No items in cart</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartTable;
