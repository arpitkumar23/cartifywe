import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Title.css";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaShoppingCart,
  FaEdit,
  FaSignOutAlt,
  FaBox
} from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("https://back-y9z8.onrender.com/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-state">
          <FaUser className="error-icon" />
          <h3>No Profile Data Found</h3>
          <p>Unable to load your profile information.</p>
          <button onClick={fetchProfile} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="user-avatar">
            <div className="avatar-circle">
              <FaUser className="avatar-icon" />
            </div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span className={`user-badge ${user.role === 1 ? 'admin' : 'user'}`}>
              {user.role === 1 ? 'Administrator' : 'Premium User'}
            </span>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser className="nav-icon" />
              <span>Profile Info</span>
            </button>
            
          </nav>

          <div className="sidebar-actions">
            <button className="action-btn edit-btn">
              <FaEdit />
              Edit Profile
            </button>
            <button className="action-btn logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {activeTab === "profile" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>Profile Information</h2>
                <p>Manage your personal information and preferences</p>
              </div>

              <div className="info-grid">
                <div className="info-card">
                  <div className="info-icon">
                    <FaUser />
                  </div>
                  <div className="info-content">
                    <label>Full Name</label>
                    <h3>{user.name}</h3>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <label>Email Address</label>
                    <h3>{user.email}</h3>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaUserShield />
                  </div>
                  <div className="info-content">
                    <label>Account Type</label>
                    <h3>{user.role === 1 ? "Administrator" : "Premium User"}</h3>
                    <span className="role-description">
                      {user.role === 1 
                        ? "Full access to all features" 
                        : "Standard user privileges"
                      }
                    </span>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="info-content">
                    <label>Member Since</label>
                    <h3>{new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</h3>
                    <span className="join-duration">
                      {Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} days with us
                    </span>
                  </div>
                </div>
              </div>
 
            </div>
          )}

          {activeTab === "cart" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>Shopping Cart</h2>
                <p>Items you've added to your cart</p>
              </div>

              {user.cartData && user.cartData.length > 0 ? (
                <div className="cart-items">
                  {user.cartData.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="item-image">
                        <FaBox className="item-placeholder" />
                      </div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <div className="item-meta">
                          <span className="size">Size: {item.size}</span>
                          <span className="quantity">Qty: {item.quantity}</span>
                          <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button className="remove-btn">Remove</button>
                    </div>
                  ))}
                  <div className="cart-summary">
                    <div className="total-items">
                      Total Items: {user.cartData.length}
                    </div>
                    <button className="checkout-btn">Proceed to Checkout</button>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <FaShoppingCart className="empty-icon" />
                  <h3>Your Cart is Empty</h3>
                  <p>Start shopping to add items to your cart</p>
                  <button className="shop-btn">Start Shopping</button>
                </div>
              )}
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default Profile;