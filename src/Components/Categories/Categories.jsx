import React, { useEffect, useState } from "react";
import CategoryCard from "../categoryCard/CategoryCard";
import "./Categories.css";

const Categories = ({ subdomain }) => {
  const [categories, setCategories] = useState([]);
  const handleCategoryClick = (id) => {
    console.log("Category ID:", id);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API}/categories/subdomain/${subdomain}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      <h2 className="categories-header py-5 display-5 fw-bold  ">
        Shop by Categories
      </h2>

      <div className="categories-content">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            onClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
