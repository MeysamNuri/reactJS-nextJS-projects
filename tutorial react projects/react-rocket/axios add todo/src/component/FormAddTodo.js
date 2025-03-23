import React,{useState, useContext} from 'react';
import TodosContext from './context/todos'
import AuthContext from './context/auth'
import axios from 'axios'
const FormAddTodo = (props) => {
    const [formInput, setFormInput] = useState("")
    
  const todoscontext=useContext(TodosContext)
  const authcontext=useContext(AuthContext)
    const formHandler = (e) => {
        e.preventDefault();
        let todo={text:formInput,done:false}
        axios.post("https://react-course2.firebaseio.com/todos.json",todo)
        .then(respnse=> todoscontext.dispatch({type:"ADD_TODO",payload:{todo:{...todo,key:respnse.data.name}}}))
        .catch(err=>console.log(err))
        
        setFormInput('')
    }
    const inputHandler = (e) => {
        setFormInput(e.target.value)

    }
    return (

        <>
        {authcontext.authenticated?(
             <form class="form-inline" onSubmit={formHandler}>
             <div class="form-group">
                 <input type="text" class="form-control mx-sm-3" value={formInput} placeholder="i want to do ..." onChange={inputHandler} />
                 <button type="submit" class="btn btn-primary">add</button>
             </div>
         </form>
        )
        :<p>you must login</p>
        
    }
        </>     
      
    );
}

export default FormAddTodo;