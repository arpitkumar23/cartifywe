import { createContext, useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = " ₹";
  const delivery_fees = 10;
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [ShowSearch, setSearchShow] = useState(true);
  const [cartItem, setCartItem] = useState([]); // ✅ now array
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Fetch products
  const getProductData = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/list-product`);
      const productArray = Array.isArray(res.data) ? res.data : res.data.data;
      setProducts(productArray || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch user cart
  const getUserCart = async (token) => {
    if (!token) return;
    try {
      const res = await axios.get(`${backend_url}/api/getCart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.cartData) {
        // Convert backend array to array (already array)
        setCartItem(res.data.cartData || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    }
  };

  // Add item to cart
  const addToCart = async (itemId, size ) => {
    if (!size) {
      toast.error("Please select the size");
      return;
    }

    let cartData = [...cartItem];
    const index = cartData.findIndex(item => item.itemId === itemId && item.size === size      );

    if (index !== -1) {
      cartData[index].quantity += 1;
    } else {
      cartData.push({ itemId, size, quantity: 1 });
    }

    setCartItem(cartData);

    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        await axios.post(
          `${backend_url}/api/addToCart`,
          { itemId, size, quantity: cartData[index]?.quantity || 1 },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // Update quantity
  const updatequantity = async (itemId, size, quantity) => {
    let cartData = [...cartItem];
    const index = cartData.findIndex(item => item.itemId === itemId && item.size === size);

    if (quantity <= 0) {
      if (index !== -1) cartData.splice(index, 1);
    } else {
      if (index !== -1) cartData[index].quantity = quantity;
      else cartData.push({ itemId, size, quantity });
    }

    setCartItem(cartData);

    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        await axios.put(
          `${backend_url}/api/updateCart`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      } catch (error) {
        console.error("Error updating cart:", error.response?.data || error);
      }
    }
  };

  // Remove item
  const removeCart = async (itemId, size) => {
    let cartData = cartItem.filter(item => !(item.itemId === itemId && item.size === size));
    setCartItem(cartData);

    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      toast.error("You are not authorized");
      return;
    }

    try {
      await axios.delete(`${backend_url}/api/removeCart`, {
        headers: { Authorization: `Bearer ${storedToken}` },
        data: { itemId, size }
      });
      toast.success("Item removed successfully");
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
      toast.error("Failed to remove item");
    }
  };

  // Get total count
  const getCartCount = () => {
    return cartItem.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Get total amount
  const getCartAmount = () => {
    return cartItem.reduce((sum, item) => {
      const productData = products.find(p => p._id === item.itemId);
      if (!productData) return sum;
      return sum + productData.price * item.quantity;
    }, 0);
  };

  // Load token & cart
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
    getProductData();
  }, []);

  // Listen for login/logout
  useEffect(() => {
    const handleUserUpdated = () => {
      const storedToken = localStorage.getItem("accessToken");
      setToken(storedToken || "");
      if (storedToken) getUserCart(storedToken);
      else setCartItem([]);
    };

    window.addEventListener("userUpdated", handleUserUpdated);
    return () => window.removeEventListener("userUpdated", handleUserUpdated);
  }, []);

  const value = {
    products,
    currency,
    delivery_fees,
    search,
    setSearch,
    ShowSearch,
    setSearchShow,
    addToCart,
    cartItem,
    setCartItem
    ,
    getCartCount,
    updatequantity,
    getCartAmount,
    navigate,
    backend_url,
    token,
    setToken,
    getUserCart,
    removeCart
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
