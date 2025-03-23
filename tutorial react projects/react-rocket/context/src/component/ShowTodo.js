import React, { useState , useContext} from 'react';
import EitTodo from './EditTodo'
import TodosContext from './context/todos'
const ShowTodo = (props) => {
    
    const [editTodo,setEditTodo]=useState(false)
    const todoscontext=useContext(TodosContext)
    let {item}=props
    const editHandlerTodo=(text)=>{
        todoscontext.edit(item.key,text)
        setEditTodo(false)
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
                  <button type="button" class={`btn btn-sm mr-1 ${!item.done ? "btn-success" : "btn-warning"}`} onClick={() => todoscontext.done(item.key)}>{item.done ? "undone" : "done"}</button>
                  <button type="button" class="btn btn-info btn-sm" onClick={()=>setEditTodo(true)}>edit</button>
                  <button type="button" class="btn btn-danger btn-sm ml-1" onClick={() => todoscontext.deleteTodo(item.key)} >delete</button>
              </div>
          </div>
      </div>)
      : <EitTodo text={item.text} editTextTodo={editHandlerTodo} />
      }
      </>
    );
}

export default ShowTodo;