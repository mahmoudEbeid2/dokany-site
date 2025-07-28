import React, { useState } from 'react';
import axios from 'axios';
function AddReviewForm({setRefresh}) {

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
 
 

  let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGxyb3UydDAwMWtseHJtNWpxaXlkaWgiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2MjYxMDIsImV4cCI6MTc1NDIzMDkwMn0.1Z61T-MpuNkS_RGa9eUGuroYdWnATmNWTwPzOJRxfOc"
 let productId= "cmdlqlrdd0016lxrm1f072u75";
  const handleSubmit = (e) => {
    e.preventDefault();

    const review = {
      rating,
      comment,
    };

    axios.post(`https://dokany-api-production.up.railway.app/reviews/${productId}`,review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response.data);
      console.log("success added review");
      setRating(5);
      setComment('');
      setRefresh();
    })
    .catch((error) => {
      console.error("error", error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5 className="mb-3">Add Your Review</h5>


      <div className="mb-2">
        <select className="form-control" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Write your review..."
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary1">
        Write Review 
      </button>
    </form>
  );
}

export default AddReviewForm;
