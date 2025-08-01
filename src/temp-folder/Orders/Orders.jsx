import React, { useEffect } from "react";
import styles from "./orders.module.css";
import { useState } from "react";
import OrdersItem from "./OrdersItem";
function Orders() {
  const [orders, setOrders] = useState([]);
  // /api/orders/customer by token
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZG1jdTZ5bzAwMzBseHJtNnZ5dXhhdTAiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2NjIwOTksImV4cCI6MTc1NDI2Njg5OX0.NdwhH2nGMAxvSfrz15dfDXmuWoXbu5SOy78D7BmX5o8";
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/api/orders/customer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Orders History</h1>
      <div className={styles.tableHead}>
        <div className="col-5">Number ID</div>
        <div className="col-3">Dates</div>
        <div className="col-2">Status</div>
        <div className="col-2">Price</div>
      </div>

      {orders.map((order) => (
        <OrdersItem key={order.id} order={order} />
      ))}
    </div>
  );
}

export default Orders;
