import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/category.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://back-y9z8.onrender.com/api/list-product");
        const products = Array.isArray(res.data) ? res.data : res.data.data;

        // ✅ Get unique categories with a sample product image
        const uniqueCategories = [...new Set(products.map(p => p.category))].map(cat => {
          const sampleProduct = products.find(p => p.category === cat);
          return {
            name: cat,
            img: sampleProduct?.image?.[0] || "/placeholder.jpg",
            count: products.filter(p => p.category === cat).length,
          };
        });

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-section">
      <h2 className="title">Best For Your Categories</h2>
      <p className="subtitle">
        Match items that go well together and stay trendy in modern fashion.
      </p>

      <div className="categories-grid">
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <Link
  key={index}
  to={`/category/${encodeURIComponent(cat.name)}`}
  className="category-card"
>
  <div className="image-container">
    <img src={cat.img} alt={cat.name} />
  </div>
  <h3>{cat.name}</h3>
  <p>{cat.count} Products</p>
</Link>

          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
