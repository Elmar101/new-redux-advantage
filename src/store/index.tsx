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

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: usersReducer,
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

export { add, remove, update, updateTitle, fetchUsers };
export { getTodoListSelector };