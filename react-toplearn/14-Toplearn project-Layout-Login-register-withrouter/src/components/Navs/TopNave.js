import React from 'react';
import {NavLink} from 'react-router-dom'
const TopNave = (props) => {
    return ( 

        <>
    <nav>
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <ul>
                                    <li>
                                        <NavLink to="/"> صفحه اصلی </NavLink>
                                        <a href=""> درباره ما </a>
                                        <a href=""> تماس با ما </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="clientarea">
                                    {/* <div className="loggein ">
                                        <i className="zmdi zmdi-account"></i><a href=""> ایمان مدائنی ، خوش آمدی </a>
                                    </div> */}
                                    <div className="signin ">
                                        <i className="zmdi zmdi-account"></i>
                                        <NavLink to="/Login" exact activeStyle={{color:"lime"}}> ورود </NavLink> /
                                    <NavLink to="/register"  activeStyle={{color:"lime"}}> عضویت </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
        </>
     );
}
 
export default TopNave;