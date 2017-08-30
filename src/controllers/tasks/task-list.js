import { FirebaseList } from 'src/firebase/index';
import * as taskActions from './actions';
import { Task } from './task';


export const taskList = new FirebaseList({
  onAdd: taskActions.createTaskSuccess,
  onChange: taskActions.updateTaskSuccess,
  onLoad: taskActions.loadTasksSuccess,
  onRemove: taskActions.removeTaskSuccess
}, Task);
