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
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          image={category.image}
          id={category.id}
          onClick={handleCategoryClick}
        />
      ))}
    </div>
  );
};

export default Categories;
