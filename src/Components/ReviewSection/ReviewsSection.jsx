import ReviewCard from './ReviewCard';
import AddReviewForm from './AddReviewForm';
import { ToastContainer } from 'react-toastify';

function ReviewsSection({ productId, reviews, handeledReviews }) {

  let customerId = "cmdlrou2t001klxrm5jqiydih";
  
  return (
    <div className="container mt-5">
      <ToastContainer />
      <AddReviewForm handeledReviews={handeledReviews} reviews={reviews} productId={productId} />
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
            reviews={reviews}
            handeledReviews={handeledReviews}
          />
        ))
      ) : (
        <p className="text-muted">No reviews yet.</p>
      )}
    </div>
  );
}

export default ReviewsSection;
