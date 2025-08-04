import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyTheme } from '../utils/themes';

export const useThemeManager = () => {
  const sellerInfo = useSelector((state) => state.seller.sellerInfo);
  
  useEffect(() => {
    // تطبيق الثيم بناءً على بيانات السيلر
    if (sellerInfo && sellerInfo.theme && sellerInfo.theme.name) {
      applyTheme(sellerInfo.theme.name);
    } else {
      // تطبيق الثيم الافتراضي (light)
      applyTheme('light');
    }
  }, [sellerInfo]);
  
  return {
    currentTheme: sellerInfo?.theme?.name || 'light'
  };
}; 