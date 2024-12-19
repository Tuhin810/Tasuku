import React, { useContext } from "react";
import AddTodo from "../../../shared/addTodo/AddTodo";
import TodoCards from "../../../shared/todoCards/TodoCards";
import { TodoContext } from "../../../../context/todoProvider";

const TodoList = () => {
  const { todos } = useContext(TodoContext); // Fetch todos from the context
  console.log("=====>list", todos);

  return (
    <div className="w-full md:w-3/5">
      <AddTodo />
      <div className="grid grid-cols-1  h-auto max-h-screen overflow-y-auto sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-2 mt-6  ">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoCards key={todo.id} todo={todo} /> // Pass each todo item as a prop
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No todos available. Add one now!
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
