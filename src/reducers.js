import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { notificationReducer } from './notification';
import { tasksReducer } from './controllers/tasks';
import { productsReducer } from './controllers/product';
// import { apisReducer } from './controllers/apis';


export default combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer,
  products: productsReducer,
  // apis: apisReducer
});
