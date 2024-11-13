import React from 'react';

const Cat = ({x,y}) => {
    return ( 

        <>
    <img src={"cat.png"} style={{position:"absolute",left:x,top:y}}/>
        </>
     );
}
 
export default Cat;