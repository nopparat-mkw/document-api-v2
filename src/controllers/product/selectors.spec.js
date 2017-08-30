import { List } from 'immutable';
import { ProductsState } from './reducer';
import { getVisibleProducts } from './selectors';
import { Product } from './product';


describe('Products selectors', () => {
  let products;

  beforeEach(() => {
    products = new ProductsState({
      list: new List([
        new Product({title: 'product-1'}),
        new Product({title: 'product-2'})
      ])
    });
  });


  describe('getVisibleProducts()', () => {
    it('should return list of all products', () => {
      let productList = getVisibleProducts({products});
      expect(productList.size).toBe(2);
    });
  });
});
