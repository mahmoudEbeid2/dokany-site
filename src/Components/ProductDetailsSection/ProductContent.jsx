import React, { useState } from 'react';
import styles from './ProductDetails.module.css'; // <-- CSS Module
import ProductDiscountTime from './ProductDiscountTime';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { RiCouponLine } from "react-icons/ri";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWatchlist, removeFromWatchlist } from '../../features/user/userSlice';
import { useEffect } from 'react';


const ProductContent = ({ product, reviews }) => {
    const { title, description, price, discount, stock, category, id, averageRating, } = product;
    const dispatch = useDispatch();
    const {watchlist, cart} = useSelector(state => state.user)
    console.log(cart)
    // const currentWatchlist = watchlist.find(item => item.product_id === id);

    const numReviews = reviews.length;

    const token = localStorage.getItem("token")

    const [productCount, setProductCount] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscountValue, setCouponDiscountValue] = useState(0);
    // const [isAtWatchlist, setIsAtWatchlist] = useState(false);


    const incrementProductCount = () => {
        if (productCount < product.stock) {
            setProductCount(productCount + 1);
        }
    };

    const decrementProductCount = () => {
        if (productCount > 0) {
            setProductCount(productCount - 1);
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className={styles.ratingStar + " " + styles.full} />);
        }

        if (hasHalf) {
            stars.push(<FaStarHalfAlt key="half" className={styles.ratingStar + " " + styles.half} />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className={styles.ratingStar + " " + styles.empty} />);
        }

        return stars;
    };

    // useEffect(() => {
    //     axios
    //         .get(`https://dokany-api-production.up.railway.app/favorites/check/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((response) => {
    //             console.log(response.data);
    //             setIsAtWatchlist(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching watchlist:', error);
    //         });
    // }, [id, token]);

    const handleAddToWatchlist = () => {
        if (!token) {
            toast.error('Please log in to add to watchlist.');
            return;
        }
        axios.post(
            'https://dokany-api-production.up.railway.app/favorites',
            { product_id: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                console.log(response.data);
                dispatch(addToWatchlist({ ...response.data,product:product }));
                toast.success('Product added to watchlist successfully');
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    };

    // const handleRemoveFromWatchlist = () => {
    //     if (!token) {
    //         toast.error('Please log in to remove from watchlist.');
    //         return;
    //     }

    //     axios.delete(
    //         `https://dokany-api-production.up.railway.app/favorites/${currentWatchlist.id}`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }
    //     )
    //         .then((response) => {
    //             console.log(response.data);
    //             // dispatch(removeFromWatchlist(id));
    //             setIsAtWatchlist(false);
    //             toast.success('Product removed from watchlist successfully');
    //         })
    //         .catch((error) => {
    //             console.error('Error removing from watchlist:', error);
    //             toast.error(error.response.data.error);
    //         });
    // };

    const handleChangeCoupon = (event) => {
        setCouponCode(event.target.value.trim());
    }

    const handleApplyCoupon = async () => {
        if (!couponCode) {
            toast.error('Please enter a coupon code');
            return;
        }

        if (!token) {
            toast.error('Please log in to apply a coupon');
            return;
        }

        axios
            .get(`https://dokany-api-production.up.railway.app/api/coupon/check/${couponCode}?subdomain=mohamed-seller`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setCouponDiscountValue(response.data.discount_value);
                toast.success('Coupon applied successfully');
            }).catch((error) => {
                setCouponDiscountValue(0);
                toast.error(error.response.data.message);
                console.error('Error fetching coupons:', error);
            })
    }


    const handleAddToCart = () => {
        if (!token) {
            toast.error("Please log in to add to cart.");
            return;
        }

        if (productCount === 0) {
            toast.error('Please add some products to cart');
            return
        }

        axios.post(
            'https://dokany-api-production.up.railway.app/cart',
            { product_id: id, quantity: productCount, coupon_code: couponDiscountValue > 0 ? couponCode : null },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => {
                dispatch(addToCart(response.data.cartItem));
                toast.success('Product(s) added to cart successfully');
            })
            .catch((error) => {
                toast.error(error.response.data.error);
                console.error('Error adding to cart:', error);
            });
    };
    if (!product) return null;

    return (
        <div className={styles.productContent}>
            <ToastContainer />
            <h1 className={styles.productTitle}>{title}</h1>
            <p className={styles.productDescription}>{description}</p>

            <div className="d-flex align-items-center gap-2">
                {discount ? (
                    <>
                        <span className={styles.productPrice}>
                            ${((price * (1 - discount / 100)) * (couponDiscountValue > 0 ? (1 - couponDiscountValue / 100) : 1)).toFixed(2)}
                        </span>
                        <span className={styles.productPriceDiscount}>
                            ${price.toFixed(2)}
                        </span>
                    </>
                ) : (
                    <span className={styles.productPrice}>
                        ${price.toFixed(2)}
                    </span>
                )}
            </div>


            {averageRating > 0 && (
                <div className="d-flex align-items-center gap-2">
                    <span className={`d-flex align-items-center gap-1 ${styles.productRating}`}>
                        {renderStars(averageRating)}
                    </span>
                    <span className={styles.productReviews}>{numReviews} Reviews</span>
                </div>
            )}

            {discount > 0 && <ProductDiscountTime />}

            {category && (
                <div className={`w-100 ${styles.category}`}>
                    <h4 className={styles.sectionHeading}>Category</h4>
                    <p>{category['name']}</p>
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
                        <button className={styles.counterButton} disabled={productCount === 0} onClick={decrementProductCount}>-</button>
                        <span className={styles.counterValue}>{productCount}</span>
                        <button className={styles.counterButton} disabled={productCount === stock} onClick={incrementProductCount}>+</button>
                    </div>
                    <div className={styles.watchList}>
                        <button className={styles.watchListButton} onClick={handleAddToWatchlist}>
                            <GrFavorite />
                            <span>Watchlist</span>
                        </button>
                    </div>

                </div>

                <div className={styles.useCoupon}>
                    <div className={styles.useCouponAction}>
                        <input type="text" onChange={handleChangeCoupon} className={styles.couponInput} placeholder="Enter your coupon code" />
                        <button className={styles.couponButton} onClick={handleApplyCoupon}>Apply</button>
                    </div>

                    {(couponDiscountValue > 0 && couponCode) && (
                        <div className={styles.useCouponApply}>
                            <div className={styles.couponDiscountName}>
                                <RiCouponLine />
                                <span className={styles.couponDiscountLabel}>{couponCode}</span>
                            </div>
                            <span className={styles.couponDiscountValue}>-${price * (couponDiscountValue / 100)} [Remove]</span>
                        </div>
                    )}
                </div>

                <button onClick={handleAddToCart} className={styles.addToCartButton}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductContent;
