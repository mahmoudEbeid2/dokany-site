import React from "react";
import { Store, ShoppingCart, BarChart3, ArrowRight } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Create Your</span>
              <span className="title-highlight">E-Commerce</span>
              <span className="title-line">Store in Minutes</span>
            </h1>
            <p className="hero-subtitle">
              Transform your business with our revolutionary platform. Create,
              manage, and grow your online store through our mobile app with
              custom subdomains and ready-made themes.
            </p>
            <div className="hero-buttons">
              <a href="#get-started" className="btn-primary">
                <Store className="btn-icon" />
                Get Started
                <ArrowRight className="btn-arrow" />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            {/* Simple and Clean Design */}
            <div className="hero-illustration">
              <div className="main-card">
                <div className="card-header">
                  <div className="app-icon">🏪</div>
                  <h3>Your Store</h3>
                </div>
                <div className="card-content">
                  <div className="feature-item">
                    <Store className="feature-icon" />
                    <span>Create Store</span>
                  </div>
                  <div className="feature-item">
                    <ShoppingCart className="feature-icon" />
                    <span>Manage Products</span>
                  </div>
                  <div className="feature-item">
                    <BarChart3 className="feature-icon" />
                    <span>View Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
