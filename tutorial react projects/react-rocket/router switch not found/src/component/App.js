import React, { useReducer } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './../Routes/Home'
import About from './../Routes/About'
import Contact from './../Routes/Contact'
import Header from './Header'
import TodosContext from './context/todos'
import AuthContext from './context/auth'
import TodoReducer from './../reducer/reducer'
import SingleTodo from './../Routes/singleTodo'
import NotFound from './../Routes/NotFound'
const App = () => {
    // const [todos, setTodos] = useState([])
    // const [authenticated,setAuthenticated]=useState(false)

    const [state, dispatch] = useReducer(TodoReducer, {
        todos: [],
        authenticated: false
    })

    return (

        <>
            <BrowserRouter>
                <AuthContext.Provider value={{
                    authenticated: state.authenticated,
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
                                <Switch>

                                    <Route path="/" exact component={Home} />
                                  
                                    <Route path="/about" component={About} />
                                    <Route path="/contact" component={Contact} />
                                    <Route path="/todos/:id" component={SingleTodo} />                             
                                    <Route path="" component={NotFound} />
                                    <Route path="/404" component={NotFound} />
                                </Switch>
                            </main>
                        </div>
                    </TodosContext.Provider>
                </AuthContext.Provider>

            </BrowserRouter>

        </>
    );
}

export default App;