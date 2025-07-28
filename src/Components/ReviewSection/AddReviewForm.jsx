// import React, { useState } from 'react';
// import axios from 'axios';
// function AddReviewForm({setRefresh}) {

//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
 
// const api = import.meta.env.VITE_API;
 

//   let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGxyb3UydDAwMWtseHJtNWpxaXlkaWgiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2MjYxMDIsImV4cCI6MTc1NDIzMDkwMn0.1Z61T-MpuNkS_RGa9eUGuroYdWnATmNWTwPzOJRxfOc"
//  let productId= "cmdlqlrdd0016lxrm1f072u75";
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const review = {
//       rating,
//       comment,
//     };

//     axios.post(`${api}/reviews/${productId}`,review, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((response) => {
//       console.log(response.data);
//       console.log("success added review");
//       setRating(5);
//       setComment('');
//       setRefresh();
//     })
//     .catch((error) => {
//       console.error("error", error);
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-4">
//       <h5 className="mb-3">Add Your Review</h5>


//       <div className="mb-2">
//         <select className="form-control" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//           {[5, 4, 3, 2, 1].map((r) => (
//             <option key={r} value={r}>
//               {r} Stars
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="mb-2">
//         <textarea
//           placeholder="Write your review..."
//           className="form-control"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         ></textarea>
//       </div>

//       <button type="submit" className="btn btn-primary1">
//         Write Review 
//       </button>
//     </form>
//   );
// }

// export default AddReviewForm;


import React, { useState } from 'react';
import axios from 'axios';


function AddReviewForm({ setRefresh }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(null);

const api = import.meta.env.VITE_API;
   let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGxyb3UydDAwMWtseHJtNWpxaXlkaWgiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2MjYxMDIsImV4cCI6MTc1NDIzMDkwMn0.1Z61T-MpuNkS_RGa9eUGuroYdWnATmNWTwPzOJRxfOc"
  const productId = "cmdlqlrdd0016lxrm1f072u75";

  const handleSubmit = (e) => {
    e.preventDefault();

    const review = { rating, comment };

    axios.post(`${api}/reviews/${productId}`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("Success: ", res.data);
      setRating(5);
      setComment('');
      setRefresh?.();
    })
    .catch((err) => {
      console.error("Error submitting review:", err);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5 className="mb-3">Add Your Review</h5>

      <div className="mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`bi bi-star${(hoveredRating || rating) >= star ? '-fill' : ''} mx-1`}
            style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#121212' }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
          ></i>
        ))}
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

      <button type="submit" className="btn btn-primary1">
        Submit Review
      </button>
    </form>
  );
}

export default AddReviewForm;
