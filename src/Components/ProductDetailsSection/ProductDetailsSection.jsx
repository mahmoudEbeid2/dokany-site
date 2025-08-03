import { memo } from 'react';
import ProductImagesGallery from './ProductImagesGallery';
import ProductContent from './ProductContent';


const ProductDetailsSection = memo(({ product, reviews }) => {
  if (!product) {
    return (
      <div className="container my-5 text-center">
        <div className="placeholder-glow">
          <h4 className="text-muted">Loading product details...</h4>
        </div>
      </div>
    );
  }

  const {
    images = [],
    created_date = null,
    discount = 0,
  } = product;

  return (
    <div className="container my-5">

      <div className="row justify-content-between">
        <div className="col-lg-6 mb-4 mb-lg-0">
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
});

export default ProductDetailsSection;




