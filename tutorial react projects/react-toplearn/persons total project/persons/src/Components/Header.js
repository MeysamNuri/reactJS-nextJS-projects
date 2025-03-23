import React,{useContext} from 'react';
import { Badge } from 'react-bootstrap'
import SimpleContext from './../context/SimpleContext'
const Header = ( ) => {
    const simplecontext=useContext(SimpleContext)
    const {persons}=simplecontext
    let badgeStayle = ""
    if (persons.length < 4)  badgeStayle='warning'
        
    if (persons.length >= 4) badgeStayle="success"
    
    if (persons.length <= 1) badgeStayle='danger'
    return (

        <>
            <div className="alert alert-info">
                <h3>مدیریت کننده اشخاص</h3>
            </div>
            <h4 className="alert alert-light">تعداد اشخاص <Badge pill variant={badgeStayle}>{persons.length}</Badge>نفر می باشد</h4>

        </>
    );
}

export default Header;