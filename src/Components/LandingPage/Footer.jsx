import React from "react";
import { Mail } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🏪</span>
              <span className="logo-text">Dockany</span>
            </div>
            <p>
              Revolutionary e-commerce platform for creating mini stores
              through mobile apps.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <span>📧</span>
              </a>
              <a href="#" className="social-link">
                <span>📱</span>
              </a>
              <a href="#" className="social-link">
                <span>🌐</span>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <Mail className="contact-icon" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <a 
                    href={`mailto:${import.meta.env.VITE_MAIL || 'DockanyWebsiteBuilder@gmail.com'}`}
                    className="contact-value clickable"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {import.meta.env.VITE_MAIL || 'DockanyWebsiteBuilder@gmail.com'}
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <span className="contact-icon">📱</span>
                </div>
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <a 
                    href={`tel:${import.meta.env.VITE_PHONE || '+201223144294'}`}
                    className="contact-value clickable"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {import.meta.env.VITE_PHONE || '+20 (122) 314-4294'}
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <span className="contact-icon">📍</span>
                </div>
                <div className="contact-details">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Cairo, Egypt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Dockany. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
