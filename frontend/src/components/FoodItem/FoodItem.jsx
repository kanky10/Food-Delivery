import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import QuickView from "../QuickView/QuickView";

const FoodItem = ({ id, name, description, price, image, category, loading = false }) => {
  const { cartItems, addToCart, removeFromCart, favorites, toggleFavorite } = useContext(StoreContext);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = () => {
    addToCart(id);
  };

  const handleRemoveFromCart = () => {
    if (cartItems[id] > 0) {
      removeFromCart(id);
    }
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
  };

  if (loading) {
    return (
      <div className="food-item loading">
        <div className="food-item-img-container skeleton"></div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <div className="skeleton-text"></div>
            <div className="skeleton-rating"></div>
          </div>
          <div className="skeleton-desc"></div>
          <div className="food-item-price">
            <div className="skeleton-price"></div>
          </div>
        </div>
      </div>
    );
  }

  const item = {
    _id: id,
    name,
    description,
    price,
    image,
    category
  };

  return (
    <>
      <div 
        className="food-item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="food-item-img-container">
          {!imgLoaded && <div className="skeleton"></div>}
          <img 
            className={`food-item-image ${imgLoaded ? 'loaded' : ''}`}
            src={image}
            alt={name}
            onLoad={() => setImgLoaded(true)}
          />
          <div className="food-item-overlay">
            <div className="food-item-actions">
              <button
                className={`favorite-btn ${favorites[id] ? 'active' : ''}`}
                onClick={handleToggleFavorite}
                data-tooltip={favorites[id] ? 'Remove from favorites' : 'Add to favorites'}
              >
                <img 
                  src={assets.favorite_icon}
                  alt=""
                  className={`favorite-icon ${favorites[id] ? 'active' : ''}`}
                />
              </button>
              <button
                className="quick-view-btn"
                onClick={handleQuickView}
                data-tooltip="Quick view"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="Rating" />
          </div>
          <p className="food-item-desc">{description}</p>
          <div className="food-item-price">
            <p>₹{price}</p>
            {cartItems[id] > 0 && (
              <div className="food-item-counter">
                <img
                  src={assets.remove_icon_red}
                  onClick={handleRemoveFromCart}
                  alt="Remove"
                />
                <p>{cartItems[id]}</p>
                <img
                  src={assets.add_icon_green}
                  onClick={handleAddToCart}
                  alt="Add"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickView
        isOpen={showQuickView}
        onClose={handleCloseQuickView}
        item={item}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        cartQuantity={cartItems[id]}
      />
    </>
  );
};

export default FoodItem;
