import React from 'react';

const Snake = ({x,y}) => {
    return ( 

        <>
    <img src={"snake.png"} style={{position:"absolute",left:x,top:y}}/>
        </>
     );
}
 
export default Snake;