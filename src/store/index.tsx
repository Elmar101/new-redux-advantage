import { configureStore } from "@reduxjs/toolkit";
import {
  todoReducer,
  add,
  remove,
  update,
  updateTitle,
} from "../features/todo-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchUsers, usersReducer } from "../features/user-slice";
import { jsonServerUserReducer } from "../features/json-server-user-slice";
import { fetchJsonServerUsers } from "../features/json-server-user-slice/create-thunk";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: usersReducer,
    jsonServerUsers: jsonServerUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// actions exports

// selectors
const getState = (state: RootState) => state;
const getTodoListSelector = (state: RootState) => getState(state)?.todos;

export { add, remove, update, updateTitle, fetchUsers, fetchJsonServerUsers };
export { getTodoListSelector };