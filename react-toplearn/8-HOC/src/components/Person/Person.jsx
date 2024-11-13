import React from "react";



const Person = ({ fullname, deleted, changed }) => {
    return (
        <div className="card text-white mt-2 w-25 mb-3 bg-info mx-auto">
            <div className="card-body">   <p>{`${fullname}`}</p>
                <div className='input-group justify-content-center'>
                    <input type="text" placeholder={fullname} onChange={changed} />
                    <div className="input-group-prepend">
                        <button className="btn btn-sm btn-danger fa fa-trash" onClick={deleted}></button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Person;
