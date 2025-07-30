import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from 'react-toastify';
import styles from './ReviewSection.module.css';

import axios from 'axios';
const api = import.meta.env.VITE_API;

function AddReviewForm({ handeledReviews, reviews, productId }) {

  const [user, setUsser] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGxyb3UydDAwMWtseHJtNWpxaXlkaWgiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2MjYxMDIsImV4cCI6MTc1NDIzMDkwMn0.1Z61T-MpuNkS_RGa9eUGuroYdWnATmNWTwPzOJRxfOc"

  useEffect(() => {
    axios
      .get(`${api}/api/customer/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsser(response.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      rating,
      comment,
    };

    axios.post(`${api}/reviews/${productId}`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setRating(5);
      setComment('');
      handeledReviews([...reviews, { ...response.data.review,customer: user }]);
      toast.success('Review added successfully');
    })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5 className="mb-3">Add Your Review</h5>


      <div className={`mb-3 d-flex align-items-center ${styles.addReviewStars}`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (hoveredRating ?? rating) >= star;
          return (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              className="mx-1"
            >
              {isFilled ? <FaStar /> : <FaRegStar />}
            </span>
          );
        })}
      </div>



      <div className="mb-3">
        <textarea
          className="form-control"
          rows={3}
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className={styles.btnPrimary1}>
        Submit Review
      </button>
    </form>
  );
}


export default AddReviewForm;
