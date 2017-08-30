import { createSelector } from 'reselect';


export function getProducts(state) {
  return state.products;
}

export function getProductList(state) {
  return getProducts(state).list;
}

export function getProductFilter(state) {
  return getProducts(state).filter;
}

export function getDeletedProduct(state) {
  return getProducts(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleProducts = createSelector(
  getProductList,
  getProductFilter,
  (products, filter) => {
    switch (filter) {
      case 'active':
        return products.filter(product => !product.completed);

      case 'completed':
        return products.filter(product => product.completed);

      default:
        return products;
    }
  }
);
