import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import Checkout from './Checkout';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Remove the '$' symbol and convert to number
      const cost = Number(item.cost.replace('$', ''));
      return total + (item.quantity * cost);
    }, 0).toFixed(2); // Format to 2 decimal places
  };

  const handleContinueShopping = () => {
    setShowCheckout(false); // Hide checkout if it's showing
    onContinueShopping(false); // Call parent function to show products
  };

  const handleCheckoutShopping = () => {
    setShowCheckout(true);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = Number(item.cost.replace('$', ''));
    return (item.quantity * cost).toFixed(2);
  };

  return (
    <div className="cart-container">
      {!showCheckout ? (
        <>
          <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button className="get-started-button" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div>
                {cart.map(item => (
                  <div className="cart-item" key={item.name}>
                    <img className="cart-item-image" src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-cost">${item.cost}</div>
                      <div className="cart-item-quantity">
                        <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                        <span className="cart-item-quantity-value">{item.quantity}</span>
                        <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                      </div>
                      <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                      <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <Checkout onBackToCart={() => setShowCheckout(false)} />
      )}
    </div>
  );
};

export default CartItem;


