import React, { useEffect, useState } from 'react';
import FavCard from '../../components/FavCard/FavCard';
import './FavList.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
const token = localStorage.getItem("token");

useEffect(() => {
  if (!token) {
    toast.error("Please login to view wishlist.");
    return;
  }

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const filtered = data.filter((item) => item.product);
      setWishlist(filtered);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Error fetching wishlist');
    } finally {
      setLoading(false);
    }
  };

  fetchWishlist();
}, []);


  const handleRemove = async (id) => {
    try {
      setWishlist((prev) => prev.filter((item) => item.id !== id));

      const res = await fetch(
        `${import.meta.env.VITE_API}/favorites/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        toast.error('Failed to remove item');
        return;
      }

      toast.success('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="wishlist-page">
      <ToastContainer />
      <h2 className="wishlist-title">Your Wishlist</h2>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : wishlist.length > 0 ? (
        <>
          <div className="wishlist-headers">
            <span className="wishlist-header">Product</span>
            <span className="wishlist-header">Price</span>
            <span className="wishlist-header">Action</span>
          </div>

          <div className="wishlist-list">
            {wishlist.map((item) => (
              <FavCard
                key={item.id}
                product={item.product}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No products in wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;
