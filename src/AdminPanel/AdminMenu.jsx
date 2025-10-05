import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Title.css";  

const AdminMenu = () => {
  return (
    <div className="admin-menu"> 
      <ul>
        <li>
          <NavLink to="/adminPanel/add-item">Add Item</NavLink>
        </li>
        <li>
          <NavLink to="/adminPanel/list-item">List Item</NavLink>
        </li>
        <li>
          <NavLink to="/adminPanel/order">Order</NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default AdminMenu;
