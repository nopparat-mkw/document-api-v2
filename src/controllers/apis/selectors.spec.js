import { List } from 'immutable';
import { ApisState } from './reducer';
import { getVisibleApis } from './selectors';
import { Api } from './api';


describe('Apis selectors', () => {
  let apis;

  beforeEach(() => {
    apis = new ApisState({
      list: new List([
        new Api({title: 'api-1'}),
        new Api({title: 'api-2'})
      ])
    });
  });


  describe('getVisibleApis()', () => {
    it('should return list of all apis', () => {
      let apiList = getVisibleApis({apis});
      expect(apiList.size).toBe(2);
    });
  });
});
