import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { food_list as staticFoodList } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [favorites, setFavorites] = useState({});
  const [food_list, setFoodList] = useState(staticFoodList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  const fetchFoodList = async () => {
    try {
      setLoading(true);
      console.log("Fetching food list from:", `${url}/api/food/list`);
      const response = await axios.get(`${url}/api/food/list`);
      console.log("Food list response:", response.data);
      
      if (response.data.success && response.data.data.length > 0) {
        // Merge API data with static data
        const apiFoodList = response.data.data;
        const mergedFoodList = [...staticFoodList];
        
        // Add API items that don't exist in static list
        apiFoodList.forEach(apiItem => {
          const exists = mergedFoodList.some(staticItem => staticItem._id === apiItem._id);
          if (!exists) {
            mergedFoodList.push(apiItem);
          }
        });
        
        console.log("Setting merged food list:", mergedFoodList);
        setFoodList(mergedFoodList);
      } else {
        console.log("Using static food list as fallback");
        setFoodList(staticFoodList);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      console.log("Using static food list as fallback due to error");
      setFoodList(staticFoodList);
    } finally {
      setLoading(false);
    }
  };

  // Fetch food list on component mount and every 30 seconds
  useEffect(() => {
    console.log("Initializing StoreContext");
    fetchFoodList();
    
    // Set up interval to refresh food list
    const interval = setInterval(fetchFoodList, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const addToCart = (itemId) => {
    try {
      setCartItems((prev) => {
        const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = (itemId) => {
    try {
      setCartItems((prev) => {
        if (!prev[itemId] || prev[itemId] <= 0) return prev;
        const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
      toast.success("Item Removed from Cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item];
      }
    }
    return total;
  };

  const clearCart = () => {
    setCartItems({});
    if (localStorage.getItem("token")) {
      axios.post(`${url}/api/cart/clear`, {}, { headers: { token: localStorage.getItem("token") } })
        .catch(error => console.error("Error clearing cart:", error));
    }
  };

  const filterFoodList = () => {
    let filtered = [...food_list];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const toggleFavorite = (itemId) => {
    try {
      setFavorites(prev => {
        const newFavorites = { ...prev, [itemId]: !prev[itemId] };
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      });
      const message = favorites[itemId] ? "Removed from favorites" : "Added to favorites";
      toast.success(message);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

  const getFavoriteItems = () => {
    return food_list.filter(item => favorites[item._id]);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const contextValue = {
    food_list,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
    filterFoodList,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    fetchFoodList,
    token,
    setToken,
    favorites,
    setFavorites,
    toggleFavorite,
    getFavoriteItems,
    url
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
