import React, { useState } from 'react';
import NewDialog from '../Components/Admin/Dialogs/NewCourdeDialog';
import EditCourses from '../Components/Admin/Dialogs/EditCourseDialog';
import { pageInate } from '../utilz/pageinat';
import DashContext from './dashhContext';
import DeleteCourseDialog from './../Components/Admin/Dialogs/DeleteCourse';

const AdminContext = ({ courses, children }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage,] = useState(5)
    const [openDialog, setopenDialog] = useState(false)
    const [currentCourse, setCurrentCourse] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteDialog,setOpenDeleteDialog]=useState(false)
    const handlePage = page => {
        setCurrentPage(page)
    }
    // open new course dialog
    const openNewDialog = () => setopenDialog(true)
    const closeNewDialog = () => setopenDialog(false)
    // open Edit course dialog
    const openNewEditDialog = (course) => {
        setOpenEditDialog(true)
        setCurrentCourse(course)
    }
    const closeNewEditDialog = () => setOpenEditDialog(false)
  
// open Delete course dialog
    const OpenNewDeleteDialog=(course)=>{
        setOpenDeleteDialog(true)
        setCurrentCourse(course)
    }
    const closeNewDeleteDialog=()=>setOpenDeleteDialog(false)
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
            openNewDialog,
            OpenNewDeleteDialog

        }}>
            <NewDialog showDialog={openDialog} closeDialog={closeNewDialog} />
            <EditCourses showDialog={openEditDialog} closeDialog={closeNewEditDialog} course={currentCourse} />
         <DeleteCourseDialog showDialog={openDeleteDialog} closeDialog={closeNewDeleteDialog} course={currentCourse}/>
            {children}
        </DashContext.Provider>
    );
}

export default AdminContext;
