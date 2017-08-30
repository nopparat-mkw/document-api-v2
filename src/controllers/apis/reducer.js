import { List, Record } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/auth/action-types';
import {
  CREATE_API_SUCCESS,
  REMOVE_API_SUCCESS,
  FILTER_APIS,
  LOAD_APIS_SUCCESS,
  UPDATE_API_SUCCESS
} from './action-types';


export const ApisState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function apisReducer(state = new ApisState(), {payload, type}) {
  switch (type) {
    case CREATE_API_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case REMOVE_API_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(api => api.key !== payload.key)
      });

    case FILTER_APIS:
      return state.set('filter', payload.filterType || '');

    case LOAD_APIS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_API_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(api => {
          return api.key === payload.key ? payload : api;
        })
      });

    case SIGN_OUT_SUCCESS:
      return new ApisState();

    default:
      return state;
  }
}
