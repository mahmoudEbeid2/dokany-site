import React from 'react';
import './categoryCard.css';
import categoryImg from '../../assets/category.jpg';

const CategoryCard = () => {
  return (
    <div className="category-card">
      <img src={categoryImg} alt="Category" className="category-image" />
      <p className="category-title">Category Name</p>
    </div>
  );
};

export default CategoryCard;
