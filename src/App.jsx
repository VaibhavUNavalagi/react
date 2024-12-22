import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Login from './Login';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showPlants, setShowPlants] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setShowPlants(true);
    setShowContact(false);
  };

  const handleContactClick = () => {
    setShowContact(true);
    setShowProductList(false);
  };

  const handleCloseContact = () => {
    setShowContact(false);
  };

  const handleLoginClick = () => {  
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList || showContact ? 'fade-out' : ''}`}>
        {!showProductList && !showContact && (
          <div className="header-buttons">
            <button className="login-button" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        )}
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            <div className="button-group">
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
              <button className="contact-button" onClick={handleContactClick}>
                Contact Us
              </button>
            </div>
          </div>
          <div className="aboutus_container">
            <AboutUs/>
          </div>
        </div>
      </div>
      {showContact && <ContactUs onClose={handleCloseContact} />}
      {showLogin && <Login onClose={handleCloseLogin} />}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList showPlants={showPlants} />
      </div>
    </div>
  );
}

export default App;



