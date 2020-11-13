import React from 'react';

import { useCounterDispatch, Multiple} from "./../contex/ContextReducer"

const Multiple2 = (props) => {
  const counterDispatch = useCounterDispatch();

  return (
    <button onClick={()=>Multiple(counterDispatch)}>
      *2
      </button>
  );
};

export default Multiple2;