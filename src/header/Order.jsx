import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../contect/ShopContext";
import Title from "../contect/Title"; 

const Order = () => {
  const { backend_url, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("You must be logged in to view orders");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${backend_url}/api/userOrders`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          setError(response.data.message || "No orders found");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backend_url]);

  if (loading) return <p className="loading-text">Loading your orders...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="orders-wrapper">
      <Title text1="MY" text2="ORDERS" />

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) =>
            order.items.map((item, index) => {
              const product = item.itemId;
              if (!product) return null;

              return (
                <div key={index} className="order-row">
                  {/* Left - product info */}
                  <div className="order-left">
                    <img
                      src={Array.isArray(product.image) ? product.image[0] : product.image}
                      alt={product.name}
                      className="order-image"
                    />
                    <div className="order-details">
                      <h3>{product.name}</h3>
                      <p>
                        {currency}
                        {product.price} &nbsp; Quantity: {item.quantity} &nbsp; Size: {item.size}
                      </p>
                      <p>Date: {new Date(order.date).toDateString()}</p>
                      <p>Payment: {order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Right - status + track order */}
                  <div className="order-right">
                    <span
                      className={`status-dot ${
                        order.status === "Delivered"
                          ? "delivered"
                          : order.status === "Packing"
                          ? "packing"
                          : "pending"
                      }`}
                    ></span>
                    <span className="status-text">{order.status}</span>
                    
                  </div>

                   <button className="track-btn">Track Order</button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
