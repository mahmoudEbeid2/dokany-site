import React from 'react';
import styles from './ReviewSection.module.css';

const ReviewsSectionPlaceholder = () => {
  return (
    <div className="container mt-5">
      {/* Add Review Form Placeholder */}
      <div className="mb-5">
        <div className="placeholder-glow">
          <div className="h4 placeholder col-6 mb-3"></div>
          <div className="placeholder col-12 mb-2" style={{ height: '40px' }}></div>
          <div className="placeholder col-8 mb-2" style={{ height: '100px' }}></div>
          <div className="placeholder col-3" style={{ height: '40px' }}></div>
        </div>
      </div>

      {/* Reviews Section Placeholder */}
      <div className={styles.reviewsSection}>
        <div className="placeholder-glow">
          <div className="h4 placeholder col-4 mb-4"></div>
          
          {/* Review Cards Placeholder */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="card mb-3 p-3">
              <div className="d-flex align-items-center mb-2">
                <div className="placeholder rounded-circle me-3" style={{ width: '40px', height: '40px' }}></div>
                <div className="flex-grow-1">
                  <div className="placeholder col-6 mb-1" style={{ height: '16px' }}></div>
                  <div className="placeholder col-4" style={{ height: '14px' }}></div>
                </div>
              </div>
              <div className="placeholder col-12 mb-2" style={{ height: '16px' }}></div>
              <div className="placeholder col-10" style={{ height: '14px' }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSectionPlaceholder;
