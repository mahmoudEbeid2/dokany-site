import React, { useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import styles from './ProductDetails.module.css';

const ProductImagesGallery = ({ product_images, created_date, discount }) => {
    const allImages = product_images.slice(0,3);
    const nowDate = new Date();
    const createdDate = new Date(created_date);
    const timeDiff = Math.abs(nowDate - createdDate);
    const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const isNew = diffInDays <= 3;

    const [mainCarouselIndex, setMainCarouselIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setMainCarouselIndex(index);
    };

    const handleImageClick = (index) => {
        setModalImageIndex(index);
        setShowModal(true);
    };

    return (
        <div className={styles.productImagesGallery}>
            {/* Desktop View */}
            <div className={`d-none d-lg-block ${styles.mainImage}`}>
                <Carousel
                    interval={null}
                    indicators={false}
                    activeIndex={mainCarouselIndex}
                    onSelect={(i) => setMainCarouselIndex(i)}
                    className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.carouselWrapper}`}
                    
                    nextIcon={
                        <span className={styles.customCarouselIcon}>
                            <IoArrowForward />
                        </span>
                    }
                    prevIcon={
                        <span className={styles.customCarouselIcon}>
                            <IoArrowBack />
                        </span>
                    }
                >
                    {allImages.map((img, index) => (
                        <Carousel.Item key={index} className="position-relative">
                            {isNew && index === 0 && (
                                <span className={styles.newBadge}>New</span>
                            )}
                            {discount > 0 && index === 0 && (
                                <span className={styles.discountBadge}>-{discount}%</span>
                            )}
                            <img
                                src={img.image}
                                alt="Product"
                                className="d-block w-100 h-100 object-cover"
                                onClick={() => handleImageClick(index)}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className={styles.productImages}>
                    {allImages.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={styles.productImageThumbnail}
                        >
                            <img
                                src={img.image}
                                alt="Product"
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
                    nextIcon={
                        <span className={styles.customCarouselIcon}>
                            <IoArrowForward />
                        </span>
                    }
                    prevIcon={
                        <span className={styles.customCarouselIcon}>
                            <IoArrowBack />
                        </span>
                    }
                >
                    {allImages.map((img, index) => (
                        <Carousel.Item key={index} className="position-relative">
                            {isNew && index === 0 && (
                                <span className={styles.newBadge}>New</span>
                            )}
                            {discount > 0 && index === 0 && (
                                <span className={styles.discountBadge}>-{discount}%</span>
                            )}
                            <img
                                src={img.image}
                                alt="Product"
                                className="d-block w-100 h-100 object-cover"
                                onClick={() => handleImageClick(index)}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

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
                        onSelect={(i) => setModalImageIndex(i)}
                        indicators={false}
                        nextIcon={null}
                        prevIcon={null}
                        className={styles.carouselWrapper}
                    >
                        {allImages.map((img, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    src={img.image}
                                    alt="Product"
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

