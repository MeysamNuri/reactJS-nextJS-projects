import React,{useContext,useRef,useEffect} from 'react';
import SimpleContext from './../context/SimpleContext'

const NewPerson = () => {
    const context=useContext(SimpleContext)
    const inputFocus=useRef(null)
  useEffect(()=>{
    inputFocus.current.focus()
  },[])
    return (
        <>
            <div className="m-2 p-2 ">
                <form className="form-inline justify-content-center" onSubmit={e => e.preventDefault()}>
                    <div className="input-group w-25">
                        <input ref={inputFocus} className="form-control" onChange={context.setPerson} value={context.person} placeholder="ساخن شخص جدید" />
                        <div className="input-group-append">
                            <button type="submit" onClick={context.addPerson} className="btn btn-success fa fa-plus-square" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default NewPerson;