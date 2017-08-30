import { getDeletedProduct, getProducts } from './selectors';
import { productList } from './product-list';
import {
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_ERROR,
    REMOVE_PRODUCT_SUCCESS,
    FILTER_PRODUCTS,
    LOAD_PRODUCTS_SUCCESS,
    UNDELETE_PRODUCT_ERROR,
    UNLOAD_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_SUCCESS
} from './action-types';


export function createProduct( title ) {
    return dispatch => {
        productList.push({ title })
            .catch(error => dispatch(createProductError(error)));
    };
}

export function createProductError( error ) {
    return {
        type: CREATE_PRODUCT_ERROR,
        payload: error
    };
}

export function createProductSuccess( product ) {
    return {
        type: CREATE_PRODUCT_SUCCESS,
        payload: product
    };
}

export function removeProduct( product ) {
    return dispatch => {
        productList.remove(product.key)
            .catch(error => dispatch(removeProductError(error)));
    };
}

export function removeProductError( error ) {
    return {
        type: REMOVE_PRODUCT_ERROR,
        payload: error
    };
}

export function removeProductSuccess( product ) {
    return {
        type: REMOVE_PRODUCT_SUCCESS,
        payload: product
    };
}

export function undeleteProduct() {
    return ( dispatch, getState ) => {
        const product = getDeletedProduct(getState());
        if (product) {
            productList.set(product.key, { title: product.title })
                .catch(error => dispatch(undeleteProductError(error)));
        }
    };
}

export function undeleteProductError( error ) {
    return {
        type: UNDELETE_PRODUCT_ERROR,
        payload: error
    };
}

export function updateProductError( error ) {
    return {
        type: UPDATE_PRODUCT_ERROR,
        payload: error
    };
}

export function updateProduct( product, changes ) {
    return dispatch => {
        productList.update(product.key, changes)
            .catch(error => dispatch(updateProductError(error)));
    };
}

export function updateProductSuccess( product ) {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        payload: product
    };
}

export function loadProductsSuccess( products ) {
    return {
        type: LOAD_PRODUCTS_SUCCESS,
        payload: products
    };
}

export function filterProducts( filterType ) {
    return {
        type: FILTER_PRODUCTS,
        payload: { filterType }
    };
}

export function loadProducts() {
    return ( dispatch, getState ) => {
        console.log(getProducts(getState()))
        productList.path = `products-api`;
        productList.subscribe(dispatch);
    };
}

export function unloadProducts() {
    productList.unsubscribe();
    return {
        type: UNLOAD_PRODUCTS_SUCCESS
    };
}
