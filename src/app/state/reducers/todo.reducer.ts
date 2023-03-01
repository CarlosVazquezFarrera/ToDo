import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/models/task';
import { add } from '../actions/todo.actions';

export const initialState = Array<Task>();

export const todoReducer = createReducer(
  initialState,
  on(add, (state, { text }) => [...state, new Task(text)]),
);
