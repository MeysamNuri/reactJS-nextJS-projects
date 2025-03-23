import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
const courseStore = (set:any) => ({
    courses: [],
    addCourse: (course:any) => {
        set((state:any) => ({
            courses: [...state.courses,course]
        }))
    },
    removeCourse: (courseId:number) => {
        set((state:any) => ({
            courses: state.courses.filter((c:any) => c.id !== courseId)
        }))
    },
    toggleCourseStatus: (courseId:number) => {
        set((state:any) => ({
            courses: state.courses.map((course:any) => course.id === courseId ? 
            { ...course, completed: !course.completed } : 
            course)
        }))
    }
})

const useCourseStore = create(devtools(
    persist(courseStore, {
        name: "courses"
    })
))

export default useCourseStore;