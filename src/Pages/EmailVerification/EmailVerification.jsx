import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EmailVerification.css';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const subdomain = searchParams.get('subdomain');

  useEffect(() => {
    if (!token || !type) {
      setError('Invalid verification link - missing required parameters');
      setVerifying(false);
      return;
    }

    // If subdomain is not in URL, try to get it from hostname
    let currentSubdomain = subdomain;
    if (!currentSubdomain) {
      const hostname = window.location.hostname;
      if (hostname.includes('.')) {
        currentSubdomain = hostname.split('.')[0];
      }
    }

    if (!currentSubdomain) {
      setError('Invalid verification link - cannot determine store');
      setVerifying(false);
      return;
    }

    verifyEmail();
  }, [token, type, subdomain]);

  const verifyEmail = async () => {
    try {
      // Get subdomain from URL or hostname
      let currentSubdomain = subdomain;
      if (!currentSubdomain) {
        const hostname = window.location.hostname;
        if (hostname.includes('.')) {
          currentSubdomain = hostname.split('.')[0];
        }
      }

      if (!currentSubdomain) {
        setError('Cannot determine store from URL');
        setVerifying(false);
        return;
      }

      const endpoint = type === 'customer' 
        ? '/api/email-verification/verify-customer'
        : '/api/email-verification/verify-user';

      const response = await fetch(`${import.meta.env.VITE_API}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, subdomain: currentSubdomain }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success('Email verified successfully!');
        // Redirect after 3 seconds
        setTimeout(() => navigate('/signin'), 3000);
      } else {
        setError(data.message || 'Verification failed');
        toast.error(data.message || 'Verification failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    // This would need the user's email, but we don't have it here
    // You could implement a form to ask for email
    toast.info('Please contact support to resend verification email');
  };

  const handleGoToSignIn = () => {
    navigate('/signin');
  };

  if (verifying) {
    return (
      <div className="verification-container">
        <div className="verification-card">
          <div className="verification-spinner">
            <div className="spinner"></div>
          </div>
          <h2>Verifying Your Email</h2>
          <p>Please wait while we verify your email address...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="verification-container">
        <div className="verification-card success">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2>Email Verified Successfully! 🎉</h2>
          <p>Your email address has been verified. You can now sign in to your account.</p>
          <div className="verification-actions">
            <button 
              onClick={handleGoToSignIn}
              className="btn-primary"
            >
              Go to Sign In
            </button>
          </div>
          <p className="redirect-text">Redirecting automatically in 3 seconds...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="verification-container">
        <div className="verification-card error">
          <div className="error-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h2>Verification Failed</h2>
          <p className="error-message">{error}</p>
          <div className="verification-actions">
            <button 
              onClick={handleResendVerification}
              className="btn-secondary"
            >
              Resend Verification
            </button>
            <button 
              onClick={handleGoToSignIn}
              className="btn-primary"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EmailVerification;
