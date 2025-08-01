import React from 'react';
import './categoryCard.css';
import defaultImg from '../../assets/category.jpg';

const CategoryCard = ({ name, image }) => {
  return (
    <div className="category-card">
      <img
        src={image || defaultImg}
        alt={name}
        className="category-image"
        onError={(e) => {
          e.target.src = defaultImg;
        }}
      />
      <p className="category-title">{name}</p>
    </div>
  );
};

export default CategoryCard;
