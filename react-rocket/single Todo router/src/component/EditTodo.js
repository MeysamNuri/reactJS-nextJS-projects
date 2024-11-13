import React, { useState } from 'react';

const EitTodo = (props) => {
    const [editText, setEditText] = useState(props.text)
    const inputHandler = (e) => {
        setEditText(e.target.value)
    }
    return (
        <div class="col-6 mb-2">
            <div class="d-flex justify-content-between align-items-center border rounded p-3">
                <div>
                    <input value={editText} onChange={inputHandler} className="form-control" />

                </div>
                <div>
                    <button type="button" class="btn btn-info btn-sm" onClick={()=>props.editTextTodo(editText)}>edit</button>
                </div>
            </div>
        </div>
    );
}

export default EitTodo;