import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  ShoppingCart,
  BarChart3,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import "./LandingPage.css";

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

const LandingPage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(testimonialInterval);
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

  const stats = [
    { number: "1000", label: "Active Sellers", suffix: "+" },
    { number: "50000", label: "Products Sold", suffix: "+" },
    { number: "100000", label: "Happy Customers", suffix: "+" },
    { number: "99", label: "Satisfaction Rate", suffix: "%" },
  ];

  const benefits = [
    "10% commission on sales for platform usage",
    "24/7 technical support",
    "Centralized payment gateway",
    "Monthly profit transfers",
    "Mobile app management",
    "Ready-made themes",
  ];
  // contact section
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    message: "",
    success: false,
  });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      submitting: true,
      message: "Sending message...",
      success: false,
    });

    try {
      const response = await fetch("/api/contact/general", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setFormStatus({
        submitting: false,
        message: "Message sent successfully!",
        success: true,
      });
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch (error) {
      setFormStatus({
        submitting: false,
        message: error.message,
        success: false,
      });
    }
  };
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          {/* Improved Logo Section with Bootstrap */}
          <div className="navbar-brand d-flex align-items-center">
            <div className="d-flex align-items-center">
              <div
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: "40px", height: "40px" }}
              >
                <span className="text-white fw-bold fs-5">🏪</span>
              </div>
              <span className="fw-bold text-dark fs-4">Dockany</span>
            </div>
          </div>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#landingNavbar"
            aria-controls="landingNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="landingNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="#features" className="nav-link fw-semibold px-3">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a href="#how-it-works" className="nav-link fw-semibold px-3">
                  How It Works
                </a>
              </li>
              <li className="nav-item">
                <a href="#testimonials" className="nav-link fw-semibold px-3">
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a href="#pricing" className="nav-link fw-semibold px-3">
                  Pricing
                </a>
              </li>
              {/* --- بداية الكود المضاف: رابط "اتصل بنا" في شريط التنقل --- */}
              <li className="nav-item">
                <a href="#contact-us" className="nav-link fw-semibold px-3">
                  Contact
                </a>
              </li>
              {/* --- نهاية الكود المضاف: رابط "اتصل بنا" في شريط التنقل --- */}
            </ul>

            <div className="d-flex">
              <a
                href="#get-started"
                className="btn btn-primary px-4 py-2 fw-semibold"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Platform?</h2>
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

      {/* How It Works */}
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

      {/* Testimonials */}
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

      {/* Statistics */}
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

      {/* Benefits */}
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

      {/* CTA Section */}
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

      {/* contact section */}
      <section id="contact-us" className="contact-section-container">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Contact Information */}
            <div className="contact-info-column">
              <h2 className="contact-heading">Contact Information</h2>
              <div className="info-box">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-text">
                  <span className="info-label">PHONE NUMBER</span>
                  <span className="info-value">01223144294</span>
                </div>
              </div>
              <div className="info-box">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div className="info-text">
                  <span className="info-label">EMAIL ADDRESS</span>
                  <span className="info-value">
                    dockanywebsitebuilder@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Send Us a Message Form */}
            <div className="contact-form-column">
              <h2 className="contact-heading">Send Us a Message</h2>
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="fullName">
                    <Store size={16} className="form-icon" /> Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailAddress">
                    <Mail size={16} className="form-icon" /> Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    placeholder="Enter your email address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">
                    <Zap size={16} className="form-icon" /> Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    rows="5"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-send-message"
                  disabled={formStatus.submitting}
                >
                  <ArrowRight size={20} />
                  {formStatus.submitting ? "Sending..." : "Send Message"}
                </button>
                {formStatus.message && (
                  <p
                    className={`form-status-message ${
                      formStatus.success ? "success" : "error"
                    }`}
                  >
                    {formStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🏪</span>
                <span className="logo-text">Dockany</span>
              </div>
              <p>
                Revolutionary e-commerce platform for creating mini stores
                through mobile apps.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <span>📧</span>
                </a>
                <a href="#" className="social-link">
                  <span>📱</span>
                </a>
                <a href="#" className="social-link">
                  <span>🌐</span>
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Mail className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">
                      DockanyWebsiteBuilder@gmail.com
                    </span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <Phone className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Phone</span>
                    <span className="contact-value">+20 (122) 314-4294</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <MapPin className="contact-icon" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">Location</span>
                    <span className="contact-value">Cairo, Egypt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Dockany. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
