import React, { useContext, useState } from 'react';

import DashContext from '../../Context/dashhContext';
import Pageination from '../Course/pageInation';
import NewDialog from './Dialogs/NewCourdeDialog';

const CourseTable = () => {
 
    const CoursesContext = useContext(DashContext)
    const { 
        CourseData,
         perPage, 
         currentPage, 
         handlePage, 
         courses,
         openNewDialog,
         openNewEditDialog
         } = CoursesContext

    return (

        <>
            <section style={{ marginTop: "5em", marginRight: "2em" }}>
                <div >

                    <div>
                        <h3 className="alert alert-info text-center">لیست دوره ها</h3>
                        <div className="row inline-block ml-3">
                            <button className="btn btn-primary" onClick={openNewDialog}>
                                <span className="fa fa-plus" style={{
                                    verticalAlign: "middle",
                                    marginLeft: "1em",
                                }}></span>
                                اضافه کردن دوره جدید
                            </button>
                            <input type="text" className="form-control" style={{ width: "50%", float: "left", marginBottom: "2em" }} placeholder="جستجوی دوره ها" />

                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">عنوان دوره</th>
                                    <th scope="col">نمایش عکس دوره</th>
                                    <th scope="col"> قیمت دوره</th>
                                    <th scope="col"> ویرایش</th>
                                    <th scope="col">حذف</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CourseData.map(course => (
                                    <tr key={course._id}>
                                        <td>{course.title}</td>
                                        <td>
                                            <a className="btn btn-info" target="_blank" href={`https://toplearnapi.ghorbany.dev/${course.imageUrl}`}>نمایش تصویر</a>
                                        </td>
                                        <td>{course.price === 0 ? "رایگان" : `${course.price}`}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={()=>openNewEditDialog(course)}>
                                                ویرایش
                                        </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger">
                                                حذف
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <div className="navbar-fixed-bottom footer text-center">
                        <Pageination totalcourses={courses.length} perPage={perPage} currentPage={currentPage} onPageChane={handlePage} />

                    </div>
                </div>

            </section>
        </>
    );
}

export default CourseTable;