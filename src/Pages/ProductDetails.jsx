import React, { useEffect, useState } from 'react';
import ProductDetailsSection from '../Components/ProductDetailsSection/ProductDetailsSection';
import ReviewsSection from '../Components/ReviewSection/ReviewsSection';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productReviews, setProductReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://dokany-api-production.up.railway.app/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://dokany-api-production.up.railway.app/reviews/${id}`,)
      .then((response) => {
        setProductReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product reviews:', error);
      });
  }, []);

  if (loading) return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading product details...</p>;

  if (!product) return <p style={{ padding: '2rem', textAlign: 'center' }}>Product not found.</p>;

  console.log(product);

  return (
    <div>
      <ProductDetailsSection product={product} reviews={productReviews} />
      <ReviewsSection id={id} reviews={productReviews} handeledReviews={setProductReviews}  />
    </div>
  );
}

export default ProductDetails;

