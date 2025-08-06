import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../../pages/cart/cart.module.css";

function CartItem({ item, onDelete, onUpdateQuantity, isUpdating }) {
  console.log(item);
  
  // Get original product price
  const originalPrice = item?.product?.price || 0;
  const unitPrice = item?.unit_price || 0;
  const hasDiscount = originalPrice > unitPrice;
  
  return (
    <div className={styles.tableRow}>
      <div className="col-6 d-flex align-items-center gap-4 ">
        <div className={styles.tableImage}>
          <img
            className="w-100"
            src={
              item?.product?.images?.[0]?.image ||
              "https://picsum.photos/150/150"
            }
            alt={item?.product?.title || "Product"}
            onError={(e) => {
              e.target.src = "https://picsum.photos/150/150";
            }}
          />
        </div>
        <div>
          <h3 className={styles.productTitle}>
            {item?.product?.title
              ? item.product.title.split(" ").slice(0, 4).join(" ") + "..."
              : "Product"}
          </h3>
          <button
            className={styles.removeBtn}
            onClick={() => onDelete(item.id)}
          >
            <AiOutlineClose size={15} />
            <span>Remove</span>
          </button>
        </div>
      </div>
      <div className={`d-flex col-2`}>
        <button
          className={styles.quantityBtn}
          disabled={isUpdating}
          onClick={() => {
            const newQuantity = Math.max(1, (item?.quantity || 1) - 1);
            onUpdateQuantity(item.id, newQuantity);
            if (newQuantity === 0) onDelete(item.id);
          }}
        >
          {isUpdating ? "..." : "-"}
        </button>
        <span className={styles.countNumber}>{item?.quantity || 1}</span>
        <button
          className={styles.quantityBtn}
          disabled={isUpdating}
          onClick={() => {
            const newQuantity = (item?.quantity || 1) + 1;
            onUpdateQuantity(item.id, newQuantity);
          }}
        >
          {isUpdating ? "..." : "+"}
        </button>
      </div>
      <div className={`${styles.price} col-2`}>
        {hasDiscount ? (
          <div>
            <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>
              ${originalPrice.toFixed(2)}
            </div>
            <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>
              ${unitPrice.toFixed(2)}
            </div>
          </div>
        ) : (
          <div>${unitPrice.toFixed(2)}</div>
        )}
      </div>
      <div className={`${styles.subtotal} col-2`}>
        {hasDiscount ? (
          <div>
            <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>
              ${(originalPrice * (item?.quantity || 1)).toFixed(2)}
            </div>
            <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>
              ${(item?.final_price || 0).toFixed(2)}
            </div>
          </div>
        ) : (
          <div>${(item?.final_price || 0).toFixed(2)}</div>
        )}
      </div>
    </div>
  );
}

export default CartItem;
