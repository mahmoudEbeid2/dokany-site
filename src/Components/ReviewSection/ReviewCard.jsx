import axios from 'axios';
import React from 'react';

function ReviewCard({ name="mohed", rating, comment, image="https://randomuser.me/api/portraits/women/12.jpg", customerId, myCustomerId ,id ,setRefresh}) {

 let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZGxyb3UydDAwMWtseHJtNWpxaXlkaWgiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NTM2MjYxMDIsImV4cCI6MTc1NDIzMDkwMn0.1Z61T-MpuNkS_RGa9eUGuroYdWnATmNWTwPzOJRxfOc"

 const api = import.meta.env.VITE_API;

    const deleteReview = async () => {
        try {
            const response = await axios.delete(`${api}/reviews/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setRefresh();
        } catch (error) {
            console.error("error", error);
        }
    };

  return (
    <div className="border-bottom p-3 mb-3 d-flex gap-3 align-items-start review-card">
      <img
        src={image || "https://via.placeholder.com/50"}
        alt="User"
        className="rounded-circle"
        width="50"
        height="50"
      />
      <div>
        <h6 className="fw-bold mb-1 heahding-review">{name}</h6>
        <div className=" mb-2">
          {Array.from({ length: rating }, (_, index) => (
            <i key={index} className="bi bi-star-fill"></i>
          ))}
          {Array.from({ length: 5 - rating }, (_, index) => (
            <i key={index + rating} className="bi bi-star"></i>
          ))}
        </div>
        <p className="text-muted mb-0  text-review">{comment}</p>
      </div>
        {myCustomerId === customerId &&  <div onClick={() => {
            deleteReview();
            console.log("delete review")

        }} className="delet-review text-danger ms-auto"><i className="bi bi-trash3"></i></div>}
    </div>
  );
}

export default ReviewCard;
