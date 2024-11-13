import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "../reducers/blogSlice";
import usersSlice,{fetchUsers} from "../reducers/userSlice";

export const store = configureStore({
    reducer: {
        newBlogs: blogsReducer,
        users:usersSlice
    },
});

store.dispatch(fetchUsers())