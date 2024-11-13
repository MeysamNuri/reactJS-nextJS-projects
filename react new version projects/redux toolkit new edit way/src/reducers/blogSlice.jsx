import { createSlice, nanoid } from '@reduxjs/toolkit'


const initials = [
    {
        id: nanoid(),
        title: "اولین پست",
        content: "محتوای اولین پست ما میباشد"
    },
    {
        id: nanoid(),
        title: "دومین پست",
        content: "22محتوای دومین پست ما میباشد"
    },
]
const blogSlice = createSlice({
    name: "blogs",
    initialState: initials,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content) {
                // complex logic
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
                    }
                }
            }
        },
        blogUpdated:(state,action)=>{
            const {id,title,content}=action.payload
            const existingBlog=state.find((blog)=>blog.id==id)
            if(existingBlog){
                existingBlog.title=title,
                existingBlog.content=content
            }
        }

    }
})

export const { blogAdded,blogUpdated } = blogSlice.actions
export default blogSlice.reducer