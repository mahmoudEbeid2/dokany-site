import React, { useEffect, useState, useCallback } from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from 'react-toastify';
import styles from './ReviewSection.module.css';
import axios from 'axios';

const api = import.meta.env.VITE_API;

function AddReviewForm({ handeledReviews, reviews, productId }) {
  const [user, setUser] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/api/customer/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("error fetching user", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.warn("Please write a comment.");

    setLoading(true);

    const review = { rating, comment };
    try {
      const response = await axios.post(`${api}/reviews/${productId}`, review, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newReview = { ...response.data.review, customer: user };
      handeledReviews([...reviews, newReview]);
      setRating(5);
      setComment('');
      toast.success('Review added successfully');
    } catch (error) {
      console.error("error posting review", error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
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
              style={{ cursor: 'pointer' }}
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

      <button
        type="submit"
        className={styles.btnPrimary1}
        disabled={loading || !comment.trim()}
        style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}

export default AddReviewForm;

