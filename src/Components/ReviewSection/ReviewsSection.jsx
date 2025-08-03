import { lazy, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './ReviewSection.module.css';

const ReviewCard = lazy(() => import('./ReviewCard'));
const AddReviewForm = lazy(() => import('./AddReviewForm'));

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

      
      <Suspense fallback={<div>Loading form...</div>}>
        <AddReviewForm
          handeledReviews={handeledReviews}
          reviews={reviews}
          productId={productId}
        />
      </Suspense>

      {totalReviews > 0 && (
        <div className={styles.reviewsSection}>
          <h4 className={styles.reviewsTitle}>{totalReviews} Reviews</h4>
          <Suspense fallback={<div>Loading reviews...</div>}>
            {renderedReviews}
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default ReviewsSection;

