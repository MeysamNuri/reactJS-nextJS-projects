import React, { useState , useContext} from 'react';
import EitTodo from './EditTodo'
import TodosContext from './context/todos'
import todoAPI from './../API/todos'
import {Link} from "react-router-dom"
const ShowTodo = (props) => {
    
    const [editTodo,setEditTodo]=useState(false)
    const todoscontext=useContext(TodosContext)
    let {item}=props
    const editHandlerTodo=(text)=>{
        todoAPI.put(`/todos/${item.key}.json`,{done:item.done,text})
        .then(response=>{
            todoscontext.dispatch({type:"EDIT_TODO",payload:{key:item.key,text}})

        })
        .catch(err=>console.log(err))
        setEditTodo(false)
    }
    let deleteTodoo=(e)=>{
        todoAPI.delete(`/todos/${item.key}.json`)
        .then(response=> todoscontext.dispatch({type:"DELETE_TODO",payload:{key:item.key}}))
        .catch(err=>console.log(err))
        todoscontext.dispatch({type:"DELETE_TODO",payload:{key:item.key}})
    }
    let doneHandler=(e)=>{
        todoAPI.put(`/todos/${item.key}.json`,{done:!item.done,text:item.text})
        .then(response=>{
            todoscontext.dispatch({type:"DONE_TODO",payload:{key:item.key}})

        })
        .catch(err=>console.log(err))
    }
    return (
      <>
      {
          !editTodo?
          (  <div class="col-6 mb-2">
          <div class="d-flex justify-content-between align-items-center border rounded p-3">
              <div>
                  <Link to={`/todos/${item.key}`}>    {item.text}</Link>
               
                
              </div>
              <div>
                  <button type="button" class={`btn btn-sm mr-1 ${!item.done ? "btn-success" : "btn-warning"}`} onClick={doneHandler}>{item.done ? "undone" : "done"}</button>
                  <button type="button" class="btn btn-info btn-sm" onClick={()=>setEditTodo(true)}>edit</button>
                  <button type="button" class="btn btn-danger btn-sm ml-1" onClick={deleteTodoo} >delete</button>
              </div>
          </div>
      </div>)
      : <EitTodo text={item.text} editTextTodo={editHandlerTodo} />
      }
      </>
    );
}

export default ShowTodo;