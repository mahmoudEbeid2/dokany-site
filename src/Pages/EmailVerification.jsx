import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      setMessage(location.state.message || "");
    } else {
      setShowEmailForm(true);
      setMessage("Please enter your email address to receive a verification link.");
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
            📧
          </div>
          <h1>Email Verification Required</h1>
          <p className="verification-subtitle">
            We've sent a verification link to your email address
          </p>
        </div>

        <div className="verification-content">
          {message && (
            <div className="message-box">
              <p>{message}</p>
            </div>
          )}

          {showEmailForm ? (
            <form onSubmit={handleEmailSubmit} className="email-form">
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
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
                {loading ? "Sending..." : "Send Verification Email"}
              </button>
            </form>
          ) : (
            <>
              <div className="email-info">
                <p><strong>Email:</strong> {email}</p>
              </div>

              <div className="verification-steps">
                <h3>Next Steps:</h3>
                <ol>
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the verification link in the email</li>
                  <li>Return here and sign in to your account</li>
                </ol>
              </div>

              <div className="verification-actions">
                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="resend-btn"
                >
                  {loading ? "Sending..." : "Resend Verification Email"}
                </button>

                <button
                  onClick={handleCheckVerification}
                  className="check-btn"
                >
                  How to Verify
                </button>

                <button
                  onClick={handleGoToSignIn}
                  className="signin-btn"
                >
                  Go to Sign In
                </button>
              </div>
            </>
          )}

          <div className="verification-help">
            <p>
              <strong>Need help?</strong> If you don't receive the email within a few minutes, 
              check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
