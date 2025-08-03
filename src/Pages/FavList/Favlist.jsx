import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import FavCard from '../../components/FavCard/FavCard';
import { removeFromWatchlist } from '../../features/user/userSlice';

import './FavList.css';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state) => state.user);
  console.log(watchlist);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Stop loading once wishlist is available
    if (watchlist !== undefined) {
      setLoading(false);
    }
  }, [watchlist]);

  const handleRemove = async (id) => {
    if (!token) {
      toast.error('Please log in to remove items from your wishlist.');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error('Failed to remove item.');
        return;
      }

      toast.success('Item removed from wishlist.');
      dispatch(removeFromWatchlist(id));
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="wishlist-page">

      <h2 className="wishlist-title">Your Wishlist</h2>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : watchlist.length > 0 ? (
        <>
          <div className="wishlist-headers">
            <span className="wishlist-header">Product</span>
            <span className="wishlist-header">Price</span>
            <span className="wishlist-header">Action</span>
          </div>

          <div className="wishlist-list">
            {watchlist.map((item) => (
              <FavCard
                key={item.id}
                product={item.product}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No products in your wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;

