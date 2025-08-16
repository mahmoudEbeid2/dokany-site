import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, Mail, ArrowRight, RefreshCw } from "lucide-react";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [error, setError] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const { sellerInfo } = useSelector((state) => state.seller);

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
        
        const apiUrl = `${import.meta.env.VITE_API}/api/email-verification/verify-${type}`;
        const response = await axios.post(apiUrl, {
          token,
          subdomain
        });

        console.log("Verification response:", response.data);
        
        if (response.data.success || response.data.message) {
          setVerificationStatus("success");
          toast.success(response.data.message || "Email verified successfully!");
          
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

  // Reset logo error when sellerInfo changes
  useEffect(() => {
    if (sellerInfo?.logo) {
      setLogoError(false);
    }
  }, [sellerInfo?.logo]);

  const handleResendVerification = async () => {
    try {
      setVerificationStatus("verifying");
      setError(null);
      
      const apiUrl = `${import.meta.env.VITE_API}/api/email-verification/resend-${type}`;
      const response = await axios.post(apiUrl, {
        subdomain
      });

      if (response.data.success || response.data.message) {
        toast.success(response.data.message || "Verification email resent successfully!");
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
            <div className={styles.spinnerContainer}>
              <div className={styles.spinner}></div>
            </div>
            <h2>Verifying Your Email...</h2>
            <p>Please wait while we verify your email address.</p>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
          </div>
        );

      case "success":
        return (
          <div className={styles.success}>
            <div className={styles.iconContainer}>
              <CheckCircle className={styles.successIcon} />
            </div>
            <h2>Email Verified Successfully!</h2>
            <p>Your email has been verified. You can now sign in to your account.</p>
            <div className={styles.countdown}>
              <span>Redirecting to sign in page in 3 seconds...</span>
            </div>
            <button 
              className={styles.primaryButton}
              onClick={() => navigate(`/signin`)}
            >
              <span>Sign In Now</span>
              <ArrowRight className={styles.buttonIcon} />
            </button>
          </div>
        );

      case "failed":
        return (
          <div className={styles.failed}>
            <div className={styles.iconContainer}>
              <XCircle className={styles.errorIcon} />
            </div>
            <h2>Verification Failed</h2>
            <div className={styles.errorMessage}>
              <Mail className={styles.errorIconSmall} />
              <span>{error}</span>
            </div>
            
            <div className={styles.actions}>
              <button 
                className={styles.secondaryButton}
                onClick={handleResendVerification}
              >
                <RefreshCw className={styles.buttonIcon} />
                <span>Resend Verification Email</span>
              </button>
              
              <button 
                className={styles.outlineButton}
                onClick={() => navigate(`/signin`)}
              >
                <span>Back to Sign In</span>
              </button>
            </div>
            
            <div className={styles.help}>
              <h4>Need Help?</h4>
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
          {sellerInfo?.logo && !logoError ? (
            <div className={styles.logoImageContainer}>
              <img 
                src={sellerInfo.logo} 
                alt={`${sellerInfo.subdomain || 'Dokany'} Logo`}
                className={styles.logoImage}
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <div className={styles.logoIcon}>🚀</div>
          )}
          <h1>{sellerInfo?.subdomain || "Dokany Platform"}</h1>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyEmail;
