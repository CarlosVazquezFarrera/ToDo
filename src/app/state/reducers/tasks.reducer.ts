import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { add, toggle } from '../actions/tasks.actions';


export const initialState: Array<Task> = [
  new Task('example'),
  new Task('example 2'),
];

export const tasksReducer = createReducer(
  initialState,
  on(add, (state, { text }) => [...state, new Task(text)]),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
  })
);
