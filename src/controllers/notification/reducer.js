import { Record } from 'immutable';
import { REMOVE_TASK_SUCCESS } from 'src/controllers/tasks/index';
import { REMOVE_API_SUCCESS } from 'src/controllers/apis/index';
import { REMOVE_PRODUCT_SUCCESS } from 'src/controllers/product/index';
import { DISMISS_NOTIFICATION } from './action-types';


export const NotificationState = new Record({
    actionLabel: '',
    display: false,
    message: ''
});


export function notificationReducer( state = new NotificationState(), action ) {
    switch (action.type) {
        case REMOVE_TASK_SUCCESS:
            return state.merge({
                actionLabel: 'Undo',
                display: true,
                message: 'Task deleted'
            });

        case REMOVE_API_SUCCESS:
            return state.merge({
                actionLabel: 'Undo',
                display: true,
                message: 'Api deleted'
            });

        case REMOVE_PRODUCT_SUCCESS:
            return state.merge({
                actionLabel: 'Undo',
                display: true,
                message: 'Product deleted'
            });

        case DISMISS_NOTIFICATION:
            return new NotificationState();

        default:
            return new NotificationState();
    }
}
