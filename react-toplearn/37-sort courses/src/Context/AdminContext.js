import React, { useEffect, useState } from 'react';
import NewDialog from '../Components/Admin/Dialogs/NewCourdeDialog';
import EditCourses from '../Components/Admin/Dialogs/EditCourseDialog';
import { pageInate } from '../utilz/pageinat';
import DashContext from './dashhContext';
import DeleteCourseDialog from './../Components/Admin/Dialogs/DeleteCourse';
import {orderBy} from 'lodash'
const AdminContext = ({ courses, children }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage,] = useState(5)
    const [openDialog, setopenDialog] = useState(false)
    const [currentCourse, setCurrentCourse] = useState({})
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteDialog,setOpenDeleteDialog]=useState(false)
    const [search,setSearch]=useState("")
    const [courseList,setCourseList]=useState([])
    const handlePage = page => {
        setCurrentPage(page)
    }
 // search section
 useEffect(()=>{
    setCourseList(courses)
},[courses])
const filterSearch=courseList.filter(item=>item.title.includes(search))

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
    // Pageination
    const CourseData = pageInate(filterSearch, currentPage, perPage)

    // sort courses
        const sortAsc=()=>{
            setCourseList(orderBy(courseList,"price","asc"))
        }
        const sortDses=()=>{
            setCourseList(orderBy(courseList,"price","desc"))
        }

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
            OpenNewDeleteDialog,
            filterSearch,
            setSearch,
            sortAsc,
            sortDses


        }}>
            <NewDialog showDialog={openDialog} closeDialog={closeNewDialog} />
            <EditCourses showDialog={openEditDialog} closeDialog={closeNewEditDialog} course={currentCourse} />
         <DeleteCourseDialog showDialog={openDeleteDialog} closeDialog={closeNewDeleteDialog} course={currentCourse}/>
            {children}
        </DashContext.Provider>
    );
}

export default AdminContext;
