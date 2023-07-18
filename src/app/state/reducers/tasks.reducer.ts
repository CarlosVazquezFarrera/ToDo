import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { add } from '../actions/tasks.actions';
const c = new Task('Example23');
c.completed = true;
export const initialState:Array<Task> = [
  new Task('example'),
  c
];

export const tasksReducer = createReducer(
  initialState,
  on(add, (state, { text }) => [...state, new Task(text)]),
);
