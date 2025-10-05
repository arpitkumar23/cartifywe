import React, { useState, useEffect, useRef, useContext } from "react";
import "../css/Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { ShopContext } from "./ShopContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getCartCount } = useContext(ShopContext);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("userUpdated", loadUser);
    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    setUser(null);
    setMenuOpen(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">🛒</div>
            <div className="logo-text">
              <span className="logo-main">CARTIFY</span>
              <span className="logo-tagline">Shop Smart</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            HOME
          </NavLink>
          <NavLink to="/Collection" className="nav-link" onClick={() => setMenuOpen(false)}>
            COLLECTION
          </NavLink>
          <NavLink to="/About" className="nav-link" onClick={() => setMenuOpen(false)}>
            ABOUT
          </NavLink>

          {/* Mobile Profile Section */}
          {user && (
            <div className="mobile-profile">
              <NavLink to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                My Profile
              </NavLink>
              {user.role === 1 && (
                <NavLink to="/adminPanel" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Admin Panel
                </NavLink>
              )}
              <NavLink to="/order" className="nav-link" onClick={() => setMenuOpen(false)}>
                Orders
              </NavLink>
              <span className="nav-link logout-link" onClick={handleLogout}>
                Logout
              </span>
            </div>
          )}
        </nav>

        {/* Right Side Menu */}
        <div className="menu">
          {/* Desktop Profile Dropdown */}
          <div
            className={`profile desktop-profile ${dropdownOpen ? "active" : ""}`}
            onClick={toggleDropdown}
            ref={profileRef}
          >
            {user ? (
              <span className="user-avatar">
                <span className="avatar-icon">👤</span>
                <span className="user-name">{user.name}</span>
              </span>
            ) : (
              <Link to="/login" className="login-link desktop-login">
                <span className="avatar-icon">👤</span>
                <span className="login-text">Login</span>
              </Link>
            )}

            {user && dropdownOpen && (
              <div className="dropdown">
                <NavLink to="/profile" className="dropdown-link" onClick={() => setDropdownOpen(false)}>
                  My Profile
                </NavLink>
                {user.role === 1 && (
                  <NavLink to="/adminPanel" className="dropdown-link" onClick={() => setDropdownOpen(false)}>
                    Admin Panel
                  </NavLink>
                )}
                <NavLink to="/order" className="dropdown-link" onClick={() => setDropdownOpen(false)}>
                  Orders
                </NavLink>
                <span className="dropdown-link logout-link" onClick={handleLogout}>
                  Logout
                </span>
              </div>
            )}
          </div>

        
            <NavLink to="/Cart" className="cart-icon mobile-cart">
              <FaShoppingCart size={20} />
              {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
            </NavLink>
         

          {/* Mobile Hamburger Toggle */}
          <div className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
