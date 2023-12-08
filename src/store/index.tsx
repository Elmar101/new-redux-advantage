import { configureStore } from '@reduxjs/toolkit'
import { todoReducer, add } from '../features/todo-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    todos: todoReducer
  },
});

console.log( store.getState() )


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// custom dispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { add };

// https://www.youtube.com/watch?v=nViEqpgwxHE

// interface IPerson<T> {
//   data: T;
// };


// interface IParent {
//   parentdata: IPerson<string>
//   grandParentData: IPerson<number>
//   grandParentData1: IPerson<number[]>
//   grandParentData2: IPerson<{name: string}[]>
// }



// function keyString<T>(data: T, keys: string | string[]){
//   if(typeof data === 'string' ){ /* executor code*/ }
// }
