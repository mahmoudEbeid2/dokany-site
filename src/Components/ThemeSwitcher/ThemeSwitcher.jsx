import React from 'react';
import { useSelector } from 'react-redux';
import { applyTheme } from '../../utils/themes';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const sellerInfo = useSelector((state) => state.seller.sellerInfo);
  const currentTheme = sellerInfo?.theme?.name || 'light';
  
  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };
  
  return (
    <button 
      className="theme-toggle-btn"
      onClick={handleThemeToggle}
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      {currentTheme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeSwitcher; 