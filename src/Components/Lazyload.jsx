import React, { useEffect, useRef, useState } from "react";

// Simple placeholder component to prevent white flash
const Placeholder = ({ height = "200px", className = "" }) => (
  <div 
    className={`placeholder-glow ${className}`}
    style={{ 
      height, 
      backgroundColor: 'var(--bs-gray-200, #e9ecef)',
      borderRadius: '8px',
      opacity: 0.6
    }}
  />
);

const LazySection = ({ children, placeholder = null, placeholderHeight = "200px" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Small delay to ensure smooth transition
            setTimeout(() => setShouldRender(true), 100);
            observer.disconnect();
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before the element comes into view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Use custom placeholder or default one
  const defaultPlaceholder = <Placeholder height={placeholderHeight} />;
  const finalPlaceholder = placeholder || defaultPlaceholder;

  return (
    <div ref={ref}>
      {shouldRender ? (
        <div 
          style={{
            animation: 'fadeIn 0.3s ease-in-out',
            opacity: 1
          }}
        >
          {children}
        </div>
      ) : (
        finalPlaceholder
      )}
      
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LazySection;
