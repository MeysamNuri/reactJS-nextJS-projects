import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Person from "./Person";
import {deletePersons, uppdatePersons} from './../../actions/Persons'
const Persons = () => {
    const persons=useSelector(state=>state.persons)
    const dispatch=useDispatch()
    return (
        <div>
            {persons.map(person => (
                <Person
                    key={person.id}
                    fullname={person.fullname}
                    deleted={() => dispatch(deletePersons(person.id))}
                    changed={e => dispatch(uppdatePersons(e, person.id))}
                />
            ))}
        </div>
    );
};

export default Persons;
