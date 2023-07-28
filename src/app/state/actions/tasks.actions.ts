import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[Todo] Add',
  props<{ text: string }>()
);

export const toggle = createAction(
  '[Task] toggle',
  props<{ id: string }>()
);

export const edit = createAction(
  '[Task] edit',
  props<{ id: string, text: string }>()
);

export const remove = createAction(
  '[Task] remove',
  props<{ id: string }>()
);

export const toggleAll = createAction(
  '[Task] toggle all',
  props<{ completed: boolean }>()
);
