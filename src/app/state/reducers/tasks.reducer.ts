import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { add, complet, edit, remove, toggleAll } from '../actions/tasks.actions';

const completed = new Task("example 3");
completed.completed = true;
export const initialState: Array<Task> = [
  new Task('example'),
  new Task('example 2'),
  completed
];

export const tasksReducer = createReducer(
  initialState,
  on(add, (state, { text }) => [...state, new Task(text)]),
  on(remove, (state, { id }) => state.filter((t) => t.id !== id)),
  on(complet, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: true
        };
      }
      return todo;
    });
  }),
  on(edit, (state, { id, text }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: text
        };
      }
      return todo;
    });
  }),
  on(toggleAll, (state, { completed }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completed: completed
      };
    })
  })
);
