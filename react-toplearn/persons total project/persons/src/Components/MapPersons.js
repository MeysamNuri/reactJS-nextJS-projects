import React, { useContext } from 'react';
import Person from './Person';
import SimpleContext from './../context/SimpleContext'

const MapPersons = () => {
  const context = useContext(SimpleContext)
  const { persons } = context
  return (
    persons.map(item => <Person
      fullname={item.fullname}

      key={item.id}
      deleted={() => context.deletePerson(item.id)}
      changed={event => context.editHandler(event, item.id)}
    />)
  );
}

export default MapPersons;