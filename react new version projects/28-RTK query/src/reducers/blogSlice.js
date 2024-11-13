import {
    createSlice,
    nanoid,
    createAsyncThunk,
    current,
    createSelector,
    createEntityAdapter

} from "@reduxjs/toolkit";
import { sub } from "date-fns-jalali"
import { createBlog, deleteBlog, getALllBlogs, updateBlog } from "../services/blogsServices";

// const initialState = {
//     blogs: [],
//     status: "idle",
//     error: null,
// };

const blogAdaptor = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})
const initialState = blogAdaptor.getInitialState({
    status: "idle",
    error: null
})
//{ids: [], entities: {}, status: "idle", error: null}
console.log(initialState);


export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
    const response = await getALllBlogs()
    return response.data
})
export const addNewBlog = createAsyncThunk("/blogs/addNewBlog", async (initialBlog) => {
    const response = await createBlog(initialBlog)
    return response.data
})
export const updateApiBlog = createAsyncThunk("/blogs/updateApiBlog", async (initialBlog) => {
    const response = await updateBlog(initialBlog, initialBlog.id)
    return response.data
})
export const deleteApiBlog = createAsyncThunk("/blogs/deleteApiBlog", async (initialBlogId) => {
    await deleteBlog(initialBlogId)
    return initialBlogId
})
const blogsSlice = createSlice({
    name: "myblogs",
    initialState: initialState,
    reducers: {
        // blogAdded: {
        //     reducer(state, action) {
        //         state.blogsList.push(action.payload);
        //     },
        //     prepare(title, content, userId) {
        //         //Complex logic
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 date: new Date().toISOString(),
        //                 title,
        //                 content,
        //                 user: userId,

        //             },
        //         };
        //     },
        // },

        blogUpdated: (state, action) => {
            const { id, title, content } = action.payload;
            // const existingBlog = state.blogs.find((blog) => blog.id === id);
            const existingBlog =state.entities[id]
            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.content = content;
            }
        },
        // blogDeleted: (state, action) => {
        //     const { id } = action.payload;
        //     state.blogs = state.blogs.filter((blog) => blog.id !== id);
        //     console.log(current(state));
        // },
        reactionAdded: (state, action) => {
            const { blogId, name } = action.payload
            // let existingBlog = state.blogs.find(blog => blog.id == blogId)
            let existingBlog = state.entities[blogId]

            if (existingBlog) {
                existingBlog.reactions[name]++
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "completed",
                    // state.blogs = action.payload
                    blogAdaptor.upsertMany(state,action.payload)
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewBlog.fulfilled, (state, action) => {
                // state.blogs.push(action.payload)
                blogAdaptor.addOne(action.payload)
            })
            // .addCase(addNewBlog.fulfilled, blogAdaptor.addOne)  // this way is possible too
            .addCase(deleteApiBlog.fulfilled, blogAdaptor.removeOne)
            // .addCase(updateApiBlog.fulfilled, (state, action) => {
            //     const { id } = action.payload
            //     const updatedBlogIndex = state.blogs.findIndex(blog => blog.id === id)
            //     state.blogs[updatedBlogIndex] = action.payload
            // })
            .addCase(updateApiBlog.fulfilled, blogAdaptor.updateOne)
    }
});

// export const selectAllBlogs = (state) => state.newBlogs.blogs;

// export const selectBlogById = (state, blogId) =>
//     state.newBlogs.blogs?.find((blog) => blog.id === blogId);
 export const {
    selectAll:selectAllBlogs,
    selectIds:selectBlogIds,
    selectById:selectBlogById
 }=blogAdaptor.getSelectors((state)=>state.newBlogs)


//use create slector to memoize selector input to prevent exceed renders
export const selectUserBlogs = createSelector(
    [selectAllBlogs, (state, userId) => userId],
    (blogs, userId) => blogs.filter(blog => blog.user === userId)
)

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogsSlice.actions;

export default blogsSlice.reducer;
