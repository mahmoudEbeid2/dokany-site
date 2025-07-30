import React, { useState, useMemo } from 'react';
import './FavCard.css';
import notFoundImage from '../../assets/produtNotFound.jpg';

const FavCard = ({ product, onRemove }) => {
  const title = product?.title || 'No Title';
  const price = product?.price || '0.00';
  const [imageError, setImageError] = useState(false);

  const getImageSource = () => {
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      if (typeof firstImage === 'string') return firstImage;
      if (firstImage?.image) return firstImage.image;
      if (firstImage?.url) return firstImage.url;
    }

    if (product?.image) return product.image;
    if (product?.thumbnail) return product.thumbnail;

    return null;
  };

  const originalImage = getImageSource();

  const finalImage = useMemo(() => {
    return imageError || !originalImage ? notFoundImage : originalImage;
  }, [imageError, originalImage]);

  const handleImageError = (e) => {
    if (e.target.src !== window.location.origin + notFoundImage) {
      setImageError(true);
    }
  };

  return (
    <div className="fav-row">
      <div className="fav-product">
        <button className="remove-btn" onClick={onRemove}>✖</button>

        <div className="image-container">
          <img
            src={finalImage}
            alt={title}
            className="fav-image"
            onError={handleImageError}
          />
        </div>

        <h4 className="fav-title">
          {title.length > 10 ? title.slice(0, 10) + '...' : title}
        </h4>
      </div>

      <div className="fav-price">${price}</div>
      <button className="add-btn">Add to cart</button>
    </div>
  );
};

export default FavCard;
