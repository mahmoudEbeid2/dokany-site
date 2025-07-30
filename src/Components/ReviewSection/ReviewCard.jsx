import axios from 'axios';
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import styles from './ReviewSection.module.css';
import { toast } from 'react-toastify';



function ReviewCard({ name = "mohed", rating, comment, image = "https://randomuser.me/api/portraits/women/12.jpg", customerId, myCustomerId, id, reviews, handeledReviews }) {

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGxyb3UydDAwMWtseHJtNWpxaXlkaWgiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2MjYxMDIsImV4cCI6MTc1NDIzMDkwMn0.1Z61T-MpuNkS_RGa9eUGuroYdWnATmNWTwPzOJRxfOc"

  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className={styles.ratingStar + " " + styles.full} />);
    }

    if (hasHalf) {
      stars.push(<FaStarHalfAlt key="half" className={styles.ratingStar + " " + styles.half} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className={styles.ratingStar + " " + styles.empty} />);
    }

    return stars;
  };
  const deleteReview = async () => {
     axios.delete(`https://dokany-api-production.up.railway.app/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        toast.success('Review deleted successfully');
        handeledReviews([...reviews.filter((review) => review.id !== id)]);
      }).catch((error) => {
        console.error("error", error);
      })
  };

  return (
    <div className={`border-bottom p-3 mb-3 d-flex gap-3 align-items-start`}>
      <img
        src={image || "https://via.placeholder.com/50"}
        alt="User"
        className="rounded-circle"
        width="50"
        height="50"
      />
      <div>
        <h6 className={`fw-bold mb-1 ${styles.headingReview}`}>{name}</h6>
        <div className=" mb-2">
          {renderStars(rating)}
        </div>
        <p className={`text-muted mb-0 ${styles.textReview}`}>{comment}</p>
      </div>
      {myCustomerId === customerId && (
        <div
          onClick={() => {
            deleteReview();
          }}
          className="text-danger ms-auto"
          style={{ cursor: "pointer" }}
        >
          <BsTrash3 />
        </div>
      )}

    </div>
  );
}

export default ReviewCard;
