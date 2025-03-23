import React, { Fragment } from "react";
import Todos from "../components/Task/Todos";
import AddNewTask from "../components/Task/AddTodo";
import About from "../components/about";
import {Route} from 'react-router-dom'
import Nav from "../components/Nav";

const App = () => {

    return (

        <Fragment>
            <Nav />
            <div className="d-flex justify-content-center container">
                <div className="col-md-8">
                    <div className="card-hover-shadow-2x mb-3 card">
                        <Route path="/" exact component={Todos} />
                        {/* <Route path="/about" component={About} /> */}
                        <Route path="/about" render={()=> <About teachersName="میثم نوری" />} />
                       
                    </div>
                </div>
            </div>
            <AddNewTask />
        </Fragment>

    );
};

export default App;
