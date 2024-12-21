import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Checkout.css';

const Checkout = ({ onBackToCart }) => {
  const cart = useSelector(state => state.cart.items);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'credit'
  });

  const calculateItemTotal = (item) => {
    const cost = Number(item.cost.replace('$', ''));
    return (item.quantity * cost).toFixed(2);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const cost = Number(item.cost.replace('$', ''));
      return total + (item.quantity * cost);
    }, 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully!\nTotal Amount: $${calculateTotal()}\nThank you for shopping with Paradise Nursery!`);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">Quick Checkout</h2>
      
      <div className="checkout-content">
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="selected-items">
            {cart.map(item => (
              <div key={item.name} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">Quantity: {item.quantity}</span>
                  <span className="item-price">${calculateItemTotal(item)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            Total Amount: ${calculateTotal()}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-row">
            <input
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
              required
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={customerDetails.email}
              onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
              required
              placeholder="Email Address"
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              name="phone"
              value={customerDetails.phone}
              onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
              required
              placeholder="Phone Number"
            />
            <select
              name="paymentMethod"
              value={customerDetails.paymentMethod}
              onChange={(e) => setCustomerDetails({...customerDetails, paymentMethod: e.target.value})}
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <div className="checkout-buttons">
            <button type="button" onClick={onBackToCart} className="back-button">
              Back
            </button>
            <button type="submit" className="place-order-button">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 