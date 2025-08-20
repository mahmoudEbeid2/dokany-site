import React from "react";
import { Mail, Phone, MapPin, Globe, Smartphone, Zap, Users, Shield, Clock, Star } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info Section */}
          <div className="footer-section company-section">
            <div className="company-logo">
              <div className="logo-icon">
                <Zap size={24} />
              </div>
              <h3>Dokany</h3>
            </div>
            <p className="company-description">
              Leading e-commerce platform for creating mini stores through mobile applications. 
              We provide innovative solutions for entrepreneurs and startups.
            </p>
            <div className="company-stats">
              <div className="stat-item">
                <Users size={20} />
                <span>+10K</span>
                <small>Active Users</small>
              </div>
              <div className="stat-item">
                <Star size={20} />
                <span>4.9</span>
                <small>Rating</small>
              </div>
              <div className="stat-item">
                <Shield size={20} />
                <span>100%</span>
                <small>Secure</small>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section links-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact-us">Contact Us</a></li>
            </ul>
          </div>
  
          {/* Services Section */}
          <div className="footer-section services-section">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><a href="#mobile-apps">Mobile Applications</a></li>
              <li><a href="#ecommerce">E-commerce Stores</a></li>
              <li><a href="#analytics">Advanced Analytics</a></li>
              <li><a href="#support">24/7 Support</a></li>
              <li><a href="#integration">System Integration</a></li>
              <li><a href="#customization">Full Customization</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact-section">
            <h4>Contact Information</h4>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <a 
                    href={`mailto:${import.meta.env.VITE_MAIL || 'info@dokany.com'}`}
                    className="contact-value"
                  >
                    {import.meta.env.VITE_MAIL || 'info@dokany.com'}
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={18} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <a 
                    href={`tel:${import.meta.env.VITE_PHONE || '+201223144294'}`}
                    className="contact-value"
                  >
                    {import.meta.env.VITE_PHONE || '+20 (122) 314-4294'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p style={{ textAlign: 'center' }}>&copy;{` ${new Date().getFullYear()} Dokany. All rights reserved.`}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
