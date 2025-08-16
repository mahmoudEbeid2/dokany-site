import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");

    if (!token) {
      setVerificationStatus("error");
      setError("Verification token is missing. Please check your email for the correct link.");
      return;
    }

    verifyEmail(token, type);
  }, [searchParams]);

  const verifyEmail = async (token, type) => {
    try {
      setVerificationStatus("verifying");
      
      // Get current subdomain
      const subdomain = window.location.hostname.split(".")[0];
      
      const apiUrl = `${import.meta.env.VITE_API}/api/email-verification/verify-${type}`;
      const response = await axios.post(apiUrl, { 
        token,
        subdomain
      });
      
      setVerificationStatus("success");
      setMessage(response.data.message || "Email verified successfully!");
      
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
      
    } catch (error) {
      setVerificationStatus("error");
      const errorData = error.response?.data;
      setError(errorData?.message || errorData?.error || "Verification failed. Please try again.");
    }
  };

  const handleGoToSignIn = () => {
    navigate("/signin");
  };

  const handleGoToSignUp = () => {
    navigate("/signup");
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div className="verifying-content">
            <div className="loading-spinner"></div>
            <h2>Verifying Your Email...</h2>
            <p>Please wait while we verify your email address.</p>
          </div>
        );

      case "success":
        return (
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h2>Email Verified Successfully!</h2>
            <p>{message}</p>
            <div className="success-actions">
              <button onClick={handleGoToSignIn} className="signin-btn">
                Go to Sign In
              </button>
              <p className="redirect-message">
                You will be redirected automatically in a few seconds...
              </p>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="error-content">
            <div className="error-icon">❌</div>
            <h2>Verification Failed</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={handleGoToSignIn} className="signin-btn">
                Go to Sign In
              </button>
              <button onClick={handleGoToSignUp} className="signup-btn">
                Create New Account
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyEmail;
