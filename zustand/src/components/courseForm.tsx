import { useState } from 'react'
import useCourseStore from '../stores/courseStore'

const CourseForm = () => {
    const addCourse = useCourseStore((state:any) => state.addCourse)

    const [courseTitle, setCourseTitle] = useState("")

    const handleCourseSubmit = () => {
        if (!courseTitle) return alert("عنوان الزامی است!")
        addCourse({
            id: Math.ceil(Math.random() * 1000000),
            title: courseTitle
        });
        setCourseTitle("")
    }

    return (
        <div className='form-container'>
            <input value={courseTitle}
                onChange={(e) => {
                    setCourseTitle(e.target.value)
                }}
                className={'form-input'} />
                <button onClick={() => {
                    handleCourseSubmit()
                }}
                className="form-submit-btn">افزودن دوره</button>
        </div>
    )
}

export default CourseForm