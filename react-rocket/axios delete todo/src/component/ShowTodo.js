import React, { useState , useContext} from 'react';
import EitTodo from './EditTodo'
import TodosContext from './context/todos'
import axios from "axios"
const ShowTodo = (props) => {
    
    const [editTodo,setEditTodo]=useState(false)
    const todoscontext=useContext(TodosContext)
    let {item}=props
    const editHandlerTodo=(text)=>{
        todoscontext.dispatch({type:"EDIT_TODO",payload:{key:item.key,text}})
        setEditTodo(false)
    }
    let deleteTodoo=(e)=>{
        axios.delete(`https://react-course2.firebaseio.com/todos/${item.key}.json`)
        .then(response=> todoscontext.dispatch({type:"DELETE_TODO",payload:{key:item.key}}))
        .catch(err=>console.log(err))
        todoscontext.dispatch({type:"DELETE_TODO",payload:{key:item.key}})
    }
    let doneHandler=(e)=>{
       todoscontext.dispatch({type:"DONE_TODO",payload:{key:item.key}})
    }
    return (
      <>
      {
          !editTodo?
          (  <div class="col-6 mb-2">
          <div class="d-flex justify-content-between align-items-center border rounded p-3">
              <div>
                  {item.text}
                
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