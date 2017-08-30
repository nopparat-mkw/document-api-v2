import React  from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import ProductItem from '../product-item/product-item';


function ProductList({removeProduct, products, updateProduct}) {
  let productItems = products.map((product, index) => {
    return (
      <ProductItem
        key={index}
        product={product}
        removeProduct={removeProduct}
        updateProduct={updateProduct}
      />
    );
  });

  return (
    <div className="product-list">
      {productItems}
    </div>
  );
}

ProductList.propTypes = {
  removeProduct: PropTypes.func.isRequired,
  products: PropTypes.instanceOf(List).isRequired,
  updateProduct: PropTypes.func.isRequired
};

export default ProductList;
