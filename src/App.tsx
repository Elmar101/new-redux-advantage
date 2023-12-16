import AddForm from "./components/add-folder";
import TodoList from "./components/todo-list";
import { fetchUsers, useAppDispatch, useAppSelector } from "./store";

export default function App() {
  const user = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

   const fetchUsersWithApi = () => {
    dispatch(fetchUsers())
  };

  return (
    <>
      <AddForm />
      <hr />
      <TodoList />
      <br/>
      <hr/>
      <div>
        <button onClick={fetchUsersWithApi}> fetch users</button>
        {user.loading && JSON.stringify(user.error)}
        {user.error && user.error.toString()}
        {user.data && <div>Name: {JSON.stringify(user.data)}</div>}
      </div>
    </>
  );
}
