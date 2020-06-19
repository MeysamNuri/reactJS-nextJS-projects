import React, { useState } from 'react';
import Header from './Header'
const App = () => {
    const [formInput, setFormInput] = useState("")
    const [todos, setTodos] = useState([])
    const formHandler = (e) => {
        e.preventDefault();
        setTodos(
            [...todos,
            { key: Math.floor(Math.random() * 1000), done: false, text: formInput }]
        )
        setFormInput('')
    }
    const inputHandler = (e) => {
        setFormInput(e.target.value)

    }
    return (

        <>
            <div class="App">
                <Header />
                <main>
                    <section class="jumbotron">
                        <div class="container d-flex flex-column align-items-center">
                            <h1 class="jumbotron-heading">Welcome!</h1>
                            <p class="lead text-muted">To get started, add some items to your list:</p>
                            <form class="form-inline" onSubmit={formHandler}>
                                <div class="form-group">
                                    <input type="text" class="form-control mx-sm-3" value={formInput} placeholder="i want to do ..." onChange={inputHandler} />
                                    <button type="submit" class="btn btn-primary">add</button>
                                </div>
                            </form>
                        </div>
                    </section>
                    <div class="todosList">
                        <div class="container">
                            <div class="d-flex flex-column align-items-center ">
                                <nav class="col-6 mb-3">
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a href class="nav-item nav-link active font-weight-bold" id="nav-home-tab">undone <span class="badge badge-secondary">9</span></a>
                                        <a href class="nav-item nav-link font-weight-bold" id="nav-profile-tab">done <span class="badge badge-success">9</span></a>
                                    </div>
                                </nav>
                                <div class="col-6 mb-2">
                                    <div class="d-flex justify-content-between align-items-center border rounded p-3">
                                        <div>
                                            hello roocket
                                </div>
                                        <div>
                                            <button type="button" class="btn btn-info btn-sm">edit</button>
                                            <button type="button" class="btn btn-danger btn-sm ml-1">delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="d-flex justify-content-between align-items-center border rounded p-3">
                                        <div>
                                            hello roocket
                                </div>
                                        <div>
                                            <button type="button" class="btn btn-info btn-sm">edit</button>
                                            <button type="button" class="btn btn-danger btn-sm ml-1">delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 mb-2">
                                    <div class="d-flex justify-content-between align-items-center border rounded p-3">
                                        <div>
                                            hello roocket
                                </div>
                                        <div>
                                            <button type="button" class="btn btn-info btn-sm">edit</button>
                                            <button type="button" class="btn btn-danger btn-sm ml-1">delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default App;