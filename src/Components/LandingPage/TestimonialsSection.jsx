import React, { useState, useEffect } from "react";
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Store Owner",
      content:
        "Dockany transformed my business! I went from zero to $50K in sales within 6 months. The platform is incredibly easy to use.",
      avatar: "👩‍💼",
    },
    {
      name: "Ahmed Hassan",
      role: "Electronics Seller",
      content:
        "The best e-commerce platform I've ever used. The mobile app makes managing my store so simple and efficient.",
      avatar: "👨‍💻",
    },
    {
      name: "Maria Garcia",
      role: "Home Decor Business",
      content:
        "Amazing platform! The 10% commission is fair, and the support team is always helpful. Highly recommended!",
      avatar: "👩‍🎨",
    },
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>
            Join thousands of satisfied sellers who transformed their
            businesses
          </p>
        </div>
        <div className="testimonials-container">
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card ${
                  currentTestimonial === index ? "active" : ""
                }`}
              >
                <div className="testimonial-content">
                  <div className="testimonial-avatar">
                    {testimonial.avatar}
                  </div>
                  <p className="testimonial-text">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${
                  currentTestimonial === index ? "active" : ""
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
