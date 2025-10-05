import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../contect/ShopContext";
import "../css/Title.css";
import RelatedData from "../Contexts/RelatedData";
import toast from "react-hot-toast";

const Products = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [user, setUser] = useState(null);

  // Load product
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === id);
    setProduct(foundProduct || null);
    if (foundProduct) {
      setSelectedImage(foundProduct.image[0]);
      setQuantity(1);
      setSelectedSize(null);
    }
  }, [id, products]);

  // Load auth user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);

    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  if (!product) {
    return <h2 className="not-found">Product not found</h2>;
  }

  // Auth-aware Add to Cart
  const handleAddToCart = () => {
  if (!user) {
  toast.error("Please login to add items to cart!");
  navigate("/login");
  return;
}

if (user.role === 1) {
  toast.error("You are an admin, you cannot add items to cart!");
  return;
}

    if (!selectedSize) {
      toast.error("Please select a size before adding to cart ✅");
      return;
    }

    addToCart(id, selectedSize, quantity);
    toast.success(`${product.name} (${selectedSize}) added to cart ✅`);
  };

  // Auth-aware Buy Now
  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to buy products!");
      navigate("/login"); // Redirect to login
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size before buying ✅");
      return;
    }

    toast.success(`Proceeding to checkout with ${product.name} (${selectedSize}) ✅`);
    // Optional: navigate("/checkout");
  };

  return (
    <div className="product-page">
      <div className="product-details-container">
        {/* Product Images */}
        <div className="product-images">
          <img src={selectedImage} alt={product.name} className="main-image" />
          <div className="thumbnail-row">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">
            {currency} {product.price}
          </p>

          {/* Size Selector */}
          {product.size && product.size.length > 0 && (
            <div className="size-selector">
              <h4>Select Size:</h4>
              <div className="sizes">
                {product.size.map((size, index) => (
                  <button
                    key={index}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="product-desc">{product.description}</p>

          {/* Quantity */}
          <div className="quantity-box">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          {/* Buttons */}
          <div className="btn-group">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleBuyNow}>Buy Now</button>
          </div>

          {/* Extra Info */}
          <div className="extra-info">
            <h4>Delivery Options 🚚</h4>
            <p>✔ Free Delivery on orders above ₹500</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ 7 Days Easy Return</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-section">
        <RelatedData
          category={product.category}
          subCategory={product.subCategory}
          currentId={product._id}
        />
      </div>
    </div>
  );
};

export default Products;
