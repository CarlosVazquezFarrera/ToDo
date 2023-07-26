import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[Todo] Add',
  props<{ text: string }>()
);

export const toggle = createAction(
  '[Todo] toggle',
  props<{ id: string }>()
);

export const edit = createAction(
  '[Todo] edit',
  props<{ id: string, text: string }>()
);

export const remove = createAction(
  '[Todo] remove',
  props<{ id: string }>()
);

export const toggleAll = createAction(
  '[Todo] toggle all',
  props<{ completed: boolean }>()
);
