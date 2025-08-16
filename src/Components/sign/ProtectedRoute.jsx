import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import EmailVerificationBanner from "../EmailVerificationBanner";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [hasCheckedVerification, setHasCheckedVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    const checkEmailVerification = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Get current subdomain
        const subdomain = window.location.hostname.split(".")[0];
        
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/email-verification/status?subdomain=${subdomain}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsEmailVerified(response.data.emailVerified);
        setUserEmail(response.data.email); // Set user email
        setHasCheckedVerification(true);
      } catch (error) {
        console.error("Error checking email verification:", error);
        setIsEmailVerified(false);
        setHasCheckedVerification(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkEmailVerification();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading || !hasCheckedVerification) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem"
      }}>
        Loading...
      </div>
    );
  }

  if (!isEmailVerified) {
    return (
      <div>
        <EmailVerificationBanner email={userEmail} />
        {children}
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
