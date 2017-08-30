import { FirebaseList } from 'src/firebase/index';
import * as productActions from './actions';
import { Product } from './product';


export const productList = new FirebaseList({
  onAdd: productActions.createProductSuccess,
  onChange: productActions.updateProductSuccess,
  onLoad: productActions.loadProductsSuccess,
  onRemove: productActions.removeProductSuccess
}, Product);
