import React, { useState } from 'react';
import Cat from './cat';
import Mouse from './Mouse';
import Snake from './Snake'

const App = () => {
  return (
 <>
<Mouse render={(x,y)=>{
  return <div>
    <Cat x={x+200} y={y}/>
    <Snake x={x+100} y={y+100}/>
  </div>
}} />
 </>
  );
};

export default App;