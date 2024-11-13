import React, { useState } from 'react';
import NewDialog from '../Components/Admin/Dialogs/NewCourdeDialog';
import EditCourses from '../Components/Admin/Dialogs/EditCourseDialog';
import { pageInate } from '../utilz/pageinat';
import DashContext from './dashhContext';

const AdminContext = ({ courses, children }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage,] = useState(5)
    const [openDialog, setopenDialog] = useState(false)
    const [currentCourse, setCurrentCourse] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)

    const handlePage = page => {
        setCurrentPage(page)
    }
    const openNewEditDialog = (course) => {
        setOpenEditDialog(true)
        setCurrentCourse(course)
    }
    const closeNewEditDialog = () => setOpenEditDialog(false)
    const openNewDialog = () => setopenDialog(true)
    const closeNewDialog = () => setopenDialog(false)
    const CourseData = pageInate(courses, currentPage, perPage)
    return (
        <DashContext.Provider value={{
            CourseData,
            handlePage,
            currentPage,
            setCurrentPage,
            courses,
            perPage,
            openNewEditDialog,
            openNewDialog

        }}>
            <NewDialog showDialog={openDialog} closeDialog={closeNewDialog} />
            <EditCourses showDialog={openEditDialog} closeDialog={closeNewEditDialog} course={currentCourse} />
            {children}
        </DashContext.Provider>
    );
}

export default AdminContext;
