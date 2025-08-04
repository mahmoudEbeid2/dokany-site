import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyTheme } from '../../utils/themes';
import { updateTheme } from '../../features/seller/sellerSlice';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const sellerInfo = useSelector((state) => state.seller.sellerInfo);
  const currentTheme = sellerInfo?.theme?.name || 'light';
  
  const themes = ['light', 'dark', 'beige'];
  const themeIcons = {
    light: '☀️',
    dark: '🌙',
    beige: '🟫'
  };
  
  const handleThemeToggle = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    
    // Apply theme to DOM
    applyTheme(newTheme);
    
    // Update theme in Redux store
    dispatch(updateTheme(newTheme));
  };
  
  return (
    <button 
      className="theme-toggle-btn"
      onClick={handleThemeToggle}
      title={`Switch to ${themes[(themes.indexOf(currentTheme) + 1) % themes.length]} theme`}
    >
      {themeIcons[currentTheme]}
    </button>
  );
};

export default ThemeSwitcher; 