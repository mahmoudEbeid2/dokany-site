import React, { useState, useMemo } from 'react';
import './FavCard.css';
import notFoundImage from '../../assets/produtNotFound.jpg';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/user/userSlice';

const FavCard = ({ product, onRemove }) => {
  const title = product?.title || 'No Title';
  const price = product?.price || '0.00';
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleAddToCart = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add to cart');
      }
      dispatch(addToCart({ product_id: product.id, quantity: 1, product }));
      toast.success('✅ Product added to cart!');
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('❌ Failed to add to cart');
    }
  };

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
      <button className="add-btn" onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default FavCard;
