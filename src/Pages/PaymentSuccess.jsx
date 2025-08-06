import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag, ArrowLeft, Package } from 'lucide-react';
import styles from './PaymentSuccess.module.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleContinueShopping = () => {
    navigate('/shoppage');
  };

  const handleViewOrders = () => {
    navigate('/myaccount/orders');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <CheckCircle className={styles.successIcon} />
        </div>
        
        <h1 className={styles.title}>Payment Successful!</h1>
        
        <p className={styles.message}>
          Thank you for your purchase! Your order has been confirmed and will be processed shortly.
        </p>
        


        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleGoHome}
          >
            <Home size={20} />
            Go to Home
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
            onClick={handleViewOrders}
          >
            <Package size={20} />
            View Orders
          </button>

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 