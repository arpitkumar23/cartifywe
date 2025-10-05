import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import "../css/Title.css";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    subCategory: "",
    size: [],
    bestseller: false,
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("accessToken");

    if (!token || !user || user.role !== 1) {
      toast.error("Unauthorized! Login as admin");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeChange = (e) => {
    const sizes = e.target.value.split(",").map((s) => s.trim());
    setFormData({ ...formData, size: sizes });
  };

  const handleImageChange = (e) => {
    setImages({ ...images, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "size") data.append("size", JSON.stringify(formData.size));
        else data.append(key, formData[key]);
      });

      Object.keys(images).forEach((key) => {
        if (images[key]) data.append(key, images[key]);
      });

      const token = localStorage.getItem("accessToken");

      const res = await axios.post("http://localhost:8000/api/products", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Product added successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        subCategory: "",
        size: [],
        bestseller: false,
      });
      setImages({ image1: null, image2: null, image3: null, image4: null });
      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="admin-panel">
      <aside className="admin-sidebar">
        <h1 className="admin-title">Admin Panel</h1>
        <AdminMenu />
      </aside>

      <main className="admin-content">
        <div className="add-product-container">
          <h2 className="form-title">Add New Product</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="product-form">
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="text" name="subCategory" placeholder="Sub Category" value={formData.subCategory} onChange={handleChange} required />
            <input type="text" placeholder="Sizes (comma separated e.g. S,M,L,XL)" onChange={handleSizeChange} required />
            <label>
              <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange} /> Bestseller
            </label>
            <div>
              <label>Upload Images (max 4)</label>
              <input type="file" name="image1" onChange={handleImageChange} />
              <input type="file" name="image2" onChange={handleImageChange} />
              <input type="file" name="image3" onChange={handleImageChange} />
              <input type="file" name="image4" onChange={handleImageChange} />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddItem;
