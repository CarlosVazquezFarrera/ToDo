import { ActionReducerMap } from "@ngrx/store";
import { Task } from "./models/task";
import { tasksReducer } from "./state/reducers/tasks.reducer";
import { sideBarReducer } from "./state/reducers/sidebar.reducer";

export interface AppState {
  tasks: Array<Task>;
  sideBar: boolean;
}

export const appReducer: ActionReducerMap<AppState> = {
  tasks: tasksReducer,
  sideBar: sideBarReducer
}
