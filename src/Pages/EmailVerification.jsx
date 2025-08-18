import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, CheckCircle, ArrowRight, HelpCircle, UserCheck } from "lucide-react";
import "./EmailVerification.css";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    console.log('EmailVerification: location.state =', location.state);
    
    // Check if email is provided in location state
    if (location.state && location.state.email) {
      console.log('EmailVerification: Email found in location.state:', location.state.email);
      setEmail(location.state.email);
      setMessage(location.state.message || "Account created successfully! Please check your email to verify your account.");
      setShowEmailForm(false);
    } else {
      // Check if there's an email in URL params (for direct access)
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get('email');
      
      console.log('EmailVerification: URL params email =', emailParam);
      
      if (emailParam) {
        console.log('EmailVerification: Email found in URL params:', emailParam);
        setEmail(emailParam);
        setMessage("Account created successfully! Please check your email to verify your account.");
        setShowEmailForm(false);
      } else {
        // Show email form only if no email is available
        console.log('EmailVerification: No email found, showing form');
        setShowEmailForm(true);
        setMessage("Please enter your email address to receive a verification link.");
      }
    }
  }, [location.state]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email address is required");
      return;
    }

    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_API}/api/email-verification/resend-customer`;
      
      // Get current subdomain
      const subdomain = window.location.hostname.split(".")[0];
      
      await axios.post(apiUrl, { 
        email: email,
        subdomain: subdomain
      });
      
      toast.success("Verification email sent successfully! Please check your inbox.");
      setMessage("Verification email sent successfully! Please check your inbox and click the verification link.");
      setShowEmailForm(false);
    } catch (error) {
      const errorData = error.response?.data;
      const errorMsg = errorData?.error || "Failed to send verification email.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Email address is required");
      return;
    }

    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_API}/api/email-verification/resend-customer`;
      
      // Get current subdomain
      const subdomain = window.location.hostname.split(".")[0];
      
      await axios.post(apiUrl, { 
        email: email,
        subdomain: subdomain
      });
      
      toast.success("Verification email sent successfully! Please check your inbox.");
      setMessage("Verification email sent successfully! Please check your inbox and click the verification link.");
    } catch (error) {
      const errorData = error.response?.data;
      const errorMsg = errorData?.error || "Failed to send verification email.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSignIn = () => {
    navigate("/signin");
  };

  const handleCheckVerification = async () => {
    toast.info("Please check your email and click the verification link. You can then sign in to your account.");
  };

  return (
    <div className="email-verification-container">
      <div className="verification-card">
        <div className="verification-header">
          <div className="verification-icon">
            <Mail size={48} />
          </div>
          <h1>Email Verification Required</h1>
          <p className="verification-subtitle">
            We've sent a verification link to your email address
          </p>
        </div>
        
        {/* Debug info - remove this later */}
        <div style={{ 
          background: '#f0f0f0', 
          padding: '10px', 
          margin: '10px 0', 
          borderRadius: '8px',
          fontSize: '12px',
          color: '#666'
        }}>
          Debug: showEmailForm = {showEmailForm.toString()}, email = {email || 'none'}
        </div>

        <div className="verification-content">
          {message && (
            <div className="message-box">
              <CheckCircle size={20} className="message-icon" />
              <p>{message}</p>
            </div>
          )}

          {!showEmailForm && email && (
            <div className="email-info">
              <UserCheck size={20} className="info-icon" />
              <p><strong>Email:</strong> {email}</p>
            </div>
          )}

          {showEmailForm ? (
            <form onSubmit={handleEmailSubmit} className="email-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="email-input"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Verification Email
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <>
              <div className="email-info">
                <UserCheck size={20} className="info-icon" />
                <p><strong>Email:</strong> {email}</p>
              </div>

              <div className="verification-steps">
                <h3>Next Steps</h3>
                <div className="steps-list">
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Check your email</h4>
                      <p>Look in your inbox and spam folder</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Click the verification link</h4>
                      <p>Open the email and click the verification button</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Sign in to your account</h4>
                      <p>Return here and access your account</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="verification-actions">
                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="resend-btn"
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={18} />
                      Resend Verification Email
                    </>
                  )}
                </button>

                <button
                  onClick={handleCheckVerification}
                  className="check-btn"
                >
                  <HelpCircle size={18} />
                  How to Verify
                </button>

                <button
                  onClick={handleGoToSignIn}
                  className="signin-btn"
                >
                  <ArrowRight size={18} />
                  Go to Sign In
                </button>
              </div>
            </>
          )}

          <div className="verification-help">
            <HelpCircle size={20} className="help-icon" />
            <div>
              <p>
                <strong>Need help?</strong> If you don't receive the email within a few minutes, 
                check your spam folder or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
