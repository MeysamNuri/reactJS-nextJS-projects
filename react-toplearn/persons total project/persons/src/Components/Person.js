import React,{useEffect, useRef} from 'react';
const Person = (props) => {
  const inputFocus=useRef(null)
  useEffect(()=>{
    inputFocus.current.focus()
  },[])
  const { fullname, deleted, changed } = props
  return (
    <div className="card bg-info text-white mb-3 mt-3 w-25 mx-auto">
      <div className="card-body">
        <p className="d-block">{`${fullname} `}</p>
        <div className="input-group">
          <input ref={inputFocus} className="form-control" type="text" placeholder={fullname} onChange={changed} />
          <div className="input-group-append">
            <button className="btn btn-danger fa fa-trash" onClick={deleted} />
          </div>

        </div>
      </div>

    </div>
  );
}

export default Person;