import { List, Record } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/auth/action-types';
import {
  CREATE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_SUCCESS,
  FILTER_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_SUCCESS
} from './action-types';


export const ProductsState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function productsReducer(state = new ProductsState(), {payload, type}) {
  switch (type) {
    case CREATE_PRODUCT_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case REMOVE_PRODUCT_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(product => product.key !== payload.key)
      });

    case FILTER_PRODUCTS:
      return state.set('filter', '');

    case LOAD_PRODUCTS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_PRODUCT_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(product => {
          return product.key === payload.key ? payload : product;
        })
      });

    case SIGN_OUT_SUCCESS:
      return new ProductsState();

    default:
      return state;
  }
}
