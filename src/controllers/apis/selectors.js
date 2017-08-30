import { createSelector } from 'reselect';


export function getApis(state) {
  return state.apis;
}

export function getApiList(state) {
  return getApis(state).list;
}

export function getApiFilter(state) {
  return getApis(state).filter;
}

export function getDeletedApi(state) {
  return getApis(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleApis = createSelector(
  getApiList,
  getApiFilter,
  (apis, filter) => {
    switch (filter) {
      case 'active':
        return apis.filter(api => !api.completed);

      case 'completed':
        return apis.filter(api => api.completed);

      default:
        return apis;
    }
  }
);
