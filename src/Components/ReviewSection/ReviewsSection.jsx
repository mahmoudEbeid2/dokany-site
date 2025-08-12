import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './ReviewSection.module.css';
import ReviewCard from './ReviewCard';
import AddReviewForm from './AddReviewForm';

function ReviewsSection({ productId, reviews, handeledReviews }) {
  const { userInfo } = useSelector((state) => state.user);
  const customerId = userInfo?.id;

  const totalReviews = useMemo(() => reviews.length, [reviews]);

  const renderedReviews = useMemo(() => {
    if (!reviews?.length) return <p className="text-muted">No reviews yet.</p>;
    return reviews.map((review) => (
      <ReviewCard
        key={review.id}
        name={`${review?.customer?.f_name || ''} ${review?.customer?.l_name || ''}`}
        rating={review.rating}
        comment={review.comment}
        image={review.customer?.profile_imge}
        myCustomerId={customerId}
        customerId={review.customer_id}
        id={review.id}
        handeledReviews={handeledReviews}
        reviews={reviews}
      />
    ));
  }, [reviews, customerId, handeledReviews]);

  return (
    <div className="container mt-5">
      {/* Add Review Form */}
      <AddReviewForm
        handeledReviews={handeledReviews}
        reviews={reviews}
        productId={productId}
      />

      {/* Reviews Display */}
      {totalReviews > 0 && (
        <div className={styles.reviewsSection}>
          <h4 className={styles.reviewsTitle}>{totalReviews} Reviews</h4>
          {renderedReviews}
        </div>
      )}
    </div>
  );
}

export default ReviewsSection;

