import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import './Checkout.css';

const Checkout = ({ onBackToCart }) => {
  const cart = useSelector(state => state.cart.items);
  const [showReceipt, setShowReceipt] = useState(false);
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

  const generateReceipt = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;

    // Add company letterhead
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Company Logo/Name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('PARADISE NURSERY', pageWidth/2, margin, { align: 'center' });
    
    // Company Address
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('123 Garden Street, Green Valley', pageWidth/2, margin + 10, { align: 'center' });
    doc.text('Contact: (555) 123-4567', pageWidth/2, margin + 15, { align: 'center' });
    
    // Receipt Title and Number
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin, margin + 25, pageWidth - margin, margin + 25);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(44, 62, 80);
    doc.text('RECEIPT', margin, margin + 40);
    
    const receiptNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    doc.setFontSize(10);
    doc.text(`Receipt No: ${receiptNumber}`, pageWidth - margin, margin + 40, { align: 'right' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, margin + 45, { align: 'right' });

    // Customer Information
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', margin, margin + 60);
    doc.setFont('helvetica', 'normal');
    doc.text(customerDetails.name, margin, margin + 70);
    doc.text(customerDetails.email, margin, margin + 75);
    doc.text(customerDetails.phone, margin, margin + 80);
    doc.text(`Payment Method: ${customerDetails.paymentMethod}`, margin, margin + 85);

    // Table Header
    const tableTop = margin + 100;
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, tableTop, pageWidth - (2 * margin), 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Item Description', margin + 5, tableTop + 7);
    doc.text('Qty', pageWidth - margin - 80, tableTop + 7);
    doc.text('Price', pageWidth - margin - 45, tableTop + 7);
    doc.text('Amount', pageWidth - margin - 15, tableTop + 7, { align: 'right' });

    // Table Content
    let yPos = tableTop + 20;
    cart.forEach((item, index) => {
      doc.setFont('helvetica', 'normal');
      doc.text(item.name, margin + 5, yPos);
      doc.text(item.quantity.toString(), pageWidth - margin - 80, yPos);
      doc.text(`$${item.cost.replace('$', '')}`, pageWidth - margin - 45, yPos);
      doc.text(`$${calculateItemTotal(item)}`, pageWidth - margin - 15, yPos, { align: 'right' });
      yPos += 10;
    });

    // Total Section
    const totalSection = yPos + 10;
    doc.line(margin, totalSection, pageWidth - margin, totalSection);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', pageWidth - margin - 80, totalSection + 10);
    doc.text(`$${calculateTotal()}`, pageWidth - margin - 15, totalSection + 10, { align: 'right' });

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text('Thank you for your purchase!', pageWidth/2, pageHeight - 30, { align: 'center' });
    doc.text('This is a computer generated receipt and requires no signature.', pageWidth/2, pageHeight - 25, { align: 'center' });
    doc.text('For any queries, please contact our customer support.', pageWidth/2, pageHeight - 20, { align: 'center' });

    // Convert PDF to base64 and open in new tab
    const pdfOutput = doc.output('datauristring');
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfOutput}'></iframe>`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowReceipt(true);
    alert('Order placed successfully!\nTotal Amount: $' + calculateTotal());
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
          {showReceipt && (
            <div className="receipt-button-container">
              <button 
                type="button" 
                onClick={generateReceipt} 
                className="download-receipt-button"
              >
                View Receipt
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout; 