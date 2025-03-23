import React, {useState,useContext} from 'react';
import ShowTodo from './ShowTodo'
import TodosContext from './context/todos'
const TosoList = (props) => {
    const [statusDone, setStatusDone] = useState(false)
    const todoscontext=useContext(TodosContext)
    let {todos}=todoscontext
    let filterTodods = todos.filter(item => item.done === statusDone)
    return (

        <>
            <nav className="col-6 mb-3">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a href className={`nav-item nav-link font-weight-bold  ${!statusDone ? "active" : ""}`} id="nav-home-tab" onClick={() => setStatusDone(false)}>undone <span className="badge badge-secondary">{todos.filter(item => item.done === false).length}</span></a>
                    <a href className={`nav-item nav-link font-weight-bold ${statusDone ? "active" : ""}`} id="nav-profile-tab" onClick={() => setStatusDone(true)}>done <span className="badge badge-success">{todos.filter(item => item.done === true).length}</span></a>
                </div>
            </nav>

            {
                filterTodods.length === 0 ?
                    <p>there is no todo</p>
                    : filterTodods.map(item => <ShowTodo key={item.key} item={item} />)
            }
        </>
    );
}

export default TosoList;