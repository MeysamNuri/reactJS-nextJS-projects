import { clearPerson } from './Person'
export const addPersons = (fullname) => {
    return async (dispatch, getState) => {
        const persons = [...getState().persons];
        const person = {
            id: Math.floor(Math.random() * 1000),
            fullname
        };

        if (person.fullname !== "" && person.fullname !== " ") {
            persons.push(person);
            await dispatch({ type: "ADD_PERSONS", payload: persons })
            await dispatch(clearPerson())
        }
    }
}

export const deletePersons = (personId) => {
    return async (dispatch, getState) => {
        const persons = [...getState().persons];
        const filteredPersons = persons.filter(p => p.id !== personId); //! = =
        await dispatch({ type: "DELETE_PERSONS", payload: filteredPersons })

    }
}

export const uppdatePersons = (event, personId) => {
    return async (dispatch, getState) => {
        const persons = [...getState().persons];

        const personIndex = persons.findIndex(p => p.id === personId);
        const newPerson = persons[personIndex];
        newPerson.fullname = event.target.value;

        newPerson[personIndex] = persons;
        await dispatch({ type: "UPDATE_PERSONS", payload: persons });
    }
}