import React, { useContext } from 'react';
import Simplecontext from '../context/SimpleContext';


const Header = ({ apptitle }) => {
    const personcontext=useContext(Simplecontext)
    const {persons}=personcontext
    let badgeStyle = []
    if (persons.length >= 3) badgeStyle.push("badge-success")
    if (persons.length <= 2) badgeStyle.push("badge-warning")
    if (persons.length <= 1) badgeStyle.push("badge-danger")

    return (

        <>
            <div className="alert alert-info">
                <h2>{apptitle}</h2>
            </div>
            <h4 className="alert alert-light">تعداد اشخاص <span className={`badge badge-pill ${badgeStyle.join(" ")}`}>{persons.length}</span> نفر می باشد</h4>


        </>
    );
}

export default Header;