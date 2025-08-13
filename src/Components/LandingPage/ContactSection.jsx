import React, { useState } from "react";
import { Store, Mail, Zap, ArrowRight } from "lucide-react";
import "./ContactSection.css";

const ContactSection = () => {
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
    <section id="contact-us" className="contact-section-container">
      <div className="container">
        <div className="contact-grid">
          {/* Contact Form */}
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
  );
};

export default ContactSection;
