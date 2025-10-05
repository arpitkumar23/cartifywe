import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../contect/ShopContext";
import { FaSearch, FaTimes } from "react-icons/fa";
import '../css/Title.css'
import { useLocation } from "react-router-dom";

const Searchbatr = () => {
  const { search, setSearch, ShowSearch, setSearchShow } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/Collection") {
      setSearchShow(true);
    } else {
      setSearchShow(false);
    }
    setSearch("");
  }, [location.pathname, setSearchShow, setSearch]);

  if (!ShowSearch) return null;

  return (
    <div className="searchbar-container">

      <FaSearch className="search-icon" />


      <input
        type="text"
        value={ search }
        onChange={ (e) => setSearch(e.target.value) }
        placeholder="Search products..."
        className="search-input"
      />

    </div>
  );
};

export default Searchbatr;
