import { useCallback, useMemo, useState } from "react";
import {
  getTodoListSelector,
  useAppDispatch,
  useAppSelector,
  remove,
  update,
  updateTitle,
} from "../../store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Todo } from "../../features/todo-slice";
const TodoList = () => {
  const todoList = useAppSelector(getTodoListSelector);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState("");
  const dispatch = useAppDispatch();
  const boundActionCreators = useMemo(
    () => bindActionCreators({ remove, update, updateTitle }, dispatch),
    [dispatch]
  );
  const onUpdate = useCallback(
    (id: string) => {
      boundActionCreators.update(id);
    },
    [boundActionCreators]
  );
  const onRemove = useCallback(
    (id: string) => {
      boundActionCreators.remove(id);
    },
    [boundActionCreators]
  );
  const editTitle = useCallback(
    (todoObj: Todo) => {
      setIsEdit(!isEdit);
      const { id, title } = todoObj ?? {};
      if(isEdit) setState(title);
      else {
        boundActionCreators.updateTitle({ id, title: state });
        setState(title);
      };
    },
    [state, boundActionCreators, isEdit]
  );
  return (
    <>
      <ul>
        {todoList &&
          todoList?.map((todo) => (
            <li key={todo.id}>
              {isEdit ? (
                <input
                  name="updatedTitle"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
              ) : (
                <span>{todo?.title} </span>
              )}
              <button onClick={() => onUpdate(todo?.id)}>
                {todo.completed ? "Marked" : "UnMarked"}
              </button>
              <button onClick={() => onRemove(todo?.id)}> X </button>
              <button onClick={() => editTitle(todo)}>
                {isEdit ? "Save" : "Edit"}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TodoList;