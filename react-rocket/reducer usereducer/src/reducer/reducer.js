import { act } from "react-dom/test-utils";

function TodoReducer(state,action){
    switch (action.type) {
        case "ADD_TODO":
         return addTodo(state,action)
            break;

            case "DELETE_TODO":
                return deleteTodo(state,action)
            case "DONE_TODO":
                return doneTodo(state,action)
                case "EDIT_TODO":
                    return EditTodo(state,action)
            case "LOGIN_USER":
                return {
                    ...state,
                    authenticated:true
                }

                case "LOGOUT_USER":
                    return {
                        ...state,
                        authenticated:false
                    }
    
        default:
           return state
    }
}

export default TodoReducer

let addTodo=(state,action)=>{
    let {text}=action.payload
    return {
        ...state,
       todos: [...state.todos,
      { key: Math.floor(Math.random() * 1000), done: false, text }]
    }
    
}  
let deleteTodo=(state,action)=>{
    let {key}=action.payload
    return{
        ...state,
       todos: state.todos.filter(item => item.key !== key)
    }
}
let doneTodo=(state,action)=>{
    let {key}=action.payload
    let item = state.todos.find(item => item.key === key)
        item.done = !item.done
        let newTodos = state.todos.filter(item => item.key !== key)
     return {
         ...state,
        todos:[
            ...newTodos,
            item
        ]
     }
}
let EditTodo=(state,action)=>{
    let {key,text}=action.payload
        let item = state.todos.find(item => item.key === key)
    item.text = text
    let newTodos = state.todos.filter(item => item.key !== key)
   return {
       ...state,
      todos:[
        ...newTodos,
        item
      ]
   }
}
// const addTodo = (text) => {
//     setTodos(
//         
//     )
// }
// const deleteTodo = (todoKey) => {
//     setTodos(
//         todos.filter(item => item.key !== todoKey)
//     )
// }
// const EditTodoHandler = (key, text) => {
//     let item = todos.find(item => item.key === key)
//     item.text = text
//     let newTodos = todos.filter(item => item.key !== key)
//     setTodos(
//         [...newTodos,
//             item]
//     )

// }
// const doneHandler = (key) => {
//     let item = todos.find(item => item.key === key)
//     item.done = !item.done
//     let newTodos = todos.filter(item => item.key !== key)
//     setTodos([
//         ...newTodos,
//         item
//     ])

// }