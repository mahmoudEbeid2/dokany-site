import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyTheme } from '../utils/themes';

export const useThemeManager = () => {
  // Safely get seller info from Redux
  const sellerInfo = useSelector((state) => state.seller?.sellerInfo);
  
  useEffect(() => {
    // Apply theme with fallback
    const applyThemeSafely = () => {
      try {
        if (sellerInfo && sellerInfo.theme && sellerInfo.theme.name) {
          applyTheme(sellerInfo.theme.name);
        } else {
          // Default to light theme if no seller info or theme
          applyTheme('light');
        }
      } catch (error) {
        console.warn('Theme application failed:', error);
        // Fallback to light theme
        try {
          applyTheme('light');
        } catch (fallbackError) {
          console.error('Fallback theme application also failed:', fallbackError);
        }
      }
    };
    
    // Apply theme after a small delay to ensure DOM is ready
    const timer = setTimeout(applyThemeSafely, 100);
    
    return () => clearTimeout(timer);
  }, [sellerInfo]);
  
  return {
    currentTheme: sellerInfo?.theme?.name || 'light'
  };
}; 