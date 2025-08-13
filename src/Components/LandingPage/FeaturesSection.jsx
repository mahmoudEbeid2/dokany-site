import React, { useState, useEffect } from "react";
import { Store, Globe, Zap } from "lucide-react";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Store className="feature-icon" />,
      title: "Create Your Store",
      description:
        "Build your mini e-commerce website in minutes with our mobile app",
    },
    {
      icon: <Globe className="feature-icon" />,
      title: "Custom Subdomain",
      description: "Get your unique store URL like myStore.ecommerce.com",
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Instant Setup",
      description:
        "Choose from ready-made themes and start selling immediately",
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="choose">Why Choose Our Platform?</h2>
          <p>Everything you need to start and grow your online business</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${
                currentFeature === index ? "active" : ""
              }`}
              onClick={() => setCurrentFeature(index)}
            >
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
