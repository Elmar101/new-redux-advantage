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
      const newTodo: Todo = { id: nanoid(), title: action.payload, completed: false };
      state.push(newTodo);
    },
    remove: (state, action: PayloadAction<Todo['id']>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    update: (state, action: PayloadAction<Todo['id']>) => {
      return state.map(todo => {
        // state = [ {id: '1', title: 'Elmar' , completed: false} , {id: '1', title: 'Elmar' , completed: false} ]
        if(todo.id === action.payload) {
          return {...todo, completed: !todo.completed};
        }
        return todo;
      });
    }
  },
});

export const { add, remove, update } = todosSlice.actions;
export const todoReducer = todosSlice.reducer; 