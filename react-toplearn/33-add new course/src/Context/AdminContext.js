import React, { useState } from 'react';
import NewDialog from '../Components/Admin/Dialogs/NewCourdeDialog';
import { pageInate } from '../utilz/pageinat';
import DashContext from './dashhContext';

const AdminContext = ({courses,children}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage,] = useState(5)
    // const [openDialog,setopenDialog]=useState(false)
  
    const handlePage = page => {
        setCurrentPage(page)
    }
    // const openNewDialog=()=>setopenDialog(true)
    // const closeNewDialog=()=>setopenDialog(false)
    const CourseData = pageInate(courses, currentPage, perPage)
    return ( 
        <DashContext.Provider value={{
            CourseData,
            handlePage,
            currentPage,
            setCurrentPage,
            courses,
            perPage,
            
        //  openNewDialog

        }}>
            {/* <NewDialog showDialog={openDialog}  closeDialog={closeNewDialog}/> */}
            {children}
        </DashContext.Provider>
     );
}
 
export default AdminContext;
