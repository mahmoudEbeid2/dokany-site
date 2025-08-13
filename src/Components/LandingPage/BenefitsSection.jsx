import React from "react";
import { CheckCircle } from "lucide-react";
import "./BenefitsSection.css";

const BenefitsSection = () => {
  const benefits = [
    "10% commission on sales for platform usage",
    "24/7 technical support",
    "Centralized payment gateway",
    "Monthly profit transfers",
    "Mobile app management",
    "Ready-made themes",
  ];

  return (
    <section id="pricing" className="benefits-section">
      <div className="container">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2>Platform Benefits</h2>
            <p>
              We take care of everything so you can focus on growing your
              business
            </p>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index}>
                  <CheckCircle className="benefit-icon" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="benefits-visual">
            {/* Payment Dashboard */}
            <div className="benefits-mockup">
              <div className="mockup-header">
                <div className="mockup-logo">💳</div>
                <span>Payment Dashboard</span>
              </div>
              <div className="mockup-content">
                <div className="payment-item">
                  <span>Total Sales</span>
                  <span className="amount">$10.00</span>
                </div>
                <div className="payment-item">
                  <span>Platform Fee (10%)</span>
                  <span className="fee">-$1.00</span>
                </div>
                <div className="payment-item total">
                  <span>Your Earnings</span>
                  <span className="amount">$9.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
