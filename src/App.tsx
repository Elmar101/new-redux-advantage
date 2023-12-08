import { useState, useCallback } from "react";
// import { useAppDispatch } from './store/index';
import { Todo } from "./features/todo-slice";
import {useDispatch, useSelector} from 'react-redux';
import { RootState, add } from "./store";

export default function App() {
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();
  // const userList: Todo[] = useSelector<RootState>(state => state.todos) as Todo[];
  const userList = useSelector<RootState, Todo[]>(state => state.todos);
  console.log({userList});
  

  const dispatchTitle =  useCallback( () => {
    dispatch(add(title));
    setTitle('');
  }, [dispatch, title, add]);

  return (
    <>
      <div className="App">
        <input 
          value={title} 
          onChange={(e) =>{ setTitle(e.target.value); console.log({title});
           }} 
        />
        <button onClick={ dispatchTitle }> add todo to Redux </button>
      </div>
      <hr/>
      {/* Get Users From Store */}
      <ul>{ userList && userList.map( user => <li key={user.id}> {user?.title} </li> ) }</ul>
    </>
  );
}


//   const dispatchTitle =  useCallback( () => {

//     const y = x;
//     // cholden deyisen varsa, ve ya state istifade edirsense asliliqa vermelisen
//       // 1 neyise dipatch
//       // 2 Api request
//       const z = title;
//       const v = mt()
//   }, [] );

//  const obj = {
//   name: 'mino'
//  }
//  const onj = useMemo(() => {
//   return {
//     name: title,
//   }
//  } , [title])

/// Memory - de 
/*

() => {
      1 neyise dipatch
      2 Api request
}

*/


// without useCallback
/*
index 1 : title = ''
index 2: dispatchTitle = () => { 1 neyise dipatch 2 Api request }
index 3: title: M
index 5: title: I
----------------------------
index 1 tite : ''
index 2 obj : {
  name: 'mino'
 }
 index 3 title : 'M'
 index 4  obj : {
  name: 'mino'
 }
*/
