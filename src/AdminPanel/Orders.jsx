import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../contect/ShopContext";
import Title from "../contect/Title";
import "../css/Title.css";

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
        const response = await axios.get(`${backend_url}/api/adminOrder`, {
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

  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${backend_url}/api/status`,
        { orderId, status: newStatus },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data.success) {
        // ✅ केवल उसी order का status update करो (बिना reload)
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  if (loading) return <p className="loading-text">Loading your orders...</p>;
  if (error) return <p className="error-text">{ error }</p>;

  return (
    <div className="orders-wrapper">
      <Title text1="MY" text2="ORDERS" />

      { orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          { orders.map((order) => (
            <div key={ order._id } className="order-card">
              <div className="order-header">
                <h3>Order ID: { order._id }</h3>
                <p>{ new Date(order.date).toLocaleString() }</p>
                <p>
                  Payment: { order.paymentMethod } | Status:{ " " }
                  <span className={ order.payment ? "paid" : "pending" }>
                    { order.payment ? "Paid" : "Pending" }
                  </span>
                </p>
                {/* ✅ Status dropdown */ }
                <p>
                  <select value={ order.status } onChange={ (e) => statusHandler(e, order._id) }>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                </p>



                { order.address && (
                  <div className="order-address">
                    <h4>Delivery Address:</h4>
                    <p>{ order.address.name }</p>
                    <p> Street:
                      { order.address.street }  { order.address.state } - { order.address.pincode }
                    </p>
                    <p>PINCODE : { order.address.zip }</p>
                    <p>STATE : { order.address.state }</p>
                    <p> CITY: { order.address.city }</p>
                    <p>PHONE NO: { order.address.phone }</p>



                  </div>
                ) }
              </div>




              <div className="order-items">
                { order.items.map((item, index) => {
                  const product = item.itemId;
                  if (!product) return null;



                  return (
                    <div key={ index } className="order-item-card">
                      <img
                        src={ Array.isArray(product.image) ? product.image[0] : product.image }
                        alt={ product.name }
                        className="order-item-image"
                      />
                      <div className="order-item-info">
                        <h4>{ product.name }</h4>
                        <p>{ product.description }</p>
                        <p>
                          Qty: { item.quantity } | Size: { item.size }
                        </p>
                        <p className="price">
                          { currency } { (product.price * item.quantity).toFixed(2) }
                        </p>
                        <p className="category">
                          { product.category } { product.subCategory && `> ${product.subCategory}` }
                        </p>
                        { product.bestseller && <span className="bestseller">🔥 Bestseller</span> }
                      </div>
                    </div>
                  );
                }) }
              </div>

              <div className="order-total">
                <strong>Total: { currency } { order.amount.toFixed(2) }</strong>
              </div>
            </div>
          )) }
        </div>
      ) }
    </div>
  );
};

export default Order;
