import React from 'react';
import { plusCounter, useCounterDispatch } from '../contex/ContextReducer';

const Pluser = (props) => {

  const counterDispatch = useCounterDispatch();


  return (
    <button onClick={()=>plusCounter(counterDispatch)}>
      plus
      </button>
  );
};

export default Pluser;