import React, { PureComponent } from "react";
import Person from "./Person";
// import SimpleContext from "../../context/SimpleContext";

class Persons extends PureComponent {
    // static contextType = SimpleContext;

    // shouldComponentUpdate(nextProp, nextState) {
    //     console.log("Persons.jsx shouldComponentUpdate");
    //     if (nextProp.persons !== this.props.persons) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    render() {
        console.log("Persons.jsx rendered.");
        const { personDelete, personChange, persons } = this.props;
        return (
            <div>
                {persons.map(person => (
                    <Person
                        key={person.id}
                        fullname={person.fullname}
                        deleted={() => personDelete(person.id)}
                        changed={event => personChange(event, person.id)}
                    />
                ))}
            </div>
        );
    }
}

// export default memo(Persons);
export default Persons;
