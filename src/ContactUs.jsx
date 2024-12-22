import React, { useState, useRef, useEffect } from 'react';
import './ContactUs.css';

const ContactUs = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your feedback!');
    };

    return (
        <div className="contact-container">
            <div className="contact-content" ref={modalRef}>
                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p>We'd love to hear from you!</p>
                    <div className="contact-details">
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <p>123 Garden Street, Green City</p>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <p>+1 234 567 8900</p>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <p>info@paradisenursery.com</p>
                        </div>
                    </div>
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        required
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                    <div className="button-container">
                        <button type="button" onClick={onClose} className="back-button">Back</button>
                        <button type="submit" className="send-button">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs; 