import React from 'react';

const ShowTodo = (props) => {
    return (
        <>
            <div class="col-6 mb-2">
                <div class="d-flex justify-content-between align-items-center border rounded p-3">
                    <div>
                      {props.text}
                                </div>
                    <div>
                        <button type="button" class="btn btn-info btn-sm">edit</button>
                        <button type="button" class="btn btn-danger btn-sm ml-1">delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowTodo;