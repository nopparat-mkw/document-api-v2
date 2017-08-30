import { FirebaseList } from 'src/firebase/index';
import * as apiActions from './actions';
import { Api } from './api';


export const apiList = new FirebaseList({
  onAdd: apiActions.createApiSuccess,
  onChange: apiActions.updateApiSuccess,
  onLoad: apiActions.loadApisSuccess,
  onRemove: apiActions.removeApiSuccess
}, Api);
