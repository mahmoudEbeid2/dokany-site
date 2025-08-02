import React, { useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import styles from './ProductDetails.module.css';

const ProductImagesGallery = ({ product_images = [], created_date, discount = 0 }) => {
  const allImages = product_images.slice(0, 3);

  const isNew = (() => {
    const now = new Date();
    const created = new Date(created_date);
    const diffInDays = Math.ceil(Math.abs(now - created) / (1000 * 60 * 60 * 24));
    return diffInDays <= 3;
  })();

  const [mainCarouselIndex, setMainCarouselIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const openModal = (index) => {
    setModalImageIndex(index);
    setShowModal(true);
  };

  const renderBadges = (index) => (
    <>
      {isNew && index === 0 && <span className={styles.newBadge}>New</span>}
      {discount > 0 && index === 0 && (
        <span className={styles.discountBadge}>-{discount}%</span>
      )}
    </>
  );

  const renderCarouselItems = (clickHandler) =>
    allImages.map((img, index) => (
      <Carousel.Item key={index} className="position-relative">
        {renderBadges(index)}
        <img
          src={img.image}
          alt={`Product ${index + 1}`}
          className="d-block w-100 h-100 object-cover"
          onClick={() => clickHandler(index)}
        />
      </Carousel.Item>
    ));

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
          {allImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setMainCarouselIndex(index)}
              className={styles.productImageThumbnail}
            >
              <img
                src={img.image}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="d-lg-none w-100">
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
        onHide={() => setShowModal(false)}
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
            onSelect={setModalImageIndex}
            indicators={false}
            nextIcon={null}
            prevIcon={null}
            className={styles.carouselWrapper}
          >
            {allImages.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img.image}
                  alt={`Modal Image ${index + 1}`}
                  className="d-block w-100"
                  style={{
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    margin: '0 auto',
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductImagesGallery;


