import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../css/Title.css";
import AdminMenu from "./AdminMenu";

const ListItem = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("https://back-y9z8.onrender.com/api/list-product", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const productArray = Array.isArray(res.data) ? res.data : res.data.data;
      setProducts(productArray || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`https://back-y9z8.onrender.com/api/remove-product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted successfully!");
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  if (loading) return <p className="loading-text">Loading products...</p>;
  if (!Array.isArray(products) || products.length === 0) return <p className="loading-text">No products found.</p>;

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <h1 className="admin-title">Admin Panel</h1>
        <AdminMenu />
      </aside>
      <main className="admin-content">
        <h2 className="section-title">All Products</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { products.map((product) => (
              <tr key={ product._id }>
                <td>
                  { Array.isArray(product.image) && product.image[0] && (
                    <img src={ product.image[0] } alt={ product.name } className="table-img" />
                  ) }
                </td>
                <td>{ product.name }</td>
                <td>{ product.category }</td>
                <td>{ product.price }</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={ () => handleDelete(product._id) }
                    title="Delete Product"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ListItem;
