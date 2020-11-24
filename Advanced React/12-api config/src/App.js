import React, {useEffect} from 'react';
import {getUsers} from "./api/actionUser";

const App = (props) => {
  useEffect(() => {
    getUsers(() => {
    });
  }, [])
  return <div>
    app
  </div>
};


export default App;