import React from 'react';
import Display3 from "./Display3";
import {useCounterState} from "./../contex/ContextReducer";


const Display2 = () => {
  const {counter} = useCounterState()
  return (
    <div style={{backgroundColor: '#ccc', padding: '1rem', margin: '1rem'}}>
      <h1>display 2</h1>
      counter value is :{counter}
      <br/>
      <Display3 />
    </div>
  );
};



export default Display2;