import React, { useContext } from 'react';
import AuthContext from './context/auth'
import {NavLink} from "react-router-dom"


const Header = () => {
    const authcontext=useContext(AuthContext)
    const dologin=()=> authcontext.dispatch({type:"LOGIN_USER"})
    const dologout=()=>authcontext.dispatch({type:"LOGOUT_USER"})
    return ( 

        <>
          <header>
            <div class="navbar navbar-expand navbar-dark bg-dark shadow-sm">
                <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                    <strong>Todo App</strong>
                    </a>
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={{
                                pathname:"/about"
                            ,search:'?name=meysam',
                            hash:"#myid"}} 
                            className="nav-link">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={location=>`/contact${location.search}`} className="nav-link">contact</NavLink>
                        </li>
                    </ul>
                    {
                        !authcontext.authenticated?
                        <button className="btn btn-sm btn-success" onClick={dologin}>login</button>
                        : <button className="btn btn-sm btn-danger" onClick={dologout}>logout</button>

                    }

                </div>

            </div>
        </header>

        </>
     );
}
 
export default Header;