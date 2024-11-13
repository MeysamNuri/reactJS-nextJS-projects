import React, { useContext } from 'react';
import AuthContext from './context/auth'



const Header = () => {
    const authcontext=useContext(AuthContext)
    const dologin=()=> authcontext.dispatch({type:"LOGIN_USER"})
    const dologout=()=>authcontext.dispatch({type:"LOGOUT_USER"})
    return ( 

        <>
          <header>
            <div class="navbar navbar-dark bg-dark shadow-sm">
                <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                    <strong>Todo App</strong>
                    </a>
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