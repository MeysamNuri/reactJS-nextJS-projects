import React,{useState} from 'react';
import FormAddTodo from './FormAddTodo'
import Header from './Header'
import ShowTodo from './ShowTodo'
const App = () => {
    const [todos, setTodos] = useState([])
    const [statusDone,setStatusDone]=useState(false)
    const addTodo=(text)=>{
        setTodos(
            [...todos,
            { key: Math.floor(Math.random() * 1000), done: false, text }]
        )
    }
    let filterTodods=todos.filter(item=> item.done=== statusDone)
    return (

        <>
            <div className="App">
                <Header />
                <main>
                    <section className="jumbotron">
                        <div className="container d-flex flex-column align-items-center">
                            <h1 className="jumbotron-heading">Welcome!</h1>
                            <p className="lead text-muted">To get started, add some items to your list:</p>
                        <FormAddTodo add={(text)=>addTodo(text)} />
                        </div>
                    </section>
                    <div className="todosList">
                        <div className="container">
                            <div className="d-flex flex-column align-items-center ">
                                <nav className="col-6 mb-3">
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <a href className={`nav-item nav-link font-weight-bold ${!statusDone?"active":""}`} id="nav-home-tab" onClick={()=>setStatusDone(false)}>undone <span className="badge badge-secondary">{todos.filter(item=> item.done===false).length}</span></a>
                                        <a href className={`nav-item nav-link font-weight-bold ${statusDone?"active":""}`} id="nav-profile-tab" onClick={()=>setStatusDone(true)}>done <span className="badge badge-success">{todos.filter(item=> item.done===true).length}</span></a>
                                    </div>
                                </nav>
                          
                          {
                              filterTodods.length===0?
                              <p>there is no todo</p>
                              : filterTodods.map(item=> <ShowTodo key={item.key} text={item.text}/>)
                          }
                          
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default App;