import React, { useState } from 'react';
import './QuickView.css';
import { assets } from '../../assets/frontend_assets/assets';

const QuickView = ({ 
  isOpen, 
  onClose, 
  item, 
  onAddToCart, 
  onRemoveFromCart, 
  cartQuantity = 0 
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <img src={assets.cross_icon} alt="Close" />
        </button>
        
        <div className="quick-view-content">
          <div className="quick-view-image">
            <img src={item.image} alt={item.name} />
          </div>
          
          <div className="quick-view-details">
            <h2>{item.name}</h2>
            
            <div className="rating-price">
              <img src={assets.rating_starts} alt="Rating" />
              <p className="price">₹{item.price}</p>
            </div>
            
            <div className="description-container">
              <p className={`description ${isDescriptionExpanded ? 'expanded' : ''}`}>
                {item.description}
              </p>
              {item.description.length > 150 && (
                <button 
                  className="read-more-btn"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                >
                  {isDescriptionExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
            
            <div className="cart-actions">
              {cartQuantity > 0 ? (
                <div className="quantity-controls">
                  <button onClick={() => onRemoveFromCart(item._id)}>
                    <img src={assets.remove_icon_red} alt="Remove" />
                  </button>
                  <span>{cartQuantity}</span>
                  <button onClick={() => onAddToCart(item._id)}>
                    <img src={assets.add_icon_green} alt="Add" />
                  </button>
                </div>
              ) : (
                <button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(item._id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
            
            <div className="additional-info">
              <h3>Category</h3>
              <p>{item.category}</p>
              
              <h3>Preparation Time</h3>
              <p>15-20 minutes</p>
              
              <h3>Dietary Info</h3>
              <div className="dietary-tags">
                <span>Healthy</span>
                <span>Delicious</span>
                <span>Hygenic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView; 