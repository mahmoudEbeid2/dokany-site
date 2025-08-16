import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerificationBanner = ({ email }) => {
  const navigate = useNavigate();

  const handleResendVerification = async () => {
    try {
      // Get current subdomain
      const subdomain = window.location.hostname.split(".")[0];
      
      const response = await fetch(`${import.meta.env.VITE_API}/api/email-verification/resend-customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          subdomain
        }),
      });

      if (response.ok) {
        toast.success("Verification email sent successfully! Please check your inbox.");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send verification email.");
      }
    } catch (error) {
      toast.error("Failed to send verification email. Please try again.");
    }
  };

  const handleGoToVerification = () => {
    navigate("/email-verification", { 
      state: { 
        email,
        message: "Please verify your email to access all features."
      }
    });
  };

  return (
    <div style={{
      backgroundColor: "#fff3cd",
      border: "1px solid #ffeaa7",
      color: "#856404",
      padding: "20px",
      borderRadius: "8px",
      margin: "20px",
      textAlign: "center"
    }}>
      <h3 style={{ margin: "0 0 15px 0", color: "#856404" }}>
        🔐 Email Verification Required
      </h3>
      <p style={{ margin: "0 0 20px 0", fontSize: "1rem" }}>
        You need to verify your email address to access this feature. 
        Please check your inbox and click the verification link.
      </p>
      <div style={{
        display: "flex",
        gap: "15px",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        <button
          onClick={handleResendVerification}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}
        >
          Resend Verification Email
        </button>
        <button
          onClick={handleGoToVerification}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}
        >
          Go to Verification Page
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
