import React from 'react';
import Toplearn from './Toplearn';
import {BrowserRouter} from 'react-router-dom'
const App = (props) => {
    return ( 
        <BrowserRouter>
            <Toplearn />
        </BrowserRouter>

     );
}
 
export default App;