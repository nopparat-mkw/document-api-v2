import { List } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/auth/action-types';

import {
  CREATE_API_SUCCESS,
  REMOVE_API_SUCCESS,
  FILTER_APIS,
  LOAD_APIS_SUCCESS,
  UPDATE_API_SUCCESS
} from './action-types';

import { Api } from './api';
import { apisReducer, ApisState } from './reducer';


describe('Apis reducer', () => {
  let api1;
  let api2;

  beforeEach(() => {
    api1 = new Api({key: '0', title: 'api 1'});
    api2 = new Api({key: '1', title: 'api 2'});
  });


  describe('CREATE_API_SUCCESS', () => {
    it('should prepend new api to list', () => {
      let state = new ApisState({list: new List([api1])});

      let nextState = apisReducer(state, {
        type: CREATE_API_SUCCESS,
        payload: api2
      });

      expect(nextState.list.get(0)).toBe(api2);
      expect(nextState.list.get(1)).toBe(api1);
    });
  });


  describe('REMOVE_API_SUCCESS', () => {
    it('should remove api from list', () => {
      let state = new ApisState({list: new List([api1, api2])});

      let nextState = apisReducer(state, {
        type: REMOVE_API_SUCCESS,
        payload: api2
      });

      expect(nextState.deleted).toBe(api2);
      expect(nextState.list.size).toBe(1);
      expect(nextState.list.get(0)).toBe(api1);
      expect(nextState.previous).toBe(state.list);
    });
  });


  describe('LOAD_APIS_SUCCESS', () => {
    it('should set api list', () => {
      let state = new ApisState();

      let nextState = apisReducer(state, {
        type: LOAD_APIS_SUCCESS,
        payload: [api1, api2]
      });

      expect(nextState.list.size).toBe(2);
    });

    it('should order apis newest first', () => {
      let state = new ApisState();

      let nextState = apisReducer(state, {
        type: LOAD_APIS_SUCCESS,
        payload: [api1, api2]
      });

      expect(nextState.list.get(0)).toBe(api2);
      expect(nextState.list.get(1)).toBe(api1);
    });
  });


  describe('UPDATE_API_SUCCESS', () => {
    it('should update api', () => {
      let state = new ApisState({list: new List([api1, api2])});
      let changedApi = api2.set('title', 'changed');

      let nextState = apisReducer(state, {
        type: UPDATE_API_SUCCESS,
        payload: changedApi
      });

      expect(nextState.list.get(0)).toBe(api1);
      expect(nextState.list.get(1)).toBe(changedApi);
    });
  });


  describe('SIGN_OUT_SUCCESS', () => {
    it('should reset state', () => {
      let state = new ApisState({
        delete: api1,
        list: new List([api1, api2]),
        previous: new List()
      });

      let nextState = apisReducer(state, {
        type: SIGN_OUT_SUCCESS
      });

      expect(nextState.deleted).toBe(null);
      expect(nextState.list.size).toBe(0);
      expect(nextState.previous).toBe(null);
    });
  });
});
