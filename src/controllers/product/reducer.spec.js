import { List } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/auth/action-types';

import {
  CREATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_SUCCESS,
  FILTER_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_SUCCESS
} from './action-types';

import { Product } from './product';
import { productsReducer, ProductsState } from './reducer';


describe('Products reducer', () => {
  let product1;
  let product2;

  beforeEach(() => {
    product1 = new Product({completed: false, key: '0', title: 'product 1'});
    product2 = new Product({completed: false, key: '1', title: 'product 2'});
  });


  describe('CREATE_PRODUCT_SUCCESS', () => {
    it('should prepend new product to list', () => {
      let state = new ProductsState({list: new List([product1])});

      let nextState = productsReducer(state, {
        type: CREATE_PRODUCT_SUCCESS,
        payload: product2
      });

      expect(nextState.list.get(0)).toBe(product2);
      expect(nextState.list.get(1)).toBe(product1);
    });
  });


  describe('REMOVE_PRODUCT_SUCCESS', () => {
    it('should remove product from list', () => {
      let state = new ProductsState({list: new List([product1, product2])});

      let nextState = productsReducer(state, {
        type: REMOVE_PRODUCT_SUCCESS,
        payload: product2
      });

      expect(nextState.deleted).toBe(product2);
      expect(nextState.list.size).toBe(1);
      expect(nextState.list.get(0)).toBe(product1);
      expect(nextState.previous).toBe(state.list);
    });
  });


  describe('FILTER_PRODUCTS', () => {
    it('should set filter with provided value', () => {
      let state = new ProductsState();

      let nextState = productsReducer(state, {
        type: FILTER_PRODUCTS,
        payload: {
          filterType: 'completed'
        }
      });

      expect(nextState.filter).toBe('completed');
    });
  });


  describe('LOAD_PRODUCTS_SUCCESS', () => {
    it('should set product list', () => {
      let state = new ProductsState();

      let nextState = productsReducer(state, {
        type: LOAD_PRODUCTS_SUCCESS,
        payload: [product1, product2]
      });

      expect(nextState.list.size).toBe(2);
    });

    it('should order products newest first', () => {
      let state = new ProductsState();

      let nextState = productsReducer(state, {
        type: LOAD_PRODUCTS_SUCCESS,
        payload: [product1, product2]
      });

      expect(nextState.list.get(0)).toBe(product2);
      expect(nextState.list.get(1)).toBe(product1);
    });
  });


  describe('UPDATE_PRODUCT_SUCCESS', () => {
    it('should update product', () => {
      let state = new ProductsState({list: new List([product1, product2])});
      let changedProduct = product2.set('title', 'changed');

      let nextState = productsReducer(state, {
        type: UPDATE_PRODUCT_SUCCESS,
        payload: changedProduct
      });

      expect(nextState.list.get(0)).toBe(product1);
      expect(nextState.list.get(1)).toBe(changedProduct);
    });
  });


  describe('SIGN_OUT_SUCCESS', () => {
    it('should reset state', () => {
      let state = new ProductsState({
        delete: product1,
        list: new List([product1, product2]),
        previous: new List()
      });

      let nextState = productsReducer(state, {
        type: SIGN_OUT_SUCCESS
      });

      expect(nextState.deleted).toBe(null);
      expect(nextState.list.size).toBe(0);
      expect(nextState.previous).toBe(null);
    });
  });
});
