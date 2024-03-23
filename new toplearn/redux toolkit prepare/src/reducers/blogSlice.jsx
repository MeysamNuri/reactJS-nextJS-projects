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
        }

    }
})

export const { blogAdded } = blogSlice.actions
export default blogSlice.reducer