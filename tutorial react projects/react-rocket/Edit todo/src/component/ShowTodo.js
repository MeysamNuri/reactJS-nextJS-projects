import React, { useState } from 'react';
import EitTodo from './EditTodo'
const ShowTodo = ({ deleteTodo, key, done, item,edit }) => {
    const [editTodo,setEditTodo]=useState(false)
    const editHandlerTodo=(text)=>{
        edit(item.key,text)
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
                  <button type="button" class={`btn btn-sm mr-1 ${!item.done ? "btn-success" : "btn-warning"}`} onClick={() => done(item.key)}>{item.done ? "undone" : "done"}</button>
                  <button type="button" class="btn btn-info btn-sm" onClick={()=>setEditTodo(true)}>edit</button>
                  <button type="button" class="btn btn-danger btn-sm ml-1" onClick={() => deleteTodo(item.key)} >delete</button>
              </div>
          </div>
      </div>)
      : <EitTodo text={item.text} editTextTodo={editHandlerTodo} />
      }
      </>
    );
}

export default ShowTodo;