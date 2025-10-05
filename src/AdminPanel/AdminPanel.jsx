import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import "../css/Title.css";

const AdminPanel = () => {
  const [admin, setAdmin] = useState({ name: "", email: "", role: "" });
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === 1) {
      setAdmin({ name: user.name, email: user.email, role: user.role });
    }
    
    // Simulate fetching stats
    setStats({
      totalUsers: 1243,
      totalProducts: 456,
      totalOrders: 892,
      totalRevenue: 125430
    });
  }, []);

  return (
    <div className="admin-panel">
      

      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <h1 className="admin-title">Admin Panel</h1>
        <AdminMenu />
      </aside>

      <main className="admin-content">
        {/* Welcome Card */}
        <div className="welcome-card">
          <h2>Welcome, {admin.name || "Admin"}! 👋</h2>
          <p>Email: {admin.email || "admin@example.com"}</p>
          <p>Role: {admin.role === 1 ? "Super Admin" : "Admin"}</p>
          <p>Manage your categories, products, and users here.</p>
        </div>

        {/* Stats Grid */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalProducts}</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalOrders}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${stats.totalRevenue}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-btn">Add New Product</button>
          <button className="action-btn">Manage Users</button>
          <button className="action-btn">View Orders</button>
          <button className="action-btn">Analytics</button>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span>New order #1234 received</span>
              <small>2 minutes ago</small>
            </div>
            <div className="activity-item">
              <span>User John Doe registered</span>
              <small>5 minutes ago</small>
            </div>
            <div className="activity-item">
              <span>Product "Smart Watch" updated</span>
              <small>10 minutes ago</small>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;