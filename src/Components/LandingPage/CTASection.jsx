import React from "react";
import { Download } from "lucide-react";
import "./CTASection.css";

// Counter Animation Component (reused from StatisticsSection)
const Counter = ({ end, duration = 2000, suffix = "", className = "" }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const counterRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  React.useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef} className={className}>
      {count}
      {suffix}
    </span>
  );
};

const CTASection = () => {
  return (
    <section id="get-started" className="cta-section">
      <div className="container">
        <div className="cta-content">
          <div className="cta-header">
            <div className="cta-icon">🚀</div>
            <h2>Ready to Start Your E-Commerce Journey?</h2>
            <p>
              Join thousands of successful sellers who have transformed their
              businesses with our platform
            </p>
          </div>

          <div className="cta-stats">
            <div className="stat-item">
              <Counter end={10} suffix="K+" className="stat-number" />
              <span className="stat-label">Active Stores</span>
            </div>
            <div className="stat-item">
              <Counter end={2} suffix="M+" className="stat-number" />
              <span className="stat-label">Total Sales</span>
            </div>
            <div className="stat-item">
              <Counter end={98} suffix="%" className="stat-number" />
              <span className="stat-label">Success Rate</span>
            </div>
          </div>

          <div className="cta-buttons">
            <div className="download-buttons">
              <button className="btn-download">
                <Download className="btn-icon" />
                <div className="btn-text">
                  <span className="btn-label">Download on</span>
                  <span className="btn-store">Google Play</span>
                </div>
              </button>
              <button className="btn-download">
                <Download className="btn-icon" />
                <div className="btn-text">
                  <span className="btn-label">Download on the</span>
                  <span className="btn-store">App Store</span>
                </div>
              </button>
            </div>
          </div>

          <div className="cta-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Quick Setup</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure Payments</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Mobile First</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
