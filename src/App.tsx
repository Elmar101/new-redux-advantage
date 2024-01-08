import AddForm from "./components/add-folder";
import TodoList from "./components/todo-list";
import { fetchJsonServerUsers, fetchUsers, useAppDispatch, useAppSelector } from "./store";

export default function App() {
  const user = useAppSelector((state) => state.users);
  const jsonServerUsers = useAppSelector((state) => state.jsonServerUsers);

  const dispatch = useAppDispatch();

   const fetchUsersWithApi = () => {
    dispatch(fetchUsers())
  };

  const handleFetchJsonServerUsers = () => {
    dispatch(fetchJsonServerUsers());
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
      <hr/>
      <button onClick={handleFetchJsonServerUsers}> Fetch Json server Users </button>
      {jsonServerUsers.loading && <h1>LOADING... </h1>}
      {jsonServerUsers.error && <h1 style={{color: 'red'}}>{jsonServerUsers.error}</h1>}
      <ul>
        { jsonServerUsers && jsonServerUsers?.data?.map((user)=> (<li key={user.id}>
          <h1>{user.id}</h1>
          <p>{user.name}</p>
          <img src={user.img}/>
        </li>))}
      </ul>
    </>
  );
};
