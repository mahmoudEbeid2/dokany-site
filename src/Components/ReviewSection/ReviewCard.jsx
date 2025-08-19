import axios from 'axios';
import React, { useCallback } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import styles from './ReviewSection.module.css';
import { toast } from 'react-toastify';

function ReviewCard({
  name = "mohed",
  rating,
  comment,
  image = import.meta.env.VITE_DEFAULT_AVATAR || "https://randomuser.me/api/portraits/women/12.jpg",
  customerId,
  myCustomerId,
  id,
  handeledReviews,
  reviews,
}) {
  const token = localStorage.getItem("token");

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return [
      ...Array(fullStars).fill(<FaStar className={`${styles.ratingStar} ${styles.full}`} />),
      ...(hasHalf ? [<FaStarHalfAlt className={`${styles.ratingStar} ${styles.half}`} />] : []),
      ...Array(emptyStars).fill(<FaRegStar className={`${styles.ratingStar} ${styles.empty}`} />)
    ].map((el, i) => React.cloneElement(el, { key: i }));
  };

  const deleteReview = useCallback(async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handeledReviews(reviews.filter((review) => review.id !== id));
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to delete review");
    } 
  }, [token, id, handeledReviews, reviews]);

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <img
          src={image || "/src/assets/default-avatar.svg"}
          alt="User"
          className={styles.reviewAvatar}
        />
        <div className={styles.reviewContent}>
          <div className={styles.reviewMeta}>
            <h6 className={styles.headingReview}>{name}</h6>
          </div>
          <div className={styles.starsContainer}>{renderStars(rating)}</div>
          <p className={styles.textReview}>{comment}</p>
        </div>
        {myCustomerId === customerId && (
          <div
            onClick={() => deleteReview()}
            className={styles.deleteIcon}
            title="Delete review"
          >
            <BsTrash3 />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ReviewCard);

