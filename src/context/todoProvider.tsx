import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ITodo } from "../types/todoTypes/todo.types";

// Type for the context state
interface ITodoContext {
  todos: ITodo[]; // List of todos
  addTodo: (todo: ITodo) => void; // Function to add a new todo
  removeTodo: (id: string) => void; // Function to remove a todo by ID
  updateTodo: (updatedTodo: ITodo) => void; // Function to update a todo by ID
  toggleBookmark: (id: string) => void;
}

// Initial state for the context
const initialState: ITodoContext = {
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
  toggleBookmark: () => {},
};

const TodoContext = createContext<ITodoContext>(initialState);

const getTodosFromLocalStorage = (): ITodo[] => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<ITodo[]>(getTodosFromLocalStorage);

  // Save todos to local storage whenever they change
  useEffect(() => {
    // Serialize the todos, ensuring File objects are converted to strings
    const serializedTodos = todos.map((todo) => ({
      ...todo,
      images: todo.images.map((image) =>
        typeof image === "string" ? image : URL.createObjectURL(image)
      ),
    }));
    localStorage.setItem("todos", JSON.stringify(serializedTodos));
  }, [todos]);

  const addTodo = (todo: ITodo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { ...todo, complete: false, bookmark: false },
    ]);
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (updatedTodo: ITodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const toggleBookmark = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, bookmark: !todo.bookmark } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, removeTodo, updateTodo, toggleBookmark }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
