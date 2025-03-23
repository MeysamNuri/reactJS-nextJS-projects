import React from 'react';
import Multiple2 from "./Multiple2";
import {useCounterState} from "./../contex/ContextReducer";


const Display3 = (props) => {
  const {counter} = useCounterState()

  return (
    <div style={{backgroundColor: 'red', color: 'white', margin: '1rem'}}>
      <h3>display 3</h3>
      counter value is :{counter}
      <br/>
      <Multiple2/>
    </div>
  );
};



export default Display3;