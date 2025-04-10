import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define promo codes
const PROMO_CODES = {
  promoCodes: [
    {
      code: "WELCOME5",
      discount: 5,
      description: "Get $5 off on your first order",
      isActive: true
    },
    {
      code: "SAVE10",
      discount: 10,
      description: "Get $10 off on orders above $50",
      isActive: true,
      minOrderAmount: 50
    },
    {
      code: "FREESHIP",
      discount: 0,
      description: "Free shipping on your order",
      isActive: true,
      freeShipping: true
    }
  ]
};

const Cart = () => {
  const {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const handlePromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    const promo = PROMO_CODES.promoCodes.find(
      (p) => p.code.toLowerCase() === promoCode.trim().toLowerCase() && p.isActive
    );

    if (!promo) {
      toast.error("Invalid promo code");
      return;
    }

    if (promo.minOrderAmount && getTotalCartAmount() < promo.minOrderAmount) {
      toast.error(`Minimum order amount of $${promo.minOrderAmount} required`);
      return;
    }

    setAppliedPromo(promo);
    toast.success("Promo code applied successfully!");
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    if (appliedPromo.freeShipping) return 2; // Return delivery fee as discount
    return appliedPromo.discount;
  };

  const calculateTotal = () => {
    const subtotal = getTotalCartAmount();
    const discount = calculateDiscount();
    const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2;
    const total = subtotal + (appliedPromo?.freeShipping ? 0 : deliveryFee) - discount;
    return Math.max(0, total); // Ensure total is not negative
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Add explicit return for when condition is false
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotals</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{appliedPromo?.freeShipping ? 0 : (getTotalCartAmount() === 0 ? 0 : 2)}</p>
            </div>
            <hr />
            {appliedPromo && (
              <>
                <div className="cart-total-details">
                  <p>Promo Discount</p>
                  <p>-₹{calculateDiscount()}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{calculateTotal()}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input 
                type="text" 
                placeholder="promo code" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePromoCode();
                  }
                }}
              />
              <button onClick={handlePromoCode}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
