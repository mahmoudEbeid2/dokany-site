import React, { useEffect, useState, useCallback, useRef } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import "./Categories.css";

const Categories = ({ subdomain }) => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);



  const itemsPerView = 5;
  const totalSlides = Math.ceil(categories.length / itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const getCurrentCategories = () => {
    const startIndex = currentIndex * itemsPerView;
    return categories.slice(startIndex, startIndex + itemsPerView);
  };


  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        break;
      case 'Home':
        e.preventDefault();
        setCurrentIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setCurrentIndex(totalSlides - 1);
        break;
      default:
        break;
    }
  }, [prevSlide, nextSlide, setCurrentIndex, totalSlides]);


  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/categories/subdomain/${subdomain}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, [subdomain]);


  if (isLoading) {
    return (
      <div className="categories-container">
        <h2 className="categories-header text-3xl mainHeaderHome font-bold text-center text-uppercase py-3">
          Shop by Categories
        </h2>
        <div className="flex justify-center items-center py-16">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="categories-container">
        <h2 className="categories-header text-3xl mainHeaderHome font-bold text-center text-uppercase py-3">
          Shop by Categories
        </h2>
        <div className="text-center py-16 text-gray-500">
          No categories available
        </div>
      </div>
    );
  }

  return (
    <div className="categories-container">
      <h2 className="categories-header text-4xl font-bold text-center text-uppercase py-3">
        Shop by Categories
      </h2>

      <div
        ref={sliderRef}
        className="categories-slider-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="categories-slider-content">
          <div className="categories-slider-track">
            {getCurrentCategories().map((category) => (
              <div key={category.id} className="category-slide-item">
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  image={category.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalSlides > 1 && (
        <div className="slider-indicators">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              className={`slider-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {totalSlides > 1 && (
        <div className="sr-only">
          <p>Use arrow keys to navigate between categories. Press Home to go to first slide, End to go to last slide.</p>
          <p>Slide {currentIndex + 1} of {totalSlides}</p>
        </div>
      )}
    </div>
  );
};

export default Categories;