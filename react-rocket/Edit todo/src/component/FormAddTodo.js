import React,{useState} from 'react';

const FormAddTodo = (props) => {
    const [formInput, setFormInput] = useState("")
  
    const formHandler = (e) => {
        e.preventDefault();
     props.add(formInput)
        setFormInput('')
    }
    const inputHandler = (e) => {
        setFormInput(e.target.value)

    }
    return (

        <>
            <form class="form-inline" onSubmit={formHandler}>
                <div class="form-group">
                    <input type="text" class="form-control mx-sm-3" value={formInput} placeholder="i want to do ..." onChange={inputHandler} />
                    <button type="submit" class="btn btn-primary">add</button>
                </div>
            </form>
        </>
    );
}

export default FormAddTodo;