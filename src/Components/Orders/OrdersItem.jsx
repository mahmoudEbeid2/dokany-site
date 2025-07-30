import React from "react";
import styles from "./orders.module.css";
function OrdersItem({ order }) {
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }
  return (
    <div className={styles.tableRow}>
      <div className="col-5">{`#${order.id}`}</div>
      <div className="col-3">{formatDate(order.date)}</div>
      <div className="col-2">{order.order_status}</div>
      <div className="col-2">${order.total_price}</div>
    </div>
  );
}

export default OrdersItem;
