import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/Title.css";
import { ShopContext } from "../contect/ShopContext";
import axios from "axios";
import Title from "../contect/Title";

const Collection = () => {
  const { search } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 🟢 Added loading state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");

  // 🔁 Fetch products from backend
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("https://back-y9z8.onrender.com/api/list-product", {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "application/json",
          },
        });

        const productArray = Array.isArray(res.data) ? res.data : res.data.data;
        setProducts(productArray || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // 🏷️ Extract categories and subcategories
  const categories = [...new Set(products.map((p) => p.category))];
  const subCategories = [...new Set(products.map((p) => p.subCategory))];

  // ✅ Toggle category filter
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // ✅ Toggle subcategory filter
  const toggleSubCategory = (sub) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  // 🔍 Filter & sort products
  const filteredProducts = products
    .filter((p) => {
      const matchCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchSubCategory =
        selectedSubCategories.length === 0 || selectedSubCategories.includes(p.subCategory);
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSubCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="collection-container">
      {/* 🔲 Filter Sidebar */}
      <div className="filter-sidebar">
        <h3>Filters</h3>

        <div className="filter-section">
          <h4>Category</h4>
          {categories.map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h4>Sub Category</h4>
          {subCategories.map((sub) => (
            <label key={sub}>
              <input
                type="checkbox"
                checked={selectedSubCategories.includes(sub)}
                onChange={() => toggleSubCategory(sub)}
              />
              {sub}
            </label>
          ))}
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="product-grid">
        <div className="grid-header">
          <Title text1="ALL" text2="COLLECTION" />
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* ⏳ Loading Indicator */}
        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="product-list">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="product-card"
              >
                <img
                  src={product.image?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
