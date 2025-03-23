import React from 'react';
import Course from '../components/courses/Course';
import MainLayout from '../Layout/MainLayout';
import {Route ,Switch} from 'react-router-dom'
import Login from '../components/common/Login'
import Register from './../components/common/Register'
import Archive from './../components/courses/Archive'
const Toplearn = (props) => {
    return (
        <>
            <MainLayout>
                <Switch>
                    <Route path='/' exact component={Course} />
                    <Route path='/Login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/archive' component={Archive} />
                </Switch>
            
            </MainLayout>

        </>
    );
}

export default Toplearn;