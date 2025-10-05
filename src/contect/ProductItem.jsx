import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import "../css/Title.css";

const ProductItem = ({ id, image, name, price,category }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/products/${id}`} className="product-card">
      <div className="product-image">
        <img src={image[0]} alt={name} />
      </div>
      <p className="product-name">{name}</p> 
      <p className="product-price">
        {currency}    {price} 
      </p>
    </Link>

  );
};

export default ProductItem;
