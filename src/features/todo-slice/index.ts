import { createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
};

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add:( state, action: PayloadAction<Todo['title']>)=> {
      const newTodo: Todo = {
          id: nanoid(),
          title: action.payload,
          completed: false,
      };

      state.push(newTodo);
    }
  },
});

export const { add } = todosSlice.actions;
export const todoReducer = todosSlice.reducer; 