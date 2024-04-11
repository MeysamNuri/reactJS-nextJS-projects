import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import {sub} from "date-fns-jalali"
import { getALllBlogs } from "../services/blogsServices";

const initialState = {
    blogs: [],
    status: "idle",
    error: null,
};

export const fetchBlogs=createAsyncThunk("/blogs/fetchBlogs",async ()=>{
    const response=await getALllBlogs()
    return response.data
})
const blogsSlice = createSlice({
    name: "myblogs",
    initialState: initialState,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.blogsList.push(action.payload);
            },
            prepare(title, content,userId) {
                //Complex logic
                return {
                    payload: {
                        id: nanoid(),
                        date:new Date().toISOString(),
                        title,
                        content,
                        user:userId,
                        
                    },
                };
            },
        },
    
        blogUpdated: (state, action) => {
            const { id, title, content } = action.payload;
            const existingBlog = state.blogsList.find((blog) => blog.id === id);

            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.content = content;
            }
        },
        blogDeleted: (state, action) => {
            const { id } = action.payload;
            state.blogsList = state.blogsList.filter((blog) => blog.id !== id);
        },
        reactionAdded:(state,action)=>{
            const {blogId,name}=action.payload
            let existingBlog=state.blogsList.find(blog=>blog.id==blogId)
            if(existingBlog){
                existingBlog.reactions[name]++
            }
        }
    },
    extraReducers:(builder)=>{
        builder
             .addCase(fetchBlogs.pending,(state,action)=>{
            state.status="loading"
        })
            .addCase(fetchBlogs.fulfilled,(state,action)=>{
            state.status="completed",
            state.blogs=action.payload
        })
            .addCase(fetchBlogs.rejected,(state,action)=>{
            state.status="failure"
            state.error=action.error.message
        })
    }
});

export const selectAllBlogs = (state) => state.newBlogs.blogs;

export const selectBlogById = (state, blogId) =>
    state.newBlogs.blogsList.find((blog) => blog.id === blogId);

export const { blogAdded, blogUpdated, blogDeleted ,reactionAdded} = blogsSlice.actions;

export default blogsSlice.reducer;
