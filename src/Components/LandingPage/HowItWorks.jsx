import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get your store up and running in 3 simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Register & Choose Domain</h3>
              <p>
                Sign up and select your unique subdomain like
                myStore.ecommerce.com
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Select Theme & Customize</h3>
              <p>
                Choose from our collection of ready-made themes and customize
                your store
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Start Selling</h3>
              <p>
                Add products, manage orders, and start earning through our
                mobile app
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
