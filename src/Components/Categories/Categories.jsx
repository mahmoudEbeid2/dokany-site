import React, { useEffect, useState, useCallback, useRef } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import sectionStyles from "../shared/SectionStyles.module.css";
import "./Categories.css";

const Categories = ({ subdomain }) => {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  console.log("Categories: Component rendered, isLoading:", isLoading, "subdomain:", subdomain);

  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      
      if (width <= 700) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };
    
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(categories.length / itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const getCurrentCategories = () => {
    const startIndex = currentSlide * itemsPerView;
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

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextSlide();
          break;
        case "Home":
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case "End":
          e.preventDefault();
          setCurrentSlide(totalSlides - 1);
          break;
        default:
          break;
      }
    },
    [prevSlide, nextSlide, totalSlides]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    // Show loader while waiting for subdomain
    if (!subdomain) {
      console.log("Categories: No subdomain, keeping loader visible");
      setIsLoading(true);
      return;
    }

    console.log("Categories: Fetching categories for subdomain:", subdomain);
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        console.log("Categories: Starting fetch...");
        const res = await fetch(
          `${import.meta.env.VITE_API}/categories/subdomain/${subdomain}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        console.log("Categories: Fetch successful, got", data.length, "categories");
        setCategories(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Categories: Fetch error:", error);
        }
      } finally {
        console.log("Categories: Setting loading to false");
        setIsLoading(false);
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, [subdomain]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [categories, subdomain]);

  // Show loader while loading OR while waiting for subdomain
  if (isLoading || !subdomain) {
    console.log("Categories: Showing loader - isLoading:", isLoading, "subdomain:", subdomain);
    return (
      <div className="categories-container">
        <h2 className="categories-header text-4xl font-bold text-center text-uppercase py-3">
          Shop by Categories
        </h2>
        <div className={sectionStyles.inlineLoader}>
          <div className={sectionStyles.inlineSpinner}></div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="categories-container">
        <h2 className="categories-header text-4xl font-bold text-center text-uppercase py-3">
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
          <div className="categories-slider-track d-flex justify-center">
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
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              className={`indicator ${
                i === currentSlide ? "active" : ""
              }`}
              onClick={() => {
                setCurrentSlide(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
