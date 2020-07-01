import React, { useContext } from 'react';
import Simplecontext from '../context/SimpleContext';

const NewPerson = () => {
    const personContext=useContext(Simplecontext)
    return (
        <>
            <div className="m-2 p-2">
                <form className="form-inline justify-content-center" onSubmit={event => event.preventDefault()}>
                    <div className="input-group ">
                        <input
                            type="text"
                            placeholder="ساخت شخص جدید"
                            style={{ direction: "rtl" }}
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