import React from 'react';
import sectionStyles from '../../shared/SectionStyles.module.css';
import gridStyles from '../ProductGrid.module.css';

const RecommendedProductsPlaceholder = () => {
  return (
    <div style={{ 
      margin: '5rem auto',
      padding: '4rem 2rem',
      maxWidth: '1400px'
    }}>
      {/* Section Header Placeholder */}
      <div className={sectionStyles.sectionHeader}>
        <div className={sectionStyles.sectionTitle}>
          <div className="placeholder-glow">
            <div className="placeholder col-6 mx-auto" style={{ height: '48px' }}></div>
          </div>
        </div>
      </div>
      
      {/* Product Grid Placeholder */}
      <div className={gridStyles.productGrid}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div key={index}>
            <div className="card h-100">
              <div className="placeholder-glow">
                <div className="placeholder" style={{ height: '200px' }}></div>
                <div className="card-body">
                  <div className="placeholder col-8 mb-2" style={{ height: '20px' }}></div>
                  <div className="placeholder col-6 mb-2" style={{ height: '16px' }}></div>
                  <div className="placeholder col-4" style={{ height: '24px' }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProductsPlaceholder;
