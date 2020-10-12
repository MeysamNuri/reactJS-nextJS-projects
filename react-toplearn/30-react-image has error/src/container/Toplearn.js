import React, { useEffect } from 'react';
import Course from '../components/courses/Course';
import MainLayout from '../Layout/MainLayout';
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../components/common/Login'
import Register from './../components/common/Register'
import Archive from './../components/courses/Archive'
import { useSelector, useDispatch } from 'react-redux';
import { pageinate } from '../utiliz/pageinate';
import SingleCoursePage from './../components/courses/SingleCourse'
import { data } from 'jquery';
import UserProfile from './../components/userProfaile'
import { adduser, clearUser } from '../actions/user';
import { docodeToken } from '../utiliz/deocode';
import Logout from '../components/common/Logout';
import { isEmpty } from 'lodash';
import UserContext from './../components/context/userContext'
const Toplearn = () => {
    const courses = useSelector(state => state.courses)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const courseIndex = pageinate(courses, 1, 8)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decodedToken = docodeToken(token)
            const nowDate = Date.now() / 1000
            if (decodedToken.payload.exp < nowDate) {
                localStorage.removeItem("token")
                dispatch(clearUser())
            }
            else {
                dispatch(adduser(decodedToken.payload.user))
            }
        }
    }, [])
    return (
        <>
            <MainLayout>
                <Switch>
                    <Route path='/login' render={()=> isEmpty(user)?
                        <UserContext>
                            <Login />
                        </UserContext>
                        :<Redirect to="/ " />} />
                    <Route
                    path="/logout"
                    render={() =>
                        isEmpty(user) ? <Redirect to="/" /> : <Logout />
                    }
                />
                      <Route
                    path="/register"
                    render={() =>
                        isEmpty(user) ? (
                            <UserContext>
                                <Register />
                            </UserContext>
                        ) : (
                            <Redirect to="/" />
                        )
                    }
                />
                    <Route path="/user-profile" component={UserProfile} />
                    <Route path='/archive' component={Archive} />
                    <Route path='/course/:id' component={SingleCoursePage} />
                    <Route path='/' exact render={() => <Course courses={courseIndex} />} />


                </Switch>

            </MainLayout>

        </>
    );
}

export default Toplearn;