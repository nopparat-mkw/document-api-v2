import { List } from 'immutable';
import { ProductsState } from './reducer';
import { getVisibleProducts } from './selectors';
import { Product } from './product';


describe('Products selectors', () => {
  let products;

  beforeEach(() => {
    products = new ProductsState({
      list: new List([
        new Product({completed: false, title: 'product-1'}),
        new Product({completed: true, title: 'product-2'})
      ])
    });
  });


  describe('getVisibleProducts()', () => {
    it('should return list of all products', () => {
      let productList = getVisibleProducts({products});
      expect(productList.size).toBe(2);
    });

    it('should return list of active (incomplete) products', () => {
      products = products.set('filter', 'active');
      let productList = getVisibleProducts({products});

      expect(productList.size).toBe(1);
      expect(productList.get(0).title).toBe('product-1');
    });

    it('should return list of completed products', () => {
      products = products.set('filter', 'completed');
      let productList = getVisibleProducts({products});

      expect(productList.size).toBe(1);
      expect(productList.get(0).title).toBe('product-2');
    });
  });
});
