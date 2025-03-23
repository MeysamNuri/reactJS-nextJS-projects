import React from 'react';
import Toplearn from './Toplearn';
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
const App = (props) => {

    useEffect(()=>{
require("../utiliz/script")
    },[])
    return ( 
        <BrowserRouter>
            <Toplearn />
            <ToastContainer />
        </BrowserRouter>

     );
}
 
export default App;