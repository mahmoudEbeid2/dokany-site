import React from 'react';
import ProductImagesGallery from './ProductImagesGallery';
import ProductContent from './ProductContent';

const ProductDetailsSection = ({ product, reviews }) => {

    const { images, created_date, discount } = product;
    
    return (
        <div className="container my-5">
            <div className="row justify-content-between">

                <div className="col-lg-6 ">
                    <ProductImagesGallery
                        product_images={images}
                        created_date={created_date}
                        discount={discount}
                    />
                </div>

                <div className="col-lg-6">
                    <ProductContent
                        product={product}
                        reviews={reviews}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSection;


