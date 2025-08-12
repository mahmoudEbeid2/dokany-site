import React, { useState, useMemo, useCallback, memo } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import styles from './ProductDetails.module.css';
import { startMeasure, endMeasure } from '../../utils/performanceMonitor';

const ProductImagesGallery = memo(({ product_images = [], created_date, discount = 0 }) => {
  // Performance monitoring for component initialization
  React.useEffect(() => {
    startMeasure('product_images_gallery_initialization', 'component');
    
    return () => {
      endMeasure('product_images_gallery_initialization', 'component');
    };
  }, []);

  const [mainCarouselIndex, setMainCarouselIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Memoize expensive calculations
  const isNew = useMemo(() => {
    if (!created_date) return false;
    const now = new Date();
    const created = new Date(created_date);
    const diffInDays = Math.ceil(Math.abs(now - created) / (1000 * 60 * 60 * 24));
    return diffInDays <= 3;
  }, [created_date]);

  // Memoize thumbnail images to prevent unnecessary re-renders
  const thumbnailImages = useMemo(() => 
    product_images.slice(0, 4), 
    [product_images]
  );

  // Memoize event handlers to prevent unnecessary re-renders
  const openModal = useCallback((index) => {
    setModalImageIndex(index);
    setShowModal(true);
  }, []);

  const handleThumbnailClick = useCallback((index) => {
    setMainCarouselIndex(index);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleModalImageSelect = useCallback((index) => {
    setModalImageIndex(index);
  }, []);

  // Performance monitoring for render
  React.useEffect(() => {
    if (product_images.length > 0) {
      startMeasure('product_images_gallery_render', 'component');
      endMeasure('product_images_gallery_render', 'component', { 
        imageCount: product_images.length,
        hasDiscount: discount > 0,
        isNew
      });
    }
  }, [product_images.length, discount, isNew]);

  const renderBadges = useCallback((index) => (
    <>
      {isNew && index === 0 && <span className={styles.newBadge}>New</span>}
      {discount > 0 && index === 0 && (
        <span className={styles.discountBadge}>-{Math.round(discount)}%</span>
      )}
    </>
  ), [isNew, discount]);

  const renderCarouselItems = useCallback((clickHandler) =>
    product_images.map((img, index) => (
      <Carousel.Item key={index} className="position-relative">
        {renderBadges(index)}
        <img
          src={img.image}
          alt={`Product ${index + 1}`}
          className="d-block w-100 h-100 object-cover"
          onClick={() => clickHandler(index)}
          loading="lazy" // Add lazy loading for images
        />
      </Carousel.Item>
    )), [product_images, renderBadges]);

  // Don't render if no images
  if (!product_images || product_images.length === 0) {
    return (
      <div className={styles.productImagesGallery}>
        <div className="d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
          <p className="text-muted">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productImagesGallery}>
      {/* Desktop View */}
      <div className={`d-none d-lg-block ${styles.mainImage}`}>
        <Carousel
          interval={null}
          indicators={false}
          activeIndex={mainCarouselIndex}
          onSelect={setMainCarouselIndex}
          className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.carouselWrapper}`}
          nextIcon={<span className={styles.customCarouselIcon}><IoArrowForward /></span>}
          prevIcon={<span className={styles.customCarouselIcon}><IoArrowBack /></span>}
        >
          {renderCarouselItems(openModal)}
        </Carousel>

        <div className={styles.productImages}>
          {thumbnailImages.map((img, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`${styles.productImageThumbnail} ${
                mainCarouselIndex === index ? styles.activeThumbnail : ''
              }`}
            >
              <img
                src={img.image}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy" // Add lazy loading for thumbnails
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          ))}
          {product_images.length > 4 && (
            <div className={styles.moreImagesIndicator}>
              <span>+{product_images.length - 4}</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="d-lg-none w-100 position-relative">
        <Carousel
          className={styles.carouselWrapper}
          indicators={false}
          nextIcon={<span className={styles.customCarouselIcon}><IoArrowForward /></span>}
          prevIcon={<span className={styles.customCarouselIcon}><IoArrowBack /></span>}
        >
          {renderCarouselItems(openModal)}
        </Carousel>
      </div>

      {/* Modal Fullscreen Image Viewer */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        size="xl"
        centered
        contentClassName="image-modal-only"
        dialogClassName="borderless-modal"
      >
        <Modal.Header closeButton className="border-0 p-2" />
        <Modal.Body className="p-0 text-center bg-transparent">
          <Carousel
            interval={null}
            activeIndex={modalImageIndex}
            onSelect={handleModalImageSelect}
            indicators={false}
            nextIcon={<span className={styles.customCarouselIcon}><IoArrowForward /></span>}
            prevIcon={<span className={styles.customCarouselIcon}><IoArrowBack /></span>}
            className={styles.carouselWrapper}
          >
            {product_images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img.image}
                  alt={`Modal Image ${index + 1}`}
                  className="d-block w-100"
                  loading="lazy" // Add lazy loading for modal images
                  style={{
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    margin: '0 auto',
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className={styles.modalImageCounter}>
            {modalImageIndex + 1} / {product_images.length}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
});

ProductImagesGallery.displayName = 'ProductImagesGallery';

export default ProductImagesGallery;


