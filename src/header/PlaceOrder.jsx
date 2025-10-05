import React, { useContext, useState } from "react";
import { ShopContext } from "../contect/ShopContext";
import Title from "../contect/Title";
import "../css/Title.css";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const {
    cartItem,
    products,
    backend_url,
    currency,
    getCartAmount,
    setCartItem,
    removeCart,
    token,
  } = useContext(ShopContext);

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const navigate = useNavigate();
  const cart = cartItem || [];

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try { 
      const formData = new FormData(e.target);
      const deliveryInfo = Object.fromEntries(formData.entries()); 
      const orderData = {
        items: cart.map((item) => ({
          itemId: item.itemId,
          quantity: item.quantity,
          size: item.size,
        })),
        amount: getCartAmount(),
        address: deliveryInfo,
        paymentMethod: selectedPayment,
      };

      console.log("Sending Order Data:", orderData); 
      const response = await axios.post(`${backend_url}/api/place`, orderData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      console.log("Backend response:", response.data);

      alert(`Order placed successfully with ${selectedPayment.toUpperCase()}!`); 
      if (typeof setCartItem === "function") setCartItem([]); 
      if (typeof removeCart === "function") {
        cart.forEach((item) => removeCart(item.itemId, item.size));
      }
 
      if (response.data?.order?._id) {
         navigate("/order");
      } else {
        navigate("/order");
      }

    } catch (error) {
      console.error(
        "Axios error:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to place order. Please check console for details.");
    }
  };

  return (
    <div className="placeorder-wrapper">
      <div className="placeorder-container"> 
        <div className="left-panel">
          <Title text1="DELIVERY" text2="INFORMATION" />

          <form className="delivery-form" onSubmit={handlePlaceOrder}>
            <input type="text" name="fullName" placeholder="Full Name" required />
            <input type="email" name="email" placeholder="Email Address" required />
            <input type="tel" name="phone" placeholder="Phone Number" required />
            <textarea name="address" placeholder="Street Address" required></textarea>

            <div className="row">
              <input type="text" name="city" placeholder="City" required />
              <input type="text" name="state" placeholder="State" required />
              <input type="text" name="zip" placeholder="ZIP Code" required />
            </div> 
            <div className="payment-methods">
              <h3>Select Payment Method</h3>

              <label className={`payment-option ${selectedPayment === "card" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={selectedPayment === "card"}
                  onChange={handlePaymentChange}
                />
                <span className="icon">
                  <FaCcVisa style={{ color: "#1a1f71" }} />
                  <FaCcMastercard style={{ color: "#eb001b", marginLeft: "6px" }} />
                </span>
                Card
              </label>

              <label className={`payment-option ${selectedPayment === "paypal" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={selectedPayment === "paypal"}
                  onChange={handlePaymentChange}
                />
                <span className="icon">
                  <FaCcPaypal style={{ color: "#003087" }} />
                </span>
                PayPal
              </label>

              <label className={`payment-option ${selectedPayment === "cod" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedPayment === "cod"}
                  onChange={handlePaymentChange}
                />
                <span className="icon">
                  <FaMoneyBillAlt style={{ color: "#28a745" }} />
                </span>
                Cash on Delivery
              </label>
            </div>

            <button type="submit" className="placeorder-btn" disabled={cart.length === 0}>
              Place the Order
            </button>
          </form>
        </div> 
        <div className="right-panel">
          <Title text1="ORDER" text2="SUMMARY" />

          <div className="cart-summary">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cart.map((item, index) => {
                  const product = products.find((p) => p._id === item.itemId);
                  if (!product) return null;

                  return (
                    <div key={index} className="cart-summary-item">
                      <span>{product.name} (Size: {item.size})</span>
                      <span>{currency} {(product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}

                <hr />

                <div className="cart-summary-total">
                  <strong>Total: {currency} {getCartAmount().toFixed(2)}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
