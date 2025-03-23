import React, { useState } from 'react';
import FormAddTodo from './FormAddTodo'
import Header from './Header'
import TosoList from './Todolist'
import TodosContext from './context/todos'
import AuthContext from './context/auth'
const App = () => {
    const [todos, setTodos] = useState([])
    const [authenticated,setAuthenticated]=useState(false)
    const addTodo = (text) => {
        setTodos(
            [...todos,
            { key: Math.floor(Math.random() * 1000), done: false, text }]
        )
    }
    const deleteTodo = (todoKey) => {
        setTodos(
            todos.filter(item => item.key !== todoKey)
        )
    }
    const EditTodoHandler = (key, text) => {
        let item = todos.find(item => item.key === key)
        item.text = text
        let newTodos = todos.filter(item => item.key !== key)
        setTodos(
            [...newTodos,
                item]
        )

    }
    const doneHandler = (key) => {
        let item = todos.find(item => item.key === key)
        item.done = !item.done
        let newTodos = todos.filter(item => item.key !== key)
        setTodos([
            ...newTodos,
            item
        ])

    }

    return (

        <>
            <AuthContext.Provider value={{
                authenticated:authenticated,
                login:()=>{setAuthenticated(true)},
                logout:()=>{setAuthenticated(false)}
            }}>
                <TodosContext.Provider value={{
                    todos: todos,
                    deleteTodo: deleteTodo,
                    edit: EditTodoHandler,
                    done: doneHandler,
                    add: addTodo

                }}>
                    <div className="App">
                        <Header />
                        <main>
                            <section className="jumbotron">
                                <div className="container d-flex flex-column align-items-center">
                                    <h1 className="jumbotron-heading">Welcome!</h1>
                                    <p className="lead text-muted">To get started, add some items to your list:</p>
                                    <FormAddTodo />
                                </div>
                            </section>
                            <div className="todosList">
                                <div className="container">
                                    <div className="d-flex flex-column align-items-center ">

                                        <TosoList />
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>
                </TodosContext.Provider>
            </AuthContext.Provider>


        </>
    );
}

export default App;