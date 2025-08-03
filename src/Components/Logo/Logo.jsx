import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Logo.css';

const Logo = ({ 
  variant = 'navbar', // 'navbar' or 'footer'
  className = '',
  onClick = null,
  showText = true 
}) => {
  const { sellerInfo } = useSelector((state) => state.seller);
  const [imageError, setImageError] = useState(false);

  // تحديد الأحجام بناءً على النوع
  const getLogoStyles = () => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      overflow: 'hidden',
      borderRadius: '4px',
      backgroundColor: 'transparent',
      flexShrink: 0
    };

    if (variant === 'navbar') {
      return {
        ...baseStyles,
        maxWidth: '120px',
        maxHeight: '60px',
        minWidth: '80px',
        minHeight: '40px',
        width: 'auto',
        height: 'auto',
        transform: 'scale(1.4)', // تكبير اللوجو في النافبار
        transformOrigin: 'center'
      };
    } else if (variant === 'footer') {
      return {
        ...baseStyles,
        maxWidth: '100px',
        maxHeight: '80px',
        minWidth: '60px',
        minHeight: '50px',
        width: 'auto',
        height: 'auto',
        transform: 'scale(1.5)', // تكبير اللوجو في الفوتر
        transformOrigin: 'center'
      };
    }

    return baseStyles;
  };

  const getImageStyles = () => {
    const baseImageStyles = {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      display: 'block'
    };

    if (variant === 'navbar') {
      return {
        ...baseImageStyles,
        maxHeight: '50px',
        maxWidth: '100%'
      };
    } else if (variant === 'footer') {
      return {
        ...baseImageStyles,
        maxHeight: '70px',
        maxWidth: '100%'
      };
    }

    return baseImageStyles;
  };

  const getTextStyles = () => {
    const baseTextStyles = {
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 0,
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: 'var(--primary-color, #007bff)',
      color: 'white',
      textDecoration: 'none',
      display: 'block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };

    if (variant === 'navbar') {
      return {
        ...baseTextStyles,
        fontSize: '1rem',
        lineHeight: '1.2',
        maxWidth: '100px'
      };
    } else if (variant === 'footer') {
      return {
        ...baseTextStyles,
        fontSize: '1.2rem',
        lineHeight: '1.3',
        maxWidth: '120px'
      };
    }

    return baseTextStyles;
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const logoContent = sellerInfo?.logo && !imageError ? (
    <img 
      src={sellerInfo.logo} 
      alt={`${sellerInfo.subdomain || 'Dockany'} Logo`} 
      style={getImageStyles()}
      onError={() => {
        setImageError(true);
      }}
    />
  ) : null;

  const textContent = showText && (imageError || !sellerInfo?.logo) && (
    <span style={getTextStyles()}>
      {sellerInfo?.subdomain || "Dockany"}
    </span>
  );

  // Reset states when sellerInfo changes
  useEffect(() => {
    if (sellerInfo?.logo) {
      setImageError(false);
    }
  }, [sellerInfo?.logo]);

  return (
    <div 
      className={`logo-container ${variant}-logo ${className} ${imageError ? 'error' : ''}`}
      style={getLogoStyles()}
      onClick={handleClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : -1}
      aria-label={`${sellerInfo?.subdomain || 'Dockany'} Logo`}
    >
      {logoContent}
      {textContent}
    </div>
  );
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['navbar', 'footer']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  showText: PropTypes.bool
};

export default Logo; 