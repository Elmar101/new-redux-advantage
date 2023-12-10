import { createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
};

type TypeAddActionPayload = PayloadAction< {title: Todo['title'], id?: Todo['id']} >

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add:( state, action: TypeAddActionPayload)=> {
      const existsTodo = state.find(st=> st.id === action.payload.id);
      if(existsTodo) {
        return state.map(todo => {
          if(existsTodo) {
            return {...todo, title: action.payload.title}
          }return todo;
        })
      }
      else {
        const newTodo: Todo = { id: nanoid(), title: action.payload.title, completed: false };
        state.push(newTodo);
      }
    },


    remove: (state, action: PayloadAction<Todo['id']>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    update: (state, action: PayloadAction<Todo['id']>) => {
      return state.map(todo => {
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