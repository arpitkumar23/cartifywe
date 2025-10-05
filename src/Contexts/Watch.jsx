// CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/category.css";
import Title from "../contect/Title";

const CategoryProducts = () => {
  const { categoryName } = useParams(); // 🟢 get category name from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://back-y9z8.onrender.com/api/list-product");
        const productArray = Array.isArray(res.data) ? res.data : res.data.data;

        // 🟢 filter products by clicked category
        const filtered = productArray.filter(
          (p) => (p.category || "").toLowerCase() === categoryName.toLowerCase()
        );

        setProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch category products:", err);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="category-products-page">
      <div className="watch-header">

         <Title text1={categoryName} text2="Collection" />
         
        <p>Explore our exclusive {categoryName} products.</p>
      </div>

      {products.length > 0 ? (
        <div className="watch-grid">
          {products.map((product) => (
            <div className="watch-card" key={product._id}>
              <Link to={`/products/${product._id}`} className="watch-link">
                <div className="watch-image">
                  <img
                    src={product.image?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                  />
                </div>
                <div className="watch-info">
                  <h3>{product.name}</h3>
                  <p className="price">₹{product.price}</p>
                  <button className="cart-btn">Add to Cart</button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No {categoryName} products found.</p>
      )}
    </div>
  );
};

export default CategoryProducts;
