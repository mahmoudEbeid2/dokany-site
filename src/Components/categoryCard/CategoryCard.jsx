import { useNavigate } from "react-router-dom";
import "./categoryCard.css"

const CategoryCard = ({ name, image, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`Navigating to category ${id}: ${name}`);
    navigate(`/category/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className="category-card" 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View products in ${name} category`}
    >
      <img src={image} alt={name} className="category-image" />
      <p className="category-title">{name}</p>
    </div>
  );
};

export default CategoryCard;
