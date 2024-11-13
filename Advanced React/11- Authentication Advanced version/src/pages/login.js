import React from 'react';

const Login = () => {
    const login=()=>{
        localStorage.setItem("Auth-key","fgfgtfjyhtstgrfdgyththrs")
        window.location.reload()
    }
     
    
    return ( 
        <div>
           <input type="text" placeholder="username"/>
           <input type="password" placeholder="password"/>
           <button onClick={login}>login</button>
        </div>

     );
}
 
export default Login;