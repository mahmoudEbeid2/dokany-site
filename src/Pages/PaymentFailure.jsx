import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, Home, ShoppingBag, ArrowLeft, RefreshCw } from 'lucide-react';
import styles from './PaymentFailure.module.css';

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleContinueShopping = () => {
    navigate('/shoppage');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRetryPayment = () => {
    navigate('/cart');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <XCircle className={styles.failureIcon} />
        </div>
        
        <h1 className={styles.title}>Payment Failed</h1>
        
        <p className={styles.message}>
          We're sorry, but your payment could not be processed. This could be due to insufficient funds, card restrictions, or other payment issues.
        </p>
        


        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleRetryPayment}
          >
            <RefreshCw size={20} />
            Try Again
          </button>
          
          <button 
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={handleContinueShopping}
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </button>
          
          <button 
            className={`${styles.button} ${styles.tertiaryButton}`}
            onClick={handleGoHome}
          >
            <Home size={20} />
            Go to Home
          </button>
          

        </div>
      </div>
    </div>
  );
};

export default PaymentFailure; 