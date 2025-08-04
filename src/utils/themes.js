// تعريف الثيمين مع فصل كامل لكل العناصر
export const themes = {
  light: {
    name: 'light',
    colors: {
      // الألوان الأساسية
      '--bg': '#ffffff',
      '--text': '#121212',
      '--text-gray': '#6c7275',
      '--text2': '#377dff',
      '--hover': '#434141',
      
      // Hero Section - Light Theme مع تدرج أبيض وأزرق وسماوي وفضي
      '--hero-bg': 'linear-gradient(135deg, #ffffff 0%, #3b82f6 25%, #0ea5e9 50%, #94a3b8 75%, #cbd5e1 100%)',
      '--hero-text': '#1e293b',
      '--hero-description': 'rgba(30, 41, 59, 0.9)',
      '--hero-btn-bg': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      '--hero-btn-text': '#ffffff',
      '--hero-btn-hover-bg': 'linear-gradient(135deg, #334155 0%, #475569 100%)',
      '--hero-btn-hover-text': '#ffffff',
      '--hero-overlay': 'rgba(255, 255, 255, 0.1)',
      
      // NavBar - Light Theme
      '--navbar-bg': '#ffffff',
      '--navbar-border': '#e2e8f0',
      '--navbar-text': '#121212',
      '--navbar-text-hover': '#377dff',
      '--navbar-active': '#377dff',
      '--navbar-toggler': '#121212',
      '--navbar-toggler-border': '#d1d5db',
      '--navbar-link-border': 'transparent', // بوردر شفاف للينكات
      
      // Cards & Components
      '--card-bg': '#ffffff',
      '--card-border': '#e2e8f0',
      '--card-shadow': '0 0.1rem 0.2rem rgba(0, 0, 0, 0.05)',
      
      // Buttons
      '--btn-primary': '#377dff',
      '--btn-primary-hover': '#2563eb',
      '--btn-secondary': '#f3f4f6',
      '--btn-secondary-hover': '#e5e7eb',
      '--btn-text': '#ffffff',
      
      // Add to Cart Button - Light Theme
      '--add-to-cart-bg': '#377dff',
      '--add-to-cart-hover-bg': '#2563eb',
      '--add-to-cart-text': '#ffffff',
      '--add-to-cart-shadow': '0 2px 4px rgba(55, 125, 255, 0.2)',
      '--add-to-cart-shadow-hover': '0 4px 8px rgba(55, 125, 255, 0.3)',
      
      // Forms & Inputs
      '--input-bg': '#ffffff',
      '--input-border': '#d1d5db',
      '--input-focus': '#377dff',
      '--input-text': '#121212',
      
      // Counter & Badges
      '--counter-bg': '#f5f5f5',
      '--counter-text': '#ffffff',
      
      // Secondary Colors
      '--secondary-color': '#38cb89',
      '--secondary-bg': '#f3f5f7',
      
      // Footer - Light Theme
      '--footer-bg': '#f8fafc',
      '--footer-text': '#374151',
      '--footer-link': '#377dff',
      '--footer-link-hover': '#2563eb',
      '--footer-border': '#e5e7eb',
      '--footer-icon': '#6b7280',
      '--footer-icon-hover': '#377dff',
      
      // Cart & Account Pages
      '--page-bg': '#f8fafc',
      '--section-bg': '#ffffff',
      '--border-color': '#e2e8f0',
      '--text-muted': '#6c7275',
      '--text-primary': '#121212',
      '--text-secondary': '#6c7275',
      
      // Product Cards - Light Theme كاملة
      '--product-card-bg': '#ffffff',
      '--product-card-border': '#e2e8f0',
      '--product-card-shadow': '0 2px 8px rgba(0, 0, 0, 0.1)',
      '--product-card-shadow-hover': '0 8px 25px rgba(0, 0, 0, 0.15)',
      '--product-price': '#377dff',
      '--product-price-old': '#6c7275',
      '--product-title': '#121212',
      '--product-description': '#6c7275',
      '--product-image-bg': '#f8fafc',
      
      // Stars - Light Theme (سوداء للمليان، رمادية للفارغة)
      '--star-filled': '#000000',
      '--star-empty': '#e5e7eb', // رمادي فاتح بدلاً من أبيض
      '--star-empty-border': '#d1d5db', // border رمادي أغمق
      '--star-size': '16px',
      
      // Icons - Light Theme محسنة
      '--icon-color': '#6c7275',
      '--icon-bg': '#ffffff',
      '--icon-hover-bg': '#377dff',
      '--icon-hover-color': '#ffffff',
      '--icon-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
      '--icon-shadow-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
      
      // Badges - Light Theme محسنة
      '--badge-new-bg': '#38cb89',
      '--badge-discount-bg': '#ff6b6b',
      '--badge-text': '#ffffff',
      
      // Category Cards
      '--category-card-bg': '#ffffff',
      '--category-card-border': '#e2e8f0',
      '--category-title': '#121212',
      '--category-text': '#6c7275',
      '--category-count': '#377dff',
      
      // Tables
      '--table-bg': '#ffffff',
      '--table-border': '#e2e8f0',
      '--table-header-bg': '#f8fafc',
      '--table-row-hover': '#f1f5f9',
      
      // Design System Colors
      '--bg-primary': '#ffffff',
      '--primary-600': '#377dff',
      
      // Modal
      '--modal-bg': '#ffffff',
      '--modal-close-bg': '#ef4444',
      '--modal-close-text': '#ffffff',
      '--modal-close-hover-bg': '#dc2626',

      // Carousel Indicators - Light Theme واضحة
      '--indicator-bg': '#e5e7eb',
      '--indicator-active': '#377dff',
      '--indicator-hover': '#d1d5db',

      // View More Button - Light Theme
      '--view-more-btn-bg': '#377dff',
      '--view-more-btn-text': '#ffffff',
      '--view-more-btn-hover-bg': '#2563eb',
      '--view-more-btn-hover-text': '#ffffff',
      '--view-more-btn-border': '#377dff',
      '--view-more-btn-shadow': '0 4px 12px rgba(55, 125, 255, 0.3)',
      '--view-more-btn-shadow-hover': '0 6px 16px rgba(55, 125, 255, 0.4)',

      // Shop Page Hero - Light Theme
      '--shop-hero-bg': 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 33%, #94a3b8 66%, #64748b 100%)',
      '--shop-hero-text': '#ffffff',
      '--shop-hero-subtitle': '#ffffff',
      
      // Shop Form Elements - Light Theme
      '--form-label': '#121212',
      '--form-input-bg': '#ffffff',
      '--form-input-border': '#d1d5db',
      '--form-input-text': '#121212',
      '--form-input-placeholder': '#6b7280',
      '--form-input-focus-border': '#377dff',
      '--form-input-focus-shadow': '0 0 0 3px rgba(55, 125, 255, 0.1)',

      // Orders History - Light Theme
      '--orders-bg': '#ffffff',
      '--orders-title': '#121212',
      '--orders-table-header': '#6c7275',
      '--orders-table-border': '#e2e8f0',
      '--orders-row-text': '#121212',
      '--orders-row-border': '#f1f5f9',
      '--orders-status-pending': '#f59e0b',
      '--orders-status-completed': '#10b981',
      '--orders-status-cancelled': '#ef4444',
      
      // Cart Page - Light Theme
      '--cart-bg': '#ffffff',
      '--cart-container-bg': 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      '--cart-title': '#1a1a1a',
      '--cart-title-underline': '#1a1a1a',
      '--cart-table-bg': '#ffffff',
      '--cart-table-header-bg': 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      '--cart-table-header-text': '#6b7280',
      '--cart-table-border': '#e5e7eb',
      '--cart-row-bg': '#ffffff',
      '--cart-row-hover': '#fafafa',
      '--cart-row-text': '#1a1a1a',
      '--cart-product-title': '#1a1a1a',
      '--cart-remove-btn': '#ef4444',
      '--cart-remove-btn-hover': '#dc2626',
      '--cart-remove-btn-bg-hover': '#fef2f2',
      '--cart-quantity-btn': '#1a1a1a',
      '--cart-quantity-btn-bg': '#ffffff',
      '--cart-quantity-btn-hover': '#ffffff',
      '--cart-quantity-btn-hover-text': '#1a1a1a',
      '--cart-quantity-number': '#1a1a1a',
      '--cart-price': '#6b7280',
      '--cart-subtotal': '#1a1a1a',
      '--cart-total-container-bg': '#ffffff',
      '--cart-total-title': '#1a1a1a',
      '--cart-total-price': '#1a1a1a',
      '--cart-checkout-btn': '#1a1a1a',
      '--cart-checkout-btn-text': '#ffffff',
      '--cart-empty-bg': '#ffffff',
      '--cart-empty-title': '#1a1a1a',
      '--cart-empty-text': '#6b7280',
      '--cart-error-bg': '#ffffff',
      '--cart-error-title': '#1a1a1a',
      '--cart-error-text': '#6b7280',
      '--cart-retry-btn': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      '--cart-retry-btn-text': '#ffffff',
      
      // Sign In & Sign Up Pages - Light Theme
      '--signin-bg': '#ffffff',
      '--signin-container-bg': '#ffffff',
      '--signin-form-bg': '#ffffff',
      '--signin-title': '#1e293b',
      '--signin-label': '#374151',
      '--signin-input-bg': '#ffffff',
      '--signin-input-border': '#d1d5db',
      '--signin-input-focus-border': '#3b82f6',
      '--signin-input-text': '#1e293b',
      '--signin-input-placeholder': '#9ca3af',
      '--signin-btn-bg': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      '--signin-btn-text': '#ffffff',
      '--signin-btn-hover': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      '--signin-btn-shadow': '0 4px 12px rgba(59, 130, 246, 0.3)',
      '--signin-link': '#3b82f6',
      '--signin-link-hover': '#2563eb',
      '--signin-error': '#ef4444',
      '--signin-text': '#6b7280',
      '--signin-checkbox': '#3b82f6',
      '--signin-remember-text': '#6b7280',
      '--signin-forgot-link': '#1e293b',
      '--signin-forgot-hover': '#3b82f6',
      '--signin-terms-text': '#6b7280',
      '--signin-terms-link': '#1e293b',
      '--signin-terms-hover': '#3b82f6',
      
      // Sign Up specific colors
      '--signup-profile-border': '#d1d5db',
      '--signup-profile-hover': '#3b82f6',
      '--signup-profile-text': '#6b7280',
      '--signup-bg': '#ffffff',
      '--signup-container-bg': '#ffffff',
      '--signup-form-bg': '#ffffff',
      '--signup-title': '#1e293b',
      '--signup-label': '#374151',
      '--signup-input-bg': '#ffffff',
      '--signup-input-border': '#d1d5db',
      '--signup-input-focus-border': '#3b82f6',
      '--signup-input-text': '#1e293b',
      '--signup-input-placeholder': '#9ca3af',
      '--signup-btn-bg': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      '--signup-btn-text': '#ffffff',
      '--signup-btn-hover': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      '--signup-btn-shadow': '0 4px 12px rgba(59, 130, 246, 0.3)',
      '--signup-link': '#3b82f6',
      '--signup-link-hover': '#2563eb',
      '--signup-error': '#ef4444',
      '--signup-text': '#6b7280',
      '--signup-checkbox': '#3b82f6',
      
      // Privacy Policy Page - Light Theme
      '--privacy-bg': 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      '--privacy-container-bg': '#ffffff',
      '--privacy-header-border': '#e8e8e8',
      '--privacy-title': '#141718',
      '--privacy-subtitle': '#6c7275',
      '--privacy-intro': '#4a5568',
      '--privacy-section-title': '#141718',
      '--privacy-section-border': '#000000',
      '--privacy-section-border-accent': 'linear-gradient(90deg, #000000, #333333)',
      '--privacy-text': '#4a5568',
      '--privacy-bullet': '#000000',
      '--privacy-strong': '#141718',
      '--privacy-contact-bg': 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      '--privacy-contact-border': '#000000',
      '--privacy-btn-bg': 'linear-gradient(135deg, #000000 0%, #333333 100%)',
      '--privacy-btn-text': '#ffffff',
      '--privacy-btn-hover-bg': 'linear-gradient(135deg, #333333 0%, #000000 100%)',
      '--privacy-btn-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
      '--privacy-btn-shadow-hover': '0 6px 20px rgba(0, 0, 0, 0.25)',
      '--privacy-footer-note': '#6c7275',
    }
  },
  dark: {
    name: 'dark',
    colors: {
      // الألوان الأساسية - محسنة للقراءة
      '--bg': '#0f172a',
      '--text': '#f8fafc',
      '--text-gray': '#cbd5e1',
      '--text2': '#60a5fa',
      '--hover': '#e2e8f0',
      
      // Hero Section - Dark Theme محسن
      '--hero-bg': 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #334155 100%)',
      '--hero-text': '#ffffff',
      '--hero-description': 'rgba(255, 255, 255, 0.85)',
      '--hero-btn-bg': 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
      '--hero-btn-text': '#ffffff',
      '--hero-btn-hover-bg': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      '--hero-btn-hover-text': '#ffffff',
      '--hero-btn-border': 'rgba(96, 165, 250, 0.3)',
      '--hero-overlay': 'rgba(0, 0, 0, 0.2)',
      
      // NavBar - محسنة
      '--navbar-bg': '#1e293b',
      '--navbar-border': '#334155',
      '--navbar-text': '#f1f5f9',
      '--navbar-text-hover': '#60a5fa',
      '--navbar-active': '#60a5fa',
      '--navbar-toggler': '#f1f5f9',
      '--navbar-toggler-border': '#475569',
      '--navbar-link-border': 'transparent', // بوردر شفاف للينكات
      
      // Cards & Components
      '--card-bg': '#1e293b',
      '--card-border': '#334155',
      '--card-shadow': '0 0.1rem 0.2rem rgba(0, 0, 0, 0.3)',
      
      // Buttons
      '--btn-primary': '#3b82f6',
      '--btn-primary-hover': '#2563eb',
      '--btn-secondary': '#334155',
      '--btn-secondary-hover': '#475569',
      '--btn-text': '#ffffff',
      
      // Add to Cart Button - Dark Theme
      '--add-to-cart-bg': '#3b82f6',
      '--add-to-cart-hover-bg': '#2563eb',
      '--add-to-cart-text': '#ffffff',
      '--add-to-cart-shadow': '0 2px 4px rgba(59, 130, 246, 0.3)',
      '--add-to-cart-shadow-hover': '0 4px 8px rgba(59, 130, 246, 0.4)',
      
      // Forms & Inputs - محسنة
      '--input-bg': '#1e293b',
      '--input-border': '#475569',
      '--input-focus': '#3b82f6',
      '--input-text': '#f8fafc',
      
      // Counter & Badges
      '--counter-bg': '#334155',
      '--counter-text': '#f1f5f9',
      
      // Secondary Colors
      '--secondary-color': '#10b981',
      '--secondary-bg': '#1e293b',
      
      // Footer - Dark Theme
      '--footer-bg': '#0f172a',
      '--footer-text': '#cbd5e1',
      '--footer-link': '#60a5fa',
      '--footer-link-hover': '#93c5fd',
      '--footer-border': '#334155',
      '--footer-icon': '#94a3b8',
      '--footer-icon-hover': '#60a5fa',
      
      // Cart & Account Pages - محسنة للقراءة
      '--page-bg': '#0f172a',
      '--section-bg': '#1e293b',
      '--border-color': '#334155',
      '--text-muted': '#94a3b8',
      '--text-primary': '#f8fafc',
      '--text-secondary': '#cbd5e1',
      
      // Product Cards - Dark Theme كاملة
      '--product-card-bg': '#1e293b',
      '--product-card-border': '#334155',
      '--product-card-shadow': '0 2px 8px rgba(0, 0, 0, 0.3)',
      '--product-card-shadow-hover': '0 8px 25px rgba(0, 0, 0, 0.4)',
      '--product-price': '#fbbf24', // لون ذهبي للسعر في الدارك
      '--product-price-old': '#94a3b8',
      '--product-title': '#f1f5f9',
      '--product-description': '#cbd5e1',
      '--product-image-bg': '#0f172a',
      
      // Stars - Dark Theme (بيضاء للمليان، سوداء للفارغة)
      '--star-filled': '#ffffff',
      '--star-empty': '#000000',
      '--star-size': '16px',
      
      // Icons - Dark Theme محسنة
      '--icon-color': '#cbd5e1',
      '--icon-bg': '#1e293b',
      '--icon-hover-bg': '#60a5fa',
      '--icon-hover-color': '#ffffff',
      '--icon-shadow': '0 2px 4px rgba(0, 0, 0, 0.3)',
      '--icon-shadow-hover': '0 4px 8px rgba(0, 0, 0, 0.4)',
      
      // Badges - Dark Theme محسنة
      '--badge-new-bg': '#059669',
      '--badge-discount-bg': '#dc2626',
      '--badge-text': '#ffffff',
      
      // Category Cards - محسنة للقراءة
      '--category-card-bg': '#1e293b',
      '--category-card-border': '#334155',
      '--category-title': '#f8fafc',
      '--category-text': '#cbd5e1',
      '--category-count': '#60a5fa',
      
      // Tables - محسنة
      '--table-bg': '#1e293b',
      '--table-border': '#334155',
      '--table-header-bg': '#0f172a',
      '--table-row-hover': '#334155',
      
      // Design System Colors - محسنة للدارك
      '--bg-primary': '#1e293b',
      '--primary-600': '#60a5fa',
      
      // Modal
      '--modal-bg': '#1e293b',
      '--modal-close-bg': '#ef4444',
      '--modal-close-text': '#ffffff',
      '--modal-close-hover-bg': '#dc2626',

      // Carousel Indicators - Dark Theme واضحة
      '--indicator-bg': '#374151',
      '--indicator-active': '#60a5fa',
      '--indicator-hover': '#4b5563',

      // View More Button - Dark Theme
      '--view-more-btn-bg': '#60a5fa',
      '--view-more-btn-text': '#ffffff',
      '--view-more-btn-hover-bg': '#3b82f6',
      '--view-more-btn-hover-text': '#ffffff',
      '--view-more-btn-border': '#60a5fa',
      '--view-more-btn-shadow': '0 4px 12px rgba(96, 165, 250, 0.3)',
      '--view-more-btn-shadow-hover': '0 6px 16px rgba(96, 165, 250, 0.4)',

      // Category Products Page - Dark Theme
      '--category-page-bg': '#0f172a',
      '--category-title': '#f1f5f9',
      '--category-empty-bg': '#1e293b',
      '--category-empty-text': '#94a3b8',
      '--category-load-btn-bg': '#1e293b',
      '--category-load-btn-text': '#f1f5f9',
      '--category-load-btn-hover-bg': '#334155',
      '--category-load-btn-hover-text': '#ffffff',

      // Shop Page Hero - Dark Theme
      '--shop-hero-bg': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      '--shop-hero-text': '#f1f5f9',
      '--shop-hero-subtitle': '#cbd5e1',
      
      // Shop Form Elements - Dark Theme
      '--form-label': '#f1f5f9',
      '--form-input-bg': '#1e293b',
      '--form-input-border': '#475569',
      '--form-input-text': '#f1f5f9',
      '--form-input-placeholder': '#94a3b8',
      '--form-input-focus-border': '#60a5fa',
      '--form-input-focus-shadow': '0 0 0 3px rgba(96, 165, 250, 0.1)',

      // Contact Page - Dark Theme
      '--contact-info-bg': '#1e293b',
      '--contact-info-border': '#334155',
      '--contact-info-hover-bg': '#334155',
      '--contact-info-hover-border': '#60a5fa',
      '--contact-title': '#94a3b8',
      '--contact-method': '#f1f5f9',
      '--contact-icon-bg': '#60a5fa',
      '--contact-icon-color': '#ffffff',

      // Orders History - Dark Theme
      '--orders-bg': '#1e293b',
      '--orders-title': '#f1f5f9',
      '--orders-table-header': '#94a3b8',
      '--orders-table-border': '#334155',
      '--orders-row-text': '#f1f5f9',
      '--orders-row-border': '#334155',
      '--orders-status-pending': '#fbbf24',
      '--orders-status-completed': '#34d399',
      '--orders-status-cancelled': '#f87171',
      
      // Cart Page - Dark Theme
      '--cart-bg': '#1e293b',
      '--cart-container-bg': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      '--cart-title': '#f1f5f9',
      '--cart-title-underline': '#f1f5f9',
      '--cart-table-bg': '#334155',
      '--cart-table-header-bg': 'linear-gradient(135deg, #475569 0%, #334155 100%)',
      '--cart-table-header-text': '#94a3b8',
      '--cart-table-border': '#475569',
      '--cart-row-bg': '#334155',
      '--cart-row-hover': '#475569',
      '--cart-row-text': '#f1f5f9',
      '--cart-product-title': '#f1f5f9',
      '--cart-remove-btn': '#f87171',
      '--cart-remove-btn-hover': '#ef4444',
      '--cart-remove-btn-bg-hover': '#7f1d1d',
      '--cart-quantity-btn': '#f1f5f9',
      '--cart-quantity-btn-bg': '#475569',
      '--cart-quantity-btn-hover': '#f1f5f9',
      '--cart-quantity-btn-hover-text': '#1e293b',
      '--cart-quantity-number': '#f1f5f9',
      '--cart-price': '#94a3b8',
      '--cart-subtotal': '#f1f5f9',
      '--cart-total-container-bg': '#334155',
      '--cart-total-title': '#f1f5f9',
      '--cart-total-price': '#f1f5f9',
      '--cart-checkout-btn': '#f1f5f9',
      '--cart-checkout-btn-text': '#1e293b',
      '--cart-empty-bg': '#334155',
      '--cart-empty-title': '#f1f5f9',
      '--cart-empty-text': '#94a3b8',
      '--cart-error-bg': '#334155',
      '--cart-error-title': '#f1f5f9',
      '--cart-error-text': '#94a3b8',
      '--cart-retry-btn': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      '--cart-retry-btn-text': '#ffffff',
      
      // Sign In & Sign Up Pages - Dark Theme
      '--signin-bg': '#0f172a',
      '--signin-container-bg': '#1e293b',
      '--signin-form-bg': '#1e293b',
      '--signin-title': '#f1f5f9',
      '--signin-label': '#cbd5e1',
      '--signin-input-bg': '#334155',
      '--signin-input-border': '#475569',
      '--signin-input-focus-border': '#60a5fa',
      '--signin-input-text': '#f1f5f9',
      '--signin-input-placeholder': '#94a3b8',
      '--signin-btn-bg': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      '--signin-btn-text': '#ffffff',
      '--signin-btn-hover': 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      '--signin-btn-shadow': '0 4px 12px rgba(14, 165, 233, 0.3)',
      '--signin-link': '#60a5fa',
      '--signin-link-hover': '#93c5fd',
      '--signin-error': '#f87171',
      '--signin-text': '#94a3b8',
      '--signin-checkbox': '#60a5fa',
      '--signin-remember-text': '#94a3b8',
      '--signin-forgot-link': '#f1f5f9',
      '--signin-forgot-hover': '#60a5fa',
      '--signin-terms-text': '#94a3b8',
      '--signin-terms-link': '#f1f5f9',
      '--signin-terms-hover': '#60a5fa',
      
      // Sign Up specific colors
      '--signup-profile-border': '#475569',
      '--signup-profile-hover': '#60a5fa',
      '--signup-profile-text': '#94a3b8',
      '--signup-bg': '#0f172a',
      '--signup-container-bg': '#1e293b',
      '--signup-form-bg': '#1e293b',
      '--signup-title': '#f1f5f9',
      '--signup-label': '#cbd5e1',
      '--signup-input-bg': '#334155',
      '--signup-input-border': '#475569',
      '--signup-input-focus-border': '#60a5fa',
      '--signup-input-text': '#f1f5f9',
      '--signup-input-placeholder': '#94a3b8',
      '--signup-btn-bg': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      '--signup-btn-text': '#ffffff',
      '--signup-btn-hover': 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      '--signup-btn-shadow': '0 4px 12px rgba(14, 165, 233, 0.3)',
      '--signup-link': '#60a5fa',
      '--signup-link-hover': '#93c5fd',
      '--signup-error': '#f87171',
      '--signup-text': '#94a3b8',
      '--signup-checkbox': '#60a5fa',
      
      // Privacy Policy Page - Dark Theme
      '--privacy-bg': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      '--privacy-container-bg': '#1e293b',
      '--privacy-header-border': '#334155',
      '--privacy-title': '#f1f5f9',
      '--privacy-subtitle': '#94a3b8',
      '--privacy-intro': '#cbd5e1',
      '--privacy-section-title': '#f1f5f9',
      '--privacy-section-border': '#60a5fa',
      '--privacy-section-border-accent': 'linear-gradient(90deg, #60a5fa, #3b82f6)',
      '--privacy-text': '#cbd5e1',
      '--privacy-bullet': '#60a5fa',
      '--privacy-strong': '#f1f5f9',
      '--privacy-contact-bg': 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
      '--privacy-contact-border': '#60a5fa',
      '--privacy-btn-bg': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      '--privacy-btn-text': '#ffffff',
      '--privacy-btn-hover-bg': 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      '--privacy-btn-shadow': '0 4px 12px rgba(14, 165, 233, 0.3)',
      '--privacy-btn-shadow-hover': '0 6px 20px rgba(14, 165, 233, 0.4)',
      '--privacy-footer-note': '#94a3b8',
    }
  }
};

// دالة تطبيق الثيم
export const applyTheme = (themeName) => {
  const theme = themes[themeName] || themes.light;
  const root = document.documentElement;
  
  // تطبيق الألوان
  Object.entries(theme.colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  console.log(`Theme applied: ${theme.name}`);
}; 