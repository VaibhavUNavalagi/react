import React, { useState, useRef, useEffect } from 'react';
import './Login.css';

const Login = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
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
        // Add authentication logic here
        alert(isLogin ? 'Login Successful!' : 'Account Created Successfully!');
        onClose();
    };

    const handleSocialLogin = (platform) => {
        // Add social login logic here
        alert(`Login with ${platform}`);
    };

    return (
        <div className="login-container">
            <div className="login-content" ref={modalRef}>
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
                
                <div className="social-login">
                    <p>Or continue with</p>
                    <div className="social-buttons">
                        <button onClick={() => handleSocialLogin('Google')}>Google</button>
                        <button onClick={() => handleSocialLogin('Facebook')}>Facebook</button>
                    </div>
                </div>
                
                <p className="toggle-form">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login; 