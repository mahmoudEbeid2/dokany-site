import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import AddReviewForm from './AddReviewForm';
import './ReviewSection.css';
import axios from 'axios';

function ReviewsSection() {

  const [reviews, setReviews] = useState([
    // {
    //   name: 'John Doe',
    //   rating: 5,
    //   comment: 'Great product!',
    //   image: 'https://randomuser.me/api/portraits/men/10.jpg',
    // },
    // {
    //   name: 'Jane Smith',
    //   rating: 4,
    //   comment: 'Very useful and high quality.',
    //   image: 'https://randomuser.me/api/portraits/women/12.jpg',
    // },
  ]);

const [refresh, setRefreshcopy] = useState(false);
const setRefresh = () => setRefreshcopy(!refresh);
 let customerId = "cmdlrou2t001klxrm5jqiydih";

let productId= "cmdlqlrdd0016lxrm1f072u75";
 const fetchReviews = async () => {
    try{
        const response = await axios.get(`https://dokany-api-production.up.railway.app/reviews/${productId}`);
        setReviews(response.data);
        console.log("reviews",response.data);
    }catch(error){
        console.log(error);
    }
    
  };
  useEffect(()=>{
    fetchReviews();
  },[refresh]);

  let fullName = reviews[0]?.customer?.f_name + ' ' + reviews[0]?.customer?.l_name;
  console.log(fullName);
  return (
    <div className="container mt-5">
      <AddReviewForm setRefresh={setRefresh} />
      <h4 className="mb-3">{reviews.length ? reviews.length : null} Reviews</h4>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review?.customer?.f_name + ' ' + review?.customer?.l_name}
            rating={review.rating}
            comment={review.comment}
            image={review.customer?.profile_imge
            }
            myCustomerId={customerId}
            customerId={review.customer_id}
            id={review.id}
            setRefresh={setRefresh}
          />
        ))
      ) : (
        <p className="text-muted">No reviews yet.</p>
      )}
    </div>
  );
}

export default ReviewsSection;
