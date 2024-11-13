import { createSlice, nanoid } from "@reduxjs/toolkit";
import {sub} from "date-fns-jalali"
const initialState = {
    blogsList: [
        {
            id: nanoid(),
            title: "اولین پست",
            date:sub(new Date(),{minutes:10}) .toISOString(),
            content: "محتوای اولین پست ما ☺️",
            user:"1",
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            },
        },
        {
            id: nanoid(),
            title: "دومین پست",
            date:sub(new Date(),{minutes:5,days:2}) .toISOString(),
            content: "دومین پست ما میباشد سلام دنیا 🤗",
            user:"3",
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            },
        },
    ],
};

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
});

export const selectAllBlogs = (state) => state.newBlogs.blogsList;

export const selectBlogById = (state, blogId) =>
    state.newBlogs.blogsList.find((blog) => blog.id === blogId);

export const { blogAdded, blogUpdated, blogDeleted ,reactionAdded} = blogsSlice.actions;

export default blogsSlice.reducer;
