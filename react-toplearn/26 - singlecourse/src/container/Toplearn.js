import React from 'react';
import Course from '../components/courses/Course';
import MainLayout from '../Layout/MainLayout';
import { Route, Switch } from 'react-router-dom'
import Login from '../components/common/Login'
import Register from './../components/common/Register'
import Archive from './../components/courses/Archive'
import { useSelector } from 'react-redux';
import { pageinate } from '../utiliz/pageinate';
import SingleCoursePage from './../components/courses/SingleCourse'
const Toplearn = () => {
    const courses = useSelector(state => state.courses)

    const courseIndex = pageinate(courses, 1, 8)
    return (
        <>
            <MainLayout>
                <Switch>
                    <Route path='/Login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/archive' component={Archive} />
                    <Route path='/course/:id' component={SingleCoursePage} />
                     <Route path='/' exact render={() => <Course courses={courseIndex} />} />


                </Switch>

            </MainLayout>

        </>
    );
}

export default Toplearn;