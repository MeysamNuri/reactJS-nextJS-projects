import React, { useContext,useRef,useEffect } from 'react';
import Simplecontext from '../context/SimpleContext';

const NewPerson = () => {
    const personContext=useContext(Simplecontext)
    const focusInput = useRef(null)
    useEffect(() => {
        focusInput.current.focus()
    })
    return (
        <>
            <div className="m-2 p-2">
                <form className="form-inline justify-content-center" onSubmit={event => event.preventDefault()}>
                    <div className="input-group ">
                        <input
                           ref={focusInput}
                            type="text"
                            placeholder="ساخت شخص جدید"
                            style={{ direction: "rtl" }}
                            className="form-control"
                            onChange={personContext.setPerson}
                            value={personContext.person}
                        />
                        <div className="input-group-prepend">
                            <button type="submit" onClick={personContext.handleNewPerson} className="btn btn-sm btn-success fa fa-plus-square"></button>

                        </div>
                    </div>

                </form>
            </div>

        </>
    );
}

export default NewPerson;