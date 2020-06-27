import React, { useState,useReducer, useEffect } from 'react';
import FormAddTodo from './FormAddTodo'
import Header from './Header'
import TosoList from './Todolist'
import TodosContext from './context/todos'
import AuthContext from './context/auth'
import TodoReducer from './../reducer/reducer'
import todoAPI from './../API/todos'
const App = () => {
    // const [todos, setTodos] = useState([])
    // const [authenticated,setAuthenticated]=useState(false)
   
const [state,dispatch]=useReducer(TodoReducer,{
    todos:[],
    authenticated:false
})


let jsonHandler=(data)=>{
    let todos=  Object.entries(data).map(([key,value])=>{
      return{
          ...value,
          key
      }
  })
  dispatch({type:"init_todo",payload:{todos}})
  }
 useEffect(()=>{
    todoAPI.get(`/todos.json`)
    .then(response=> jsonHandler(response.data))
    .catch(err=>console.log(err))
 },[])
    return (

        <>
            <AuthContext.Provider value={{
                authenticated:state.authenticated,
                dispatch
            }}>
                <TodosContext.Provider value={{
                    todos: state.todos,
                    dispatch
                    // todos: todos,
                    // deleteTodo: deleteTodo,
                    // edit: EditTodoHandler,
                    // done: doneHandler,
                    // add: addTodo

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