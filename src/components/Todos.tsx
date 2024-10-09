import { Todo, useTodos } from '../store/todos';
import { useSearchParams } from 'react-router-dom';
const Todos = () => {
  const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();
  let filterData = todos;
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get('todos');
  if (todosData === 'active') {
    filterData = filterData.filter((task) => !task.completed);
  }

  if (todosData === 'completed') {
    filterData = filterData.filter((task) => task.completed);
  }
  console.log(todosData);
  return (
    <ul className="main-task">
      {filterData.map((item: Todo) => (
        <li key={item.id}>
          <input
            type="checkbox"
            onChange={() => toggleTodoAsCompleted(item.id)}
            checked={item.completed}
            id={`todo-${item.id}`}
          />
          <label htmlFor={`todo-${item.id}`}>{item.task}</label>
          {item.completed && (
            <button type="button" onClick={() => handleDeleteTodo(item.id)}>
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Todos;
