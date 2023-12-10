import { useCallback, useState } from "react";
import { add, useAppDispatch } from "../../store";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const dispatchTitle = useCallback(() => {
    dispatch(add(title));
    setTitle("");
  }, [title,dispatch]);

  return (
    <>
      <input
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button onClick={dispatchTitle}> add todo to Redux </button>
    </>
  );
};

export default AddForm;