import React,{createContext} from 'react';

const todosContext=createContext({
    todos:[],
    doneHandler:()=>{},
    EditTodoHandler:()=>{},
    deleteTodo:()=>{},
    add:()=>{}
})
export default todosContext