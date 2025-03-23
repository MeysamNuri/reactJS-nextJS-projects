import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ClearUser } from '../../redux/actions/user';

const Logout = ({history}) => {
    const dispatch=useDispatch()
    useEffect(()=>{
        localStorage.removeItem("token")
        dispatch(ClearUser())
            history.push("/")
    },[])
    return null
}
 
export default withRouter(Logout) ;