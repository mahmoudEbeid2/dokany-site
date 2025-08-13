import React, { useState, useEffect, useRef } from "react";
import "./StatisticsSection.css";

// Counter Animation Component
const Counter = ({ end, duration = 2000, suffix = "", className = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
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

  useEffect(() => {
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

const StatisticsSection = () => {
  const stats = [
    { number: "1000", label: "Active Sellers", suffix: "+" },
    { number: "50000", label: "Products Sold", suffix: "+" },
    { number: "100000", label: "Happy Customers", suffix: "+" },
    { number: "99", label: "Satisfaction Rate", suffix: "%" },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <Counter
                end={parseInt(stat.number)}
                suffix={stat.suffix}
                duration={2000 + index * 200}
                className="stat-number"
              />
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
