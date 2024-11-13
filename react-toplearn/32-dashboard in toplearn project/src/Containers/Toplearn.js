import React, { useEffect } from 'react';
import Courses from '../Components/Course/Courses';
import { Redirect, Route, Switch } from 'react-router-dom'
import MaiLayouts from '../Components/Layouts/MainLayouts';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register'
import Archive from './../Components/Course/Archive'
import SingleCourse from './../Components/Course/SingleCourse'
import { useDispatch, useSelector } from 'react-redux';
import { pageInate } from '../utilz/pageinat';
import { adduser, ClearUser } from '../redux/actions/user';
import { decodeToken } from '../utilz/decodedToken';
import Logout from '../Components/Login/Logout';
import Profile from '../Components/profile/profile';
import { isEmpty } from 'lodash';
import UserContext from './../Context/UserContext'
import NotFound from '../Components/Common/NotFound';
import PrivateLayout from '../Components/Layouts/PrivateLayouts';
import Dashboard from '../Components/Admin/DashBoard';
const Toplearn = (props) => {
   const courses = useSelector(state => state.courses)
   const dispatch = useDispatch()
   const indexCourses = pageInate(courses, 1, 8)
   const user = useSelector(state => state.user)
   useEffect(() => {
      const token = localStorage.getItem("token")
      if (token) {
         const decodedToken = decodeToken(token)
         const NowDate = Date.now() / 1000
         if (decodedToken.payload.exp < NowDate) {
            localStorage.removeItem("token")
            dispatch(ClearUser())
         }
         else {
            dispatch(adduser(decodedToken.payload.user))
         }
      }

   }, [])
   return (
      <Switch>
         <Route path={["/dashboard"]} >
            <PrivateLayout>
               <Route path={"/dashboard"} exact render={() => !isEmpty(user) && user.isAdmin ? (
                  <Dashboard courses={courses} />
               ) : (
                     <Redirect to="/" />
                  )} />
            </PrivateLayout>

         </Route>
         <Route path={["/"]} >
            <MaiLayouts>
               <Switch>
                  <Route path="/login" render={() => isEmpty(user) ? (
                     <UserContext>
                        <Login />
                     </UserContext>
                  ) : (
                        <Redirect to="/" />
                     )} />
                  <Route path="/logout" render={() => isEmpty(user) ? <Redirect to="/" /> : <Logout />} />
                  <Route path="/user-profile" component={Profile} />
                  <Route path="/register" render={() => isEmpty(user) ? (
                     <UserContext>
                        <Register />
                     </UserContext>
                  ) : (
                        <Redirect to="/" />
                     )} />
                  <Route path="/archive" component={Archive} />
                  <Route path="/course/:id" component={SingleCourse} />

                  <Route path="/" exact render={() => indexCourses.length > 0 ? (<Courses courses={indexCourses} />) : (
                     <h2 className="text-center">هیچ دوره ای وجود ندارد</h2>
                  )} />
                  <Route path="*" component={NotFound} />

               </Switch>
            </MaiLayouts>
         </Route>

      </Switch>
   );
}

export default Toplearn;