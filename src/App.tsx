import { useState, useCallback, useMemo } from "react";
import { add, remove, update, getTodoListSelector, useAppDispatch, useAppSelector } from "./store";
import { bindActionCreators } from '@reduxjs/toolkit';

export default function App() {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();
  const boundActionCreators = useMemo(() => bindActionCreators({ add, remove, update }, dispatch), [dispatch]);
  const todoList = useAppSelector( getTodoListSelector ); 

  const dispatchTitle =  useCallback( () => {
    boundActionCreators.add(title);
    setTitle('');
  }, [boundActionCreators, title]);

  const onRemove = useCallback((id: string) => {
    boundActionCreators.remove(id);
  },[boundActionCreators]);

  const onUpdate = useCallback((id: string) => {
    boundActionCreators.update(id);
  },[boundActionCreators])

  return (
    <>
      <div className="App">
        <input 
          value={title} 
          onChange={ (e) =>{ setTitle(e.target.value) }} 
        />
        <button onClick={ dispatchTitle }> add todo to Redux </button>
      </div>
      <hr/>
      {/* Get todos From Store */}
      <ul>{ todoList && todoList?.map( todo => 
      <li key={todo.id}> 
         <span>{todo?.title} </span>
         <button onClick={() => onUpdate(todo?.id) }>
            {todo.completed ? "Marked" : "UnMarked"}
          </button>
         <button onClick={() => onRemove(todo?.id)}> X </button>
        </li> ) }
       </ul>
    </>
  );
};
