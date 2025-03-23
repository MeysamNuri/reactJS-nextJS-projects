import React from 'react';

const Bazinga = (Rootcomponent,classes) => {
    return props=>(
        // <div className={classes} >
        //   <Rootcomponent {...props} />
        // </div>
        <div className="rtl text-center" >
        <Rootcomponent {...props} />
      </div>
    );
}
 
export default Bazinga;