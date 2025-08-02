import { lazy, Suspense, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Suspense fallback={<div>Loading form...</div>}>
        <AddReviewForm
          handeledReviews={handeledReviews}
          reviews={reviews}
          productId={productId}
        />
      </Suspense>

      <h4 className="mb-3">{totalReviews > 0 ? `${totalReviews} Reviews` : null}</h4>

      <Suspense fallback={<div>Loading reviews...</div>}>
        {renderedReviews}
      </Suspense>
    </div>
  );
}

export default ReviewsSection;

