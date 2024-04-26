import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import blogsReducer from "../reducers/blogSlice";
import usersSlice, { extendedApiSlice } from "../reducers/userSlice";
import { apiSlice } from '../api/apiSlice'
export const store = configureStore({
    reducer: {
        newBlogs: blogsReducer,
        users: usersSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

// store.dispatch(fetchUsers())
console.log(apiSlice.endpoints.getUsers);
// store.dispatch(apiSlice.endpoints.getUsers.initiate())
store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())