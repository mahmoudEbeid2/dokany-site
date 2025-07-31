import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";
import { toast } from "react-toastify";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
  addToCart,
} from "../../../features/user/userSlice";

const getToken = () => localStorage.getItem("token");

const addToFavoritesAPI = async (productId) => {
  const response = await fetch(`${import.meta.env.VITE_API}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add to favorites.");
  }
  return response.json();
};

const removeFromFavoritesAPI = async (favoriteId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API}/favorites/${favoriteId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove from favorites.");
  }
  return response.json();
};

const addToCartAPI = async (productId) => {
  const response = await fetch(`${import.meta.env.VITE_API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ product_id: productId, quantity: 1 }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add to cart.");
  }
  return response.json();
};

const ProductCard = ({ product, isNew = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { watchlist, userInfo } = useSelector((state) => state.user);
  const favoriteItem = watchlist.find((fav) => fav.product_id === product.id);
  const isFavorited = !!favoriteItem;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!userInfo) {
      toast.error("Please log in to manage favorites.");
      return navigate(`/signin`);
    }
    if (isFavorited) {
      removeFromFavoritesAPI(favoriteItem.id)
        .then(() => {
          dispatch(removeFromWatchlist(favoriteItem.id));
          toast.success("Removed from favorites.");
        })
        .catch((err) => toast.error(err.message));
    } else {
      addToFavoritesAPI(product.id)
        .then((newFavorite) => {
          dispatch(addToWatchlist(newFavorite));
          toast.success("Added to favorites!");
        })
        .catch((err) => toast.error(err.message));
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!userInfo) {
      toast.error("Please log in to add to cart.");
      return navigate(`/signin`);
    }
    addToCartAPI(product.id)
      .then(() => {
        dispatch(
          addToCart({
            id: product.id,
            product_id: product.id,
            title: product.title,
            price: product.price,
            discount: product.discount,
            images: product.images,
            quantity: 1,
          })
        );
        toast.success(
          `${product.title.split(" ").slice(0, 3).join(" ")} added to cart!`
        );
      })
      .catch((err) => toast.error(err.message));
  };

  const handleCardClick = () => navigate(`/products/${product.id}`);
  const handleViewImage = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const averageRating = product.averageRating || 0;
  const reviewCount = product.reviews?.length || 0;
  const originalPrice = product.price;
  const discountPercentage = product.discount || 0;
  const finalPrice = originalPrice - (originalPrice * discountPercentage) / 100;

  return (
    <>
      <div className={styles.productCardContainer} onClick={handleCardClick}>
        <div className={styles.productCardImageWrapper}>
          <img
            src={`/public/productImages/1.png`}
            alt={product.title.split(" ").slice(0, 5).join(" ")}
            className={styles.productImage}
          />
          <div className={styles.badgesContainer}>
            {isNew && (
              <div className={`${styles.badge} ${styles.newBadge}`}>NEW</div>
            )}
            {discountPercentage > 0 && (
              <div className={`${styles.badge} ${styles.discountBadge}`}>
                {`-${discountPercentage}%`}
              </div>
            )}
          </div>
          <div className={styles.productActions}>
            <button
              className={styles.productActionBtn}
              onClick={handleFavoriteClick}
            >
              <Heart
                size={20}
                fill={isFavorited ? "#000" : "none"}
                stroke={"#000"}
              />
            </button>
            <button
              className={styles.productActionBtn}
              onClick={handleViewImage}
            >
              <Eye size={20} stroke={"#000"} />
            </button>
          </div>
          <button
            className={`${styles.addToCartBtn} ${
              isNew ? styles.isVisible : ""
            }`}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
        <div className={styles.productInfo}>
          <h5 className={`card-title fw-normal mb-2 ${styles.customTitle}`}>
            {product.title.split(" ").slice(0, 5).join(" ")}
          </h5>
          <div
            className={`d-flex align-items-center gap-2 ${styles.customPrice}`}
          >
            <p className={`fw-semibold mb-0 text-dark`}>
              ${finalPrice.toFixed(2)}
            </p>
            {discountPercentage > 0 && (
              <p className="text-muted text-decoration-line-through mb-0">
                ${originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          <div
            className={`d-flex align-items-center mb-1 ${styles.customStarts}`}
          >
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi bi-star-fill ${
                  i < Math.round(averageRating)
                    ? styles.customStarts
                    : styles.customStartsdisabled
                }`}
              ></i>
            ))}
            <span className="ms-2 text-muted" style={{ fontSize: "0.8rem" }}>
              ({reviewCount})
            </span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.imageModalOverlay} onClick={closeModal}>
          <div
            className={styles.imageModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalCloseBtn} onClick={closeModal}>
              &times;
            </button>
            <img
              src={product.images?.[0]?.image}
              alt={product.title.split(" ").slice(0, 5).join(" ")}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
