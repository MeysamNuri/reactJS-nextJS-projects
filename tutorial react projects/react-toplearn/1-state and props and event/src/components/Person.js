import React from 'react';

const Person = ({firstname, lastname, age,children}) => {
    return ( 
        <div>
              <p>{`${firstname} ${lastname}`}</p>
        
            {/* <p>Age : {Math.floor(Math.random() * 30)}</p> */}
            <p>Age : {age}</p>
            <p>{children}</p>
        </div>
     );
}
 
export default Person;