import React, { useContext } from "react";
import Person from "./Person";
import Simplecontext from "../context/SimpleContext";

const Persons = () => {
    const context=useContext(Simplecontext)
    const {persons}=context
    return (
        <div>
            {persons.map(person => (
                <Person
                    key={person.id}
                    fullname={12345}
                    deleted={() => context.handleDeletePerson(person.id)}
                    changed={event => context.handleNameChange(event, person.id)}
                />
            ))}
        </div>
    );
};

export default Persons;
