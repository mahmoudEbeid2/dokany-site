import React from 'react';
import './categoryCard.css';
import categoryImg from '../../assets/category.jpg';

const CategoryCard = ({ name, image, id, onClick }) => {
  return (
    <div className="category-card" onClick={() => onClick(id)}>
      <img
        src={image || categoryImg}
        alt={name}
        className="category-image"
      />
      <p className="category-title">{name}</p>
    </div>
  );
};

export default CategoryCard;
