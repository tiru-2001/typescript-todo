import { createContext, ReactNode, useContext, useState } from 'react';

export const todosContext = createContext<TodosContext | null>(null);
export type TodosProviderProps = {
  children: ReactNode;
};

export type TodosContext = {
  todos: Todo[];
  handleAddToDo: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
};
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export const TodosContainer = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem('todos') || '[]';
      return JSON.parse(newTodos) as Todo[];
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  const handleAddToDo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      console.log(prev);
      console.log(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // mark completed
  const toggleTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };
  //delete
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((filterTodo) => filterTodo.id !== id);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
  };
  return (
    <todosContext.Provider
      value={{ todos, handleAddToDo, toggleTodoAsCompleted, handleDeleteTodo }}
    >
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error('useTodos used outside of Provider');
  }
  return todosConsumer;
};
