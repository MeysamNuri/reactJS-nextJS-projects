import React from 'react';

const Baziga = (RootComponent,classes) => {
    return props=>( 
        <div className="rtl text-center">
            <RootComponent {...props} />
        </div>
     );
}
 
export default Baziga;