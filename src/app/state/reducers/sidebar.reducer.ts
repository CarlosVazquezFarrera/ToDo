import { createReducer, on } from "@ngrx/store";
import { toggleSideBar } from "../actions/sidebar.actions";


export const initialState: boolean = false;
export const sideBarReducer = createReducer(
  initialState,
  on(toggleSideBar, (state) => !state)
);
