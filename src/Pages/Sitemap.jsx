import React from "react";
import "./Sitemap.css";

const Sitemap = () => {
  return (
    <div className="sitemap-container">
      <div className="sitemap-content">
        <h1>Sitemap</h1>
        <p className="sitemap-description">
          Navigate through all the pages and sections of our website easily with our comprehensive sitemap.
        </p>

        <section className="sitemap-section">
          <h2>Main Pages</h2>
          <div className="sitemap-links">
            <div className="sitemap-category">
              <h3>Home & Landing</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/landing">Landing Page</a></li>
              </ul>
            </div>

            <div className="sitemap-category">
              <h3>Authentication</h3>
              <ul>
                <li><a href="/signin">Sign In</a></li>
                <li><a href="/signup">Sign Up</a></li>
                <li><a href="/reset-password">Reset Password</a></li>
              </ul>
            </div>

            <div className="sitemap-category">
              <h3>Shop & Products</h3>
              <ul>
                <li><a href="/shoppage">Shop Page</a></li>
                <li><a href="/products">All Products</a></li>
                <li><a href="/category">Product Categories</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="sitemap-section">
          <h2>User Account</h2>
          <div className="sitemap-links">
            <div className="sitemap-category">
              <h3>My Account</h3>
              <ul>
                <li><a href="/myaccount">Account Dashboard</a></li>
                <li><a href="/orders">My Orders</a></li>
                <li><a href="/favorites">Favorites</a></li>
              </ul>
            </div>

            <div className="sitemap-category">
              <h3>Shopping</h3>
              <ul>
                <li><a href="/cart">Shopping Cart</a></li>
                <li><a href="/checkout">Checkout</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="sitemap-section">
          <h2>Information Pages</h2>
          <div className="sitemap-links">
            <div className="sitemap-category">
              <h3>Company</h3>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/support">Support</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="sitemap-section">
          <h2>Landing Page Sections</h2>
          <div className="sitemap-links">
            <div className="sitemap-category">
              <h3>Features</h3>
              <ul>
                <li><a href="#features">Platform Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#benefits">Benefits</a></li>
              </ul>
            </div>

            <div className="sitemap-category">
              <h3>Social Proof</h3>
              <ul>
                <li><a href="#testimonials">Customer Testimonials</a></li>
                <li><a href="#statistics">Statistics</a></li>
                <li><a href="#reviews">Reviews</a></li>
              </ul>
            </div>

            <div className="sitemap-category">
              <h3>Contact & Support</h3>
              <ul>
                <li><a href="#contact-us">Contact Form</a></li>
                <li><a href="#support">Support Information</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="sitemap-section">
          <h2>Product Categories</h2>
          <div className="sitemap-links">
            <div className="sitemap-category">
              <h3>By Type</h3>
              <ul>
                <li><a href="/category/electronics">Electronics</a></li>
                <li><a href="/category/clothing">Clothing & Fashion</a></li>
                <li><a href="/category/home">Home & Garden</a></li>
                <li><a href="/category/books">Books & Media</a></li>
                <li><a href="/category/sports">Sports & Outdoors</a></li>
              </ul>
            </div>

            <div className="sitemap-category">
              <h3>Special Collections</h3>
              <ul>
                <li><a href="/products/bestsellers">Best Sellers</a></li>
                <li><a href="/products/new-arrivals">New Arrivals</a></li>
                <li><a href="/products/discounts">Discounted Items</a></li>
                <li><a href="/products/featured">Featured Products</a></li>
              </ul>
            </div>
          </div>
        </section>

        <div className="sitemap-footer">
          <p>Last updated: January 2024</p>
          <p>For questions about our website structure, please contact us at support@dokany.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
