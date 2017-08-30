import { getDeletedApi } from './selectors';
import { apiList } from './api-list';
import {
    CREATE_API_ERROR,
    CREATE_API_SUCCESS,
    REMOVE_API_ERROR,
    REMOVE_API_SUCCESS,
    FILTER_APIS,
    LOAD_APIS_SUCCESS,
    UNDELETE_API_ERROR,
    UNLOAD_APIS_SUCCESS,
    UPDATE_API_ERROR,
    UPDATE_API_SUCCESS
} from './action-types';

export function createApi( data ) {
    return dispatch => {
        apiList.push(data)
            .catch(error => dispatch(createApiError(error)));
    };
}

export function createApiError( error ) {
    return {
        type: CREATE_API_ERROR,
        payload: error
    };
}

export function createApiSuccess( api ) {
    return {
        type: CREATE_API_SUCCESS,
        payload: api
    };
}

export function removeApi( api ) {
    return dispatch => {
        apiList.remove(api.key)
            .catch(error => dispatch(removeApiError(error)));
    };
}

export function removeApiError( error ) {
    return {
        type: REMOVE_API_ERROR,
        payload: error
    };
}

export function removeApiSuccess( api ) {
    return {
        type: REMOVE_API_SUCCESS,
        payload: api
    };
}

export function undeleteApi() {
    return ( dispatch, getState ) => {
        const api = getDeletedApi(getState());
        if (api) {
            apiList.set(api.key,
                {
                    title: api.title,
                    url: api.url,
                    method: api.method,
                    url_params: api.url_params,
                    data_params: api.data_params,
                    success_response: api.success_response,
                    error_response: api.error_response,
                    sample_call: api.sample_call,
                    notes: api.notes
                }).catch(error => dispatch(undeleteApiError(error)));
        }
    };
}

export function undeleteApiError( error ) {
    return {
        type: UNDELETE_API_ERROR,
        payload: error
    };
}

export function updateApiError( error ) {
    return {
        type: UPDATE_API_ERROR,
        payload: error
    };
}

export function updateApi( api, changes ) {
    return dispatch => {
        apiList.update(api.key, changes)
            .catch(error => dispatch(updateApiError(error)));
    };
}

export function updateApiSuccess( api ) {
    return {
        type: UPDATE_API_SUCCESS,
        payload: api
    };
}

export function loadApisSuccess( apis ) {
    return {
        type: LOAD_APIS_SUCCESS,
        payload: apis
    };
}

export function filterApis( filterType ) {
    return {
        type: FILTER_APIS,
        payload: { filterType }
    };
}

export function loadApis( id ) {
    return ( dispatch ) => {
        apiList.path = `apis/${id}`;
        apiList.subscribe(dispatch);
    };
}

export function unloadApis() {
    apiList.unsubscribe();
    return {
        type: UNLOAD_APIS_SUCCESS
    };
}
