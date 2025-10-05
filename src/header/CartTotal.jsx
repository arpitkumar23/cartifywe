import React, { useContext } from 'react'
import { ShopContext } from '../contect/ShopContext'
import Title from '../contect/Title'
import '../css/Title.css'  
import { Navigate } from 'react-router-dom'

const CartTotal = () => {
  const { currency, delivery_fees, getCartAmount } = useContext(ShopContext);
 
  const subtotal = getCartAmount();
  const total = subtotal + delivery_fees;

  return (
    <div className="cart-total-wrapper">
      <Title text1={'CART'} text2={'TOTAL'} />

      <div className="cart-total-container">
        <div className="cart-total-row">
          <span>Subtotal:</span>
          <span>{currency}{subtotal}</span>
        </div>
        <div className="cart-total-row">
          <span>Delivery Fee:</span>
          <span>{currency}{delivery_fees}</span>
        </div>
        <hr />
        <div className="cart-total-row total">
          <span>Total:</span>
          <span>{currency}{total}</span>
        </div>
 
      </div>
    </div>
  )
}

export default CartTotal
