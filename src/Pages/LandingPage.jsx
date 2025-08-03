import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Store, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  BarChart3, 
  Globe, 
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Download,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      description: "Build your mini e-commerce website in minutes with our mobile app"
    },
    {
      icon: <Globe className="feature-icon" />,
      title: "Custom Subdomain",
      description: "Get your unique store URL like myStore.ecommerce.com"
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Instant Setup",
      description: "Choose from ready-made themes and start selling immediately"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Store Owner",
      content: "Dockany transformed my business! I went from zero to $50K in sales within 6 months. The platform is incredibly easy to use.",
      avatar: "👩‍💼"
    },
    {
      name: "Ahmed Hassan",
      role: "Electronics Seller",
      content: "The best e-commerce platform I've ever used. The mobile app makes managing my store so simple and efficient.",
      avatar: "👨‍💻"
    },
    {
      name: "Maria Garcia",
      role: "Home Decor Business",
      content: "Amazing platform! The 10% commission is fair, and the support team is always helpful. Highly recommended!",
      avatar: "👩‍🎨"
    }
  ];

  const stats = [
    { number: "1000+", label: "Active Sellers" },
    { number: "50K+", label: "Products Sold" },
    { number: "100K+", label: "Happy Customers" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const benefits = [
    "10% commission on sales for platform usage",
    "24/7 technical support",
    "Centralized payment gateway",
    "Monthly profit transfers",
    "Mobile app management",
    "Ready-made themes"
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🏪</span>
            <span className="logo-text">Dockany</span>
          </div>
          
          <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <Link to="/signup" className="nav-btn-primary">Get Started</Link>
          </div>
          
          <div className="nav-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
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
                Create Your <span className="highlight">Mini E-Commerce</span> Store in Minutes
              </h1>
              <p className="hero-subtitle">
                Transform your business with our revolutionary platform. Create, manage, and grow your online store 
                through our mobile app with custom subdomains and ready-made themes.
              </p>
              <div className="hero-buttons">
                <Link to="/signup" className="btn-primary">
                  <Store className="btn-icon" />
                  Start Your Store
                  <ArrowRight className="btn-arrow" />
                </Link>
                <button className="btn-secondary">
                  <Play className="btn-icon" />
                  Watch Demo
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Active Stores</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Products Sold</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="app-interface">
                    <div className="app-header">
                      <div className="app-logo">🏪</div>
                      <div className="app-title">My Store</div>
                    </div>
                    <div className="app-content">
                      <div className="feature-card">
                        <Store className="app-icon" />
                        <span>Create Store</span>
                      </div>
                      <div className="feature-card">
                        <ShoppingCart className="app-icon" />
                        <span>Manage Products</span>
                      </div>
                      <div className="feature-card">
                        <BarChart3 className="app-icon" />
                        <span>View Analytics</span>
                      </div>
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
                className={`feature-card ${currentFeature === index ? 'active' : ''}`}
                onClick={() => setCurrentFeature(index)}
              >
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
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
                <p>Sign up and select your unique subdomain like myStore.ecommerce.com</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Select Theme & Customize</h3>
                <p>Choose from our collection of ready-made themes and customize your store</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Start Selling</h3>
                <p>Add products, manage orders, and start earning through our mobile app</p>
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
            <p>Join thousands of satisfied sellers who transformed their businesses</p>
          </div>
          <div className="testimonials-container">
            <div className="testimonials-slider">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`testimonial-card ${currentTestimonial === index ? 'active' : ''}`}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-avatar">{testimonial.avatar}</div>
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
                  className={`dot ${currentTestimonial === index ? 'active' : ''}`}
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
                <div className="stat-number">{stat.number}</div>
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
              <p>We take care of everything so you can focus on growing your business</p>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <CheckCircle className="benefit-icon" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="commission-notice">
                <h4>💰 Commission Structure</h4>
                <p>Only <strong>10%</strong> commission on sales for platform usage, technical support, and maintenance.</p>
              </div>
            </div>
            <div className="benefits-visual">
              <div className="benefits-mockup">
                <div className="mockup-header">
                  <div className="mockup-logo">💳</div>
                  <span>Payment Dashboard</span>
                </div>
                <div className="mockup-content">
                  <div className="payment-item">
                    <span>Total Sales</span>
                    <span className="amount">$15,420</span>
                  </div>
                  <div className="payment-item">
                    <span>Platform Fee (10%)</span>
                    <span className="fee">-$1,542</span>
                  </div>
                  <div className="payment-item total">
                    <span>Your Earnings</span>
                    <span className="amount">$13,878</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your E-Commerce Journey?</h2>
            <p>Join thousands of successful sellers who have transformed their businesses with our platform</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn-primary">
                <Store className="btn-icon" />
                Create Your Store Now
                <ArrowRight className="btn-arrow" />
              </Link>
              <div className="download-buttons">
                <button className="btn-download">
                  <Download className="btn-icon" />
                  Google Play
                </button>
                <button className="btn-download">
                  <Download className="btn-icon" />
                  App Store
                </button>
              </div>
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
              <p>Revolutionary e-commerce platform for creating mini stores through mobile apps.</p>
                             <div className="social-links">
                 <a href="#" className="social-link"><span>📧</span></a>
                 <a href="#" className="social-link"><span>📱</span></a>
                 <a href="#" className="social-link"><span>🌐</span></a>
               </div>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/signup">Create Store</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>support@dockany.com</span>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>+20 (123) 456-7890</span>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>Cairo, Egypt</span>
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