import React, { useState } from 'react';


const Mouse = ({render}) => {
    const [mousePositon,setMousePosition]=useState({})
const onmouseMove=(e)=>{
    setMousePosition({x:e.clientX,y:e.clientY})
}
    return (  

        <div onMouseMove={onmouseMove} style={{padding:"20rem",cursor:"url(mouse.png),auto"}}>
          {render(mousePositon.x,mousePositon.y)}
        </div>
    );
}
 
export default Mouse;