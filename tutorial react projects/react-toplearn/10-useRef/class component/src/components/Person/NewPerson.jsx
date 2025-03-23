import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

// import SimpleContext from "./../../context/SimpleContext";

const NewPerson = ({ person, setPerson, handleNewPerson }) => {
    console.log("NewPerson.jsx Rendered.");

    const inputFocus = useRef(null);

    useEffect(() => {
        inputFocus.current.focus();
    });

    return (
        <div className="m-2 p-2">
            <form
                className="form-inline justify-content-center"
                onSubmit={event => event.preventDefault()}
            >
                <div className="input-group w-25">
                    <input
                        ref={inputFocus}
                        type="text"
                        placeholder="اسم بهم بده"
                        className="form-control"
                        onChange={setPerson}
                        value={person}
                    />
                    <div className="input-group-prepend">
                        <Button
                            type="submit"
                            variant="success"
                            size="sm"
                            className="fa fa-plus-square"
                            onClick={handleNewPerson}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewPerson;
