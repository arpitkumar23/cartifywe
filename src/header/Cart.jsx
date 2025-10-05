import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contect/ShopContext";
import Title from "../contect/Title";
import '../css/Title.css';
import { FaTrash } from "react-icons/fa";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { products, currency, cartItem, updatequantity, removeCart, navigate, token, getUserCart } = useContext(ShopContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(cartItem || []);
  }, [cartItem]);
  useEffect(() => {
    if (token) getUserCart(token);
  }, [token]);

  useEffect(() => {
    const handleUserUpdate = () => {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) getUserCart(storedToken);
    };
    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  const increment = (item) => updatequantity(item.itemId, item.size, item.quantity + 1);
  const decrement = (item) => updatequantity(item.itemId, item.size, Math.max(0, item.quantity - 1));

  return (
    <div className="cart-container">
      <Title text1="YOUR" text2="CART" />

      { cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          { cart.map(item => {
            const productData = products.find(p => p._id === item.itemId);
            if (!productData) return null;

            return (
              <div key={ item.itemId + item.size } className="cart-item">
                <img src={ productData.image[0] } alt={ productData.name } />

                <div className="cart-item-details">
                  <h3>{ productData.name }</h3>
                  <p>Size: { item.size }</p>
                  <div className="quantity-control">
                    <button onClick={ () => decrement(item) }>-</button>
                    <span>{ item.quantity }</span>
                    <button onClick={ () => increment(item) }>+</button>
                  </div>
                </div>

                <p className="cart-price">
                  { currency } { productData.price * item.quantity }
                </p>

                <button className="trash-btn" onClick={ () => removeCart(item.itemId, item.size) }>
                  <FaTrash />
                </button>
              </div>
            );
          }) }
        </div>
      ) }

      { cart.length > 0 && (
        <div className="cart-checkout">
          <CartTotal />
          <button onClick={ () => navigate('/place-order') } className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      ) }
    </div>
  );
};

export default Cart;
