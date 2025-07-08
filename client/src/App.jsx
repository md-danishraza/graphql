import "./App.css";
import { GET_TODOS } from "./Query";
import { useQuery } from "@apollo/client";

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {data.getTodos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> -{" "}
            {todo.completed ? "Completed" : "Pending"}
            <br />
            <em>Assigned to: {todo.user.name}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
