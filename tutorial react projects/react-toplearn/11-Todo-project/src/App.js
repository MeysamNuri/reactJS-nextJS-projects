import React, { useState } from "react";
import uuidv4 from "uuid/v4";

import TodoContext from "./context/todoContext";
import Todos from "./components/Task/Todos";
import AddNewTask from "./components/Task/AddTodo";

const App = () => {
    const [getTodos, setTodos] = useState([]);
    const [getTodo, setTodo] = useState("");

    const handleCreateNewTodo = () => {
        const todos = [...getTodos];
        const todo = {
            id: uuidv4(),
            text: getTodo,
            completed: false
        };
        if (getTodo !== "" && getTodo !== " ") {
            todos.push(todo);
            setTodos(todos);
            setTodo("");
        }
    };

    const handleCompletedTodo = id => {
        const todos = [...getTodos];
        const todoIndex = todos.findIndex(t => t.id === id);
        const todo = todos[todoIndex];
        todo.completed = !todo.completed;
        todos[todoIndex] = todo;
        setTodos(todos);
    };

    const handleDeleteTodo = id => {
        const todos = [...getTodos];
        const filteredTodos = todos.filter(t => t.id !== id);
        setTodos(filteredTodos);
    };

    const handleTodoInput = event => {
        setTodo(event.target.value);
    };

    return (
        <TodoContext.Provider
            value={{
                todos: getTodos,
                todo: getTodo,
                handleCreateNewTodo: handleCreateNewTodo,
                handleTodoInput: handleTodoInput,
                handleCompletedTodo: handleCompletedTodo,
                handleDeleteTodo: handleDeleteTodo
            }}
        >
            <div className="d-flex justify-content-center container">
                <div className="col-md-8">
                    <div className="card-hover-shadow-2x mb-3 card">
                        <Todos />
                    </div>
                </div>
            </div>
            <AddNewTask />
        </TodoContext.Provider>
    );
};

export default App;
