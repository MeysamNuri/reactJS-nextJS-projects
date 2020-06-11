import React, { useState } from 'react';

const Time = (props) => {

    const [counter, setCounter] = useState(60);
    setInterval(() => setCounter(counter - 1), 1000);

  let time=new Date().toLocaleTimeString()
    return ( 

        <>
   
    <p>my local time {time}</p>
  
        </>
     );
}
 
export default Time;