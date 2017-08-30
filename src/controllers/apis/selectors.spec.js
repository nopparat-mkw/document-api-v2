import { List } from 'immutable';
import { ApisState } from './reducer';
import { getVisibleApis } from './selectors';
import { Api } from './api';


describe('Apis selectors', () => {
  let apis;

  beforeEach(() => {
    apis = new ApisState({
      list: new List([
        new Api({completed: false, title: 'api-1'}),
        new Api({completed: true, title: 'api-2'})
      ])
    });
  });


  describe('getVisibleApis()', () => {
    it('should return list of all apis', () => {
      let apiList = getVisibleApis({apis});
      expect(apiList.size).toBe(2);
    });

    it('should return list of active (incomplete) apis', () => {
      apis = apis.set('filter', 'active');
      let apiList = getVisibleApis({apis});

      expect(apiList.size).toBe(1);
      expect(apiList.get(0).title).toBe('api-1');
    });

    it('should return list of completed apis', () => {
      apis = apis.set('filter', 'completed');
      let apiList = getVisibleApis({apis});

      expect(apiList.size).toBe(1);
      expect(apiList.get(0).title).toBe('api-2');
    });
  });
});
