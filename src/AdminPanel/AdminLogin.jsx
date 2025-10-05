import React from "react";
import "../css/Title.css";  

function AdminLogin() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form> 
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required placeholder="Enter username" />
          </div> 
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required placeholder="Enter password" />
          </div> 
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
