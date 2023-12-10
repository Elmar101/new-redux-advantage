import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

type TypeAddActionPayload = PayloadAction<{
  title: Todo["title"];
  id: Todo["id"];
}>;

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo["title"]>) => {
      const newTodo: Todo = {
        id: nanoid(),
        title: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },
    remove: (state, action: PayloadAction<Todo["id"]>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    update: (state, action: PayloadAction<Todo["id"]>) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
    updateTitle: (state, action: TypeAddActionPayload) => {
      console.log(action.payload);
      const { id, title } = action.payload;
      return state.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title };
        }
        return todo;
      });
    },
  },
});

export const { add, remove, update, updateTitle } = todosSlice.actions;
export const todoReducer = todosSlice.reducer;