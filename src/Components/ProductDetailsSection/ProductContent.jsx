import {memo, useMemo, useState } from 'react';
import styles from './ProductDetails.module.css';
import ProductDiscountTime from './ProductDiscountTime';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { RiCouponLine } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  addToWatchlist,
  removeFromWatchlist,
} from '../../features/user/userSlice';
const api = import.meta.env.VITE_API;


const ProductContent = ({ product, reviews }) => {
  const {
    title, description, price, discount, stock,
    category, id, averageRating
  } = product;

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { watchlist } = useSelector((state) => state.user);
  const currentWatchlist = watchlist.find((item) => item.product_id === id);
  const subdomain = window.location.hostname.split(".")[0];

  const [productCount, setProductCount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountValue, setCouponDiscountValue] = useState(0);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const headers = useMemo(() => ({
    Authorization: `Bearer ${token}`,
  }), [token]);

  const renderStars = useMemo(() => {
    const stars = [];
    const full = Math.floor(averageRating);
    const half = averageRating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    for (let i = 0; i < full; i++)
      stars.push(<FaStar key={`full-${i}`} className={`${styles.ratingStar} ${styles.full}`} />);
    if (half)
      stars.push(<FaStarHalfAlt key="half" className={`${styles.ratingStar} ${styles.half}`} />);
    for (let i = 0; i < empty; i++)
      stars.push(<FaRegStar key={`empty-${i}`} className={`${styles.ratingStar} ${styles.empty}`} />);

    return stars;
  }, [averageRating]);

  const finalPrice = useMemo(() => {
    const discounted = price * (1 - discount / 100);
    return (discounted * (1 - couponDiscountValue / 100)).toFixed(2);
  }, [price, discount, couponDiscountValue]);

  const incrementProductCount = () => {
    if (productCount < stock) setProductCount((c) => c + 1);
  };

  const decrementProductCount = () => {
    if (productCount > 0) setProductCount((c) => c - 1);
  };

  const handleAddToWatchlist = async () => {
    if (!token) return toast.error('Please log in to add to watchlist.');
    try {
      const { data } = await axios.post(
        `${api}/favorites`,
        { product_id: id },
        { headers }
      );
      dispatch(addToWatchlist({ ...data, product }));
      toast.success('Added to watchlist');
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding to watchlist");
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (!token) return toast.error('Please log in to remove from watchlist.');
    try {
      await axios.delete(
        `${api}/favorites/${currentWatchlist.id}`,
        { headers }
      );
      dispatch(removeFromWatchlist(currentWatchlist.id));
      toast.success('Removed from watchlist');
    } catch (err) {
      toast.error(err.response?.data?.error || "Error removing from watchlist");
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return toast.error('Enter a coupon code');
    if (!token) return toast.error('Please log in to apply a coupon');

    setLoadingCoupon(true);
    try {
      const { data } = await axios.get(
        `${api}/api/coupon/check/${couponCode}?subdomain=${subdomain}`,
        { headers }
      );
      setCouponDiscountValue(data.discount_value);
      toast.success('Coupon applied');
    } catch (err) {
      setCouponDiscountValue(0);
      toast.error(err.response?.data?.message || "Invalid coupon");
    } finally {
      setLoadingCoupon(false);
    }
  };

  const handleAddToCart = async () => {
    if (!token) return toast.error('Please log in to add to cart.');
    if (productCount === 0) return toast.error('Add product quantity first.');

    setAddingToCart(true);
    try {
      const { data } = await axios.post(
        `${api}/cart`,
        {
          product_id: id,
          quantity: productCount,
          coupon_code: couponDiscountValue > 0 ? couponCode : null
        },
        { headers }
      );
      dispatch(addToCart({...data.cartItem, product}));
      toast.success('Added to cart');
    } catch (err) {
      toast.error(err.response?.data?.error || "Error adding to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className={styles.productContent}>
      <h1 className={styles.productTitle}>{title}</h1>
      <p className={styles.productDescription}>
        {description.split(' ').slice(0, 200).join(' ')}
      </p>

      <div className="d-flex align-items-center gap-2">
        <span className={styles.productPrice}>${finalPrice}</span>
        {(discount > 0 || couponDiscountValue > 0) && (
          <span className={styles.productPriceDiscount}>${price.toFixed(2)}</span>
        )}
      </div>

      {averageRating > 0 && (
        <div className="d-flex align-items-center gap-2">
          <span className={`d-flex align-items-center gap-1 ${styles.productRating}`}>
            {renderStars}
          </span>
          <span className={styles.productReviews}>{reviews.length} Reviews</span>
        </div>
      )}

      {discount > 0 && <ProductDiscountTime />}

      {category?.name && (
        <div className={`w-100 ${styles.category}`}>
          <h4 className={styles.sectionHeading}>Category</h4>
          <p>{category.name}</p>
        </div>
      )}

      {stock > 0 && (
        <div className={`w-100 ${styles.stock}`}>
          <h4 className={styles.sectionHeading}>Stock</h4>
          <p>Available in stock: {stock}</p>
        </div>
      )}

      <div className={styles.cartActions}>
        <div className={styles.counterWatchListWrapper}>
          <div className={styles.counter}>
            <button onClick={decrementProductCount} disabled={productCount === 0} className={styles.counterButton}>-</button>
            <span className={styles.counterValue}>{productCount}</span>
            <button onClick={incrementProductCount} disabled={productCount === stock} className={styles.counterButton}>+</button>
          </div>

          <div className={styles.watchList}>
            {currentWatchlist ? (
              <button className={styles.watchListButtonAdded} onClick={handleRemoveFromWatchlist}>
                <MdOutlineFavorite /> <span>Added to Watchlist</span>
              </button>
            ) : (
              <button className={styles.watchListButton} onClick={handleAddToWatchlist}>
                <MdOutlineFavoriteBorder /> <span>Add to Watchlist</span>
              </button>
            )}
          </div>
        </div>

        <div className={styles.useCoupon}>
          <div className={styles.useCouponAction}>
            <input
              type="text"
              className={styles.couponInput}
              placeholder="Enter your coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.trim())}
              disabled={loadingCoupon}
            />
            <button
              className={styles.couponButton}
              onClick={handleApplyCoupon}
              disabled={loadingCoupon}
              style={{ opacity: loadingCoupon ? 0.6 : 1 }}
            >
              {loadingCoupon ? "Applying..." : "Apply"}
            </button>
          </div>

          {(couponDiscountValue > 0 && couponCode) && (
            <div className={styles.useCouponApply}>
              <div className={styles.couponDiscountName}>
                <RiCouponLine />
                <span className={styles.couponDiscountLabel}>{couponCode}</span>
              </div>
              <span className={styles.couponDiscountValue}>
                -${(price * (couponDiscountValue / 100)).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={styles.addToCartButton}
          disabled={addingToCart}
          style={{ opacity: addingToCart ? 0.6 : 1 }}
        >
          {addingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default memo(ProductContent);


