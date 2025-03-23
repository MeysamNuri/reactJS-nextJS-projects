import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import todoAPI from './../API/todos'
function SingleTodo(props) {
    const params = useParams()
    const history = useHistory()
    const [todos, setTodos] = useState({})
    useEffect(() => {
        todoAPI.get(`todos/${params.id}.json`)
            .then(response => {
                if (response.data) {
                    setTodos({
                        ...response.data, key: params.id
                    })
                }
                else {
                    history.push("/404")
                }
            }
            )

            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <h2>TODO DETAILS</h2>
                        <h3>{todos.text}</h3>

                        <span className={`badge ${todos.done ? "badge-success" : "badge-warning"}`}>{todos.done ? "done" : "undone"}</span>

                    </div>
                </div>
            </div>
        </>
    )
}
export default SingleTodo