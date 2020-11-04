import React from 'react';
import { isEmpty } from 'lodash'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
const TopNav = () => {
    const user = useSelector(state => state.user)
    return (
        <>
            <nav>
                <div class="row">
                    <div class="col-sm-6 col-xs-12">
                        <ul>
                            <li>
                                <NavLink to="/" exact activeStyle={{ color: "lime" }}>صفحه اصلی </NavLink>
                                <NavLink to=""> درباره ما </NavLink>
                                <NavLink to=""> تماس با ما </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-xs-12">
                        <div class="clientarea">
                            {!isEmpty(user) ?

                                <div class="loggein ">
                                    <i class="zmdi zmdi-account"></i>
                                    <NavLink to="/user-profile">  {user.fullname} ، خوش آمدی </NavLink>/
                                     <NavLink to="/logout"> خروج </NavLink>
                                </div>

                                :

                                <div class="signin ">
                                    <i class="zmdi zmdi-account"></i>
                                    <NavLink to="/login" activeStyle={{ color: "lime" }}> ورود </NavLink> /
                                <NavLink to="/register" activeStyle={{ color: "lime" }}> عضویت </NavLink>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default TopNav;