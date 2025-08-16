import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [error, setError] = useState(null);

  const token = searchParams.get("token");
  const type = searchParams.get("type");
  const subdomain = searchParams.get("subdomain");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !type || !subdomain) {
        setError("Invalid verification link. Missing required parameters.");
        setVerificationStatus("failed");
        return;
      }

      try {
        console.log("Verifying email with:", { token, type, subdomain });
        
        const apiUrl = `${import.meta.env.VITE_API}/auth/${type}/verify-email`;
        const response = await axios.post(apiUrl, {
          token,
          subdomain
        });

        console.log("Verification response:", response.data);
        
        if (response.data.success) {
          setVerificationStatus("success");
          toast.success("Email verified successfully!");
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate(`/signin`);
          }, 3000);
        } else {
          setError(response.data.error || "Verification failed");
          setVerificationStatus("failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        const errorMessage = error.response?.data?.error || "Verification failed. Please try again.";
        setError(errorMessage);
        setVerificationStatus("failed");
      }
    };

    verifyEmail();
  }, [token, type, subdomain, navigate]);

  const handleResendVerification = async () => {
    try {
      setVerificationStatus("verifying");
      setError(null);
      
      const apiUrl = `${import.meta.env.VITE_API}/auth/${type}/resend-verification`;
      const response = await axios.post(apiUrl, {
        subdomain
      });

      if (response.data.success) {
        toast.success("Verification email resent successfully!");
        setVerificationStatus("success");
      } else {
        setError(response.data.error || "Failed to resend verification email");
        setVerificationStatus("failed");
      }
    } catch (error) {
      console.error("Resend error:", error);
      const errorMessage = error.response?.data?.error || "Failed to resend verification email";
      setError(errorMessage);
      setVerificationStatus("failed");
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div className={styles.verifying}>
            <div className={styles.spinner}></div>
            <h2>Verifying Your Email...</h2>
            <p>Please wait while we verify your email address.</p>
          </div>
        );

      case "success":
        return (
          <div className={styles.success}>
            <div className={styles.successIcon}>✅</div>
            <h2>Email Verified Successfully!</h2>
            <p>Your email has been verified. You can now sign in to your account.</p>
            <p>Redirecting to sign in page...</p>
            <button 
              className={styles.signInButton}
              onClick={() => navigate(`/signin`)}
            >
              Sign In Now
            </button>
          </div>
        );

      case "failed":
        return (
          <div className={styles.failed}>
            <div className={styles.errorIcon}>❌</div>
            <h2>Verification Failed</h2>
            <p className={styles.errorMessage}>{error}</p>
            
            <div className={styles.actions}>
              <button 
                className={styles.retryButton}
                onClick={handleResendVerification}
              >
                Resend Verification Email
              </button>
              
              <button 
                className={styles.backButton}
                onClick={() => navigate(`/signin`)}
              >
                Back to Sign In
              </button>
            </div>
            
            <div className={styles.help}>
              <p>If you continue to have issues, please:</p>
              <ul>
                <li>Check that you're using the correct verification link</li>
                <li>Ensure the link hasn't expired (24 hours)</li>
                <li>Contact support if the problem persists</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <h1>🚀 Dokany Platform</h1>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyEmail;
