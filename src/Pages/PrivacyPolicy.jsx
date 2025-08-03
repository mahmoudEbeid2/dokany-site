import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const { sellerInfo } = useSelector((state) => state.seller);
  const subdomain = window.location.hostname.split(".")[0];

  // Extract contact information from sellerInfo
  const contactInfo = {
    name: sellerInfo?.name || sellerInfo?.f_name || subdomain,
    email: sellerInfo?.email || 'support@' + subdomain + '.com',
    phone: sellerInfo?.phone || '+20 (123) 456-7890',
    address: sellerInfo?.address || sellerInfo?.city || 'Cairo, Egypt',
    businessHours: sellerInfo?.business_hours || 'Sunday - Thursday, 9:00 AM - 6:00 PM (GMT+2)'
  };

  return (
    <div className="privacy-policy-container">
      <div className="container">
        <div className="privacy-header">
          <h1>Privacy Policy & Terms of Use</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="policy-intro">
            Welcome to {contactInfo.name}! This document outlines our Privacy Policy and Terms of Use. 
            By using our platform, you agree to these terms and our data collection practices.
          </p>
        </div>

        <div className="privacy-content">
          <section className="policy-section">
            <h2>1. About {contactInfo.name}</h2>
            <p>
              {contactInfo.name} operates on Dockany, a multi-tenant e-commerce platform that allows sellers to create their own online stores 
              with custom subdomains. Each seller operates independently with their own products, customers, and branding.
            </p>
            <p>
              When you use {contactInfo.name}'s store (e.g., {subdomain}.dockany.com), you are interacting with {contactInfo.name}'s 
              business while using our platform infrastructure.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information</li>
              <li>Profile picture and account preferences</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your orders and payments</li>
              <li>Provide customer support</li>
              <li>Send you updates about your orders</li>
              <li>Improve our services and user experience</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:</p>
            <ul>
              <li>To process payments through secure payment processors</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section className="policy-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Update or correct your information</li>
              <li>Delete your account</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>7. Terms of Use</h2>
            <p>By using our service, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not interfere with the service's operation</li>
              <li>Respect intellectual property rights</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in fraudulent or deceptive practices</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>8. Seller Responsibilities</h2>
            <p>As a seller on our platform, {contactInfo.name} is responsible for:</p>
            <ul>
              <li>Providing accurate product information and pricing</li>
              <li>Maintaining product quality and safety standards</li>
              <li>Processing orders and handling customer service</li>
              <li>Complying with local and international trade laws</li>
              <li>Protecting customer data and privacy</li>
              <li>Resolving disputes with customers fairly</li>
            </ul>
            <p>
              <strong>Note:</strong> While we provide the platform infrastructure, {contactInfo.name} is responsible 
              for their business operations, product quality, and customer relationships.
            </p>
          </section>

          <section className="policy-section">
            <h2>9. Account Termination</h2>
            <p>We may terminate or suspend your account if you violate these terms. You may also terminate your account at any time by contacting us.</p>
          </section>

          <section className="policy-section">
            <h2>10. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </section>

          <section className="policy-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or Terms of Use, please contact {contactInfo.name} at:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> {contactInfo.email}</p>
              <p><strong>Phone:</strong> {contactInfo.phone}</p>
              <p><strong>Business Hours:</strong> {contactInfo.businessHours}</p>
            </div>
          </section>
        </div>

        <div className="privacy-footer">
          <Link to="/signup" className="btn-back">
            ← Back to Sign Up
          </Link>
          <p className="footer-note">
            By clicking "Back to Sign Up", you acknowledge that you have read and understood {contactInfo.name}'s Privacy Policy and Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 