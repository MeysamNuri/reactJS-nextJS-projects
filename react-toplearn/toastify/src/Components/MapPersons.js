import React from 'react';
import Person from './Person';

const MapPersons = ({persons,deletepersons,changedPerson}) => {
 
    return (
        persons.map(item=><Person 
          fullname={item.fullname}
      
        key={item.id}
        deleted={()=>deletepersons(item.id)}
        changed={event=>changedPerson(event,item.id)}
        />)
      );
}
 
export default MapPersons;