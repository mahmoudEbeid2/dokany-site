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
  image = "https://randomuser.me/api/portraits/women/12.jpg",
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
      await axios.delete(`https://dokany-api-production.up.railway.app/reviews/${id}`, {
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
    <div className="border-bottom p-3 mb-3 d-flex gap-3 align-items-start">
      <img
        src={image || "https://via.placeholder.com/50"}
        alt="User"
        className="rounded-circle"
        width="50"
        height="50"
      />
      <div>
        <h6 className={`fw-bold mb-1 ${styles.headingReview}`}>{name}</h6>
        <div className="mb-2">{renderStars(rating)}</div>
        <p className={`text-muted mb-0 ${styles.textReview}`}>{comment}</p>
      </div>
      {myCustomerId === customerId && (
        <div
          onClick={() => deleteReview()}
          className={`text-danger ms-auto cursor-pointer ${styles.deleteIcon}`}
          title="Delete review"
        >
          <BsTrash3 />
        </div>
      )}
    </div>
  );
}

export default React.memo(ReviewCard);

