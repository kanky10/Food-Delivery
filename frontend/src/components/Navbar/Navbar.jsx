import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  const handleSectionClick = (section, menuItem) => {
    setMenu(menuItem);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOrdersClick = () => {
    if (token) {
      navigate('/myorders');
    } else {
      toast.error("Please login to view your orders");
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleSectionClick('explore-menu', 'menu');
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleSectionClick('footer', 'contact-us');
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        {token && (
          <>
            <button className="order-history-button" onClick={handleOrdersClick}>
              <img src={assets.parcel_icon} alt="" />
              <span>Orders</span>
            </button>
            <div className="cart-container">
              <Link to="/cart">
                <img src={assets.basket_icon} alt="" />
              </Link>
              <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
          </>
        )}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <button className="logout-button" onClick={logout}>
            <img src={assets.logout_icon} alt="" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
