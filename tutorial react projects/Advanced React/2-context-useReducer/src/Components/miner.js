import React from 'react';
import {minusCounter, useCounterDispatch} from "./../contex/ContextReducer";


const Miner = () => {

  const counterDispatch = useCounterDispatch();

  return (
    <button onClick={()=>minusCounter(counterDispatch)}>
      Minus
      </button>
  );
};

export default Miner;