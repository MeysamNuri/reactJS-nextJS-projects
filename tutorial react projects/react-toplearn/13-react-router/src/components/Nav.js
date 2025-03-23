import React from 'react';
import { NavLink } from 'react-router-dom'
import { checkPropTypes } from 'prop-types';
const Nav = (props) => {
    return (

        <div className='m-3'>
            <ul className="nav nav-pills justify-content-center">
                <li className="nav-item">
     <NavLink to='/' exact  className="nav-link" activeStyle={{color:"red"}}>
                        کارهای روزمره
        </NavLink>
                </li>
                <li className="nav-item">
     <NavLink to='/about' className="nav-link" activeStyle={{color:"red"}}>
                      درباره ما 
        </NavLink>
                </li>

            </ul>

        </div>
    );
}

export default Nav;